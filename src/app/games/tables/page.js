import Link from 'next/link';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeagueTablesBoard from '@/components/LeagueTablesBoard';
import leagueTables from '@/data/league-tables.json';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Live League Tables | Camden United FC',
  description: "Latest league standings for Camden United First Team, Midweek Team and Camden OG's.",
};

export default function LeagueTablesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-oswald font-bold uppercase tracking-widest text-gray-600 hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Camden Games
          </Link>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Camden United Football Club</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-4">
            Live League Tables
          </h1>
          <div className="w-16 h-1.5 bg-primary mb-6" />
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Latest published league standings for all three Camden United teams. Automatically checked every Sunday evening.
          </p>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/games" className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 font-oswald font-bold uppercase tracking-wide rounded-full px-5 py-3 text-sm">
              <CalendarDays className="w-4 h-4" /> View Upcoming Fixtures
            </Link>
          </div>
          <LeagueTablesBoard tables={leagueTables} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
