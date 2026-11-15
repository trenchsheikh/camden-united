import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FixturesBoard from '@/components/FixturesBoard';
import { fixtures as firstFixtures } from '@/data/fixtures';
import { ogFixtures } from '@/data/ogFixtures';
import synced from '@/data/fixtures-synced.json';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Camden Games | Camden United FC',
  description: "The next three matches for Camden United's First Team, Midweek Team and Camden OG's.",
};

const sourceUrls = {
  first: 'https://mitoofootball.com/TeamHistAll.cfm?CI=68&TblName=Matches&LeagueCode=MDX2026&DivisionID=64',
  midweek: 'https://fulltime.thefa.com/fixtures.html?selectedSeason=224702165&selectedDateCode=all&selectedClub=652338347&selectedTeam=380596793&selectedRelatedFixtureOption=3&itemsPerPage=25',
  ogs: 'https://fulltime.thefa.com/fixtures.html?selectedSeason=224702165&selectedDateCode=all&selectedClub=652338347&selectedTeam=144179498&selectedRelatedFixtureOption=3&itemsPerPage=25',
};

export default function GamesPage() {
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/London' });
  const seeds = { first: firstFixtures.map((game) => ({ ...game, team: 'first' })), midweek: [], ogs: ogFixtures };
  const gamesByTeam = Object.fromEntries(
    Object.entries(seeds).map(([team, fallback]) => {
      const synchronized = synced.teams?.[team] || [];
      // The county FA publishes cup matches independently of the First Team's league.
      // Merge with the verified league schedule so a cup-only feed never hides it.
      const games = team === 'first'
        ? (() => {
            const byDate = new Map(fallback.map((match) => [match.dateISO, match]));
            for (const match of synchronized) {
              const original = byDate.get(match.dateISO);
              byDate.set(match.dateISO, {
                ...original,
                ...match,
                // County FA rows sometimes list the home club instead of a ground.
                ground: match.ground && match.ground !== match.home && match.ground !== match.away
                  ? match.ground : original?.ground,
                competition: original?.competition || match.competition,
              });
            }
            return [...byDate.values()];
          })()
        : (synchronized.length ? synchronized : fallback);
      return [team, games
        .filter((game) => !game.played && game.dateISO >= today)
        .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
        .slice(0, 3)];
    })
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-oswald font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Camden United Football Club</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-4">
            Camden Games
          </h1>
          <div className="w-16 h-1.5 bg-primary mb-6" />
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            The next matches for our First Team, Midweek Team and Camden OG&apos;s. Choose a team to see its upcoming fixtures.
          </p>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <FixturesBoard gamesByTeam={gamesByTeam} sourceUrls={sourceUrls} updatedAt={synced.updatedAt} />
          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white font-oswald font-bold uppercase tracking-widest py-3 px-6 hover:bg-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
