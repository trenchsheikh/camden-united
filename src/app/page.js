import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SponsorsCarousel from '@/components/SponsorsCarousel';
import About from '@/components/About';
import InMemory from '@/components/InMemory';
import Teams from '@/components/Teams';
import Media from '@/components/Media';
import Partners, { CaseStudies } from '@/components/Partners';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HashScroll from '@/components/HashScroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HashScroll />
      <Navbar />
      <Hero />
      <SponsorsCarousel />
      <About />
      <Teams />
      <Partners />
      <CaseStudies />
      <InMemory />
      <Media />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
