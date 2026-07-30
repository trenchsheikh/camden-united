import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SponsorsCarousel from '@/components/SponsorsCarousel';
import About from '@/components/About';
import Teams from '@/components/Teams';
import Media from '@/components/Media';
import Partners, { CaseStudies } from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SponsorsCarousel />
      <About />
      <Teams />
      <Partners />
      <CaseStudies />
      <Media />
      <Contact />
      <Footer />
    </main>
  );
}
