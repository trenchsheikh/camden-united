import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MatchStats from '@/components/MatchStats';
import LeagueTable from '@/components/LeagueTable';
import About from '@/components/About';
import Teams from '@/components/Teams';
import Media from '@/components/Media';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MatchStats />
      <LeagueTable />
      <About />
      <Teams />
      <Media />
      <Contact />
      <Footer />
    </main>
  );
}
