import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchCamdenGames } from '@/lib/mitoGames';

export const revalidate = 1800;

export const metadata = {
  title: 'Camden Games | Camden United FC',
  description: 'Fixtures and results for Camden United FC in the Middlesex County Premier Division.',
};

function ResultBadge({ result, played }) {
  if (!played) {
    return (
      <span className="inline-flex items-center justify-center min-w-12 px-2 py-1 text-xs font-oswald font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
        TBC
      </span>
    );
  }

  const styles = {
    win: 'bg-emerald-100 text-emerald-800',
    draw: 'bg-amber-100 text-amber-800',
    loss: 'bg-red-100 text-red-800',
  };

  const labels = { win: 'W', draw: 'D', loss: 'L' };

  return (
    <span
      className={`inline-flex items-center justify-center min-w-12 px-2 py-1 text-xs font-oswald font-bold uppercase tracking-wider ${styles[result]}`}
    >
      {labels[result]}
    </span>
  );
}

function Scoreline({ game }) {
  if (!game.played) {
    return <span className="font-oswald font-bold text-gray-400 tracking-widest">vs</span>;
  }

  return (
    <span className="font-oswald font-black text-xl text-gray-900 tabular-nums">
      {game.homeScore} – {game.awayScore}
    </span>
  );
}

export default async function GamesPage() {
  let games = [];
  let sourceUrl =
    'https://mitoofootball.com/TeamHist.cfm?CI=68&DivisionID=64&TblName=Matches&LeagueCode=MDX2026';
  let error = null;

  try {
    const data = await fetchCamdenGames();
    games = data.games;
    sourceUrl = data.sourceUrl;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unable to load fixtures right now.';
  }

  const upcoming = games.filter((game) => !game.played);
  const results = games.filter((game) => game.played);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-oswald font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
            Middlesex County Football League
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-4">
            Camden Games
          </h1>
          <div className="w-16 h-1.5 bg-primary mb-6" />
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Fixtures and results for Camden United in the Premier Division, pulled from the
            official league listings.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {error ? (
            <div className="border border-red-200 bg-red-50 px-6 py-8 text-red-800">
              <p className="font-oswald font-bold uppercase tracking-wider mb-2">
                Fixtures unavailable
              </p>
              <p className="text-sm mb-4">{error}</p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-oswald font-bold uppercase tracking-widest text-primary hover:text-gray-900"
              >
                View on mitoofootball
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : games.length === 0 ? (
            <p className="text-gray-500">No fixtures found right now. Check back soon.</p>
          ) : (
            <div className="space-y-14">
              {upcoming.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-oswald font-black uppercase text-gray-900 mb-6">
                    Upcoming Fixtures
                  </h2>
                  <ul className="divide-y divide-gray-200 border-y border-gray-200">
                    {upcoming.map((game) => (
                      <li
                        key={game.id}
                        className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-3 sm:gap-6 sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <ResultBadge result={game.result} played={game.played} />
                          <div>
                            <p className="text-xs font-oswald uppercase tracking-widest text-primary">
                              {game.venue}
                            </p>
                            <p className="text-sm text-gray-500">{game.date}</p>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="font-oswald font-bold uppercase text-gray-900 text-lg sm:text-xl leading-tight">
                            <span className={/camden united/i.test(game.home) ? 'text-primary' : ''}>
                              {game.home}
                            </span>
                            <span className="mx-2 text-gray-400 font-medium normal-case tracking-normal">
                              vs
                            </span>
                            <span className={/camden united/i.test(game.away) ? 'text-primary' : ''}>
                              {game.away}
                            </span>
                          </p>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                            {game.competition}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <Scoreline game={game} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-oswald font-black uppercase text-gray-900 mb-6">
                    Results
                  </h2>
                  <ul className="divide-y divide-gray-200 border-y border-gray-200">
                    {results.map((game) => (
                      <li
                        key={game.id}
                        className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-3 sm:gap-6 sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <ResultBadge result={game.result} played={game.played} />
                          <div>
                            <p className="text-xs font-oswald uppercase tracking-widest text-primary">
                              {game.venue}
                            </p>
                            <p className="text-sm text-gray-500">{game.date}</p>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="font-oswald font-bold uppercase text-gray-900 text-lg sm:text-xl leading-tight">
                            <span className={/camden united/i.test(game.home) ? 'text-primary' : ''}>
                              {game.home}
                            </span>
                            <span className="mx-2 text-gray-400 font-medium normal-case tracking-normal">
                              vs
                            </span>
                            <span className={/camden united/i.test(game.away) ? 'text-primary' : ''}>
                              {game.away}
                            </span>
                          </p>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                            {game.competition}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <Scoreline game={game} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-gray-200 pt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-oswald font-bold uppercase tracking-widest py-3 px-6 hover:bg-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Source: mitoofootball.com
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
