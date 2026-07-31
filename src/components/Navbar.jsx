'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToHash } from '@/lib/scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const NAV_OFFSET = 88;

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Teams', href: '/#teams' },
  { name: 'Camden Games', href: '/games' },
  { name: 'Partner With Us', href: '/#partners' },
  { name: 'Case Studies', href: '/#case-studies' },
  { name: 'In Memory', href: '/#in-memory' },
  { name: 'Media', href: '/#media' },
  { name: 'Location', href: '/#location' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event, href) => {
    setIsOpen(false);

    if (href === '/games') {
      return;
    }

    if (href === '/') {
      event.preventDefault();
      if (pathname === '/') {
        scrollToHash('/', NAV_OFFSET);
      } else {
        router.push('/');
      }
      return;
    }

    if (href.startsWith('/#')) {
      event.preventDefault();
      const hash = `#${href.split('#')[1]}`;
      if (pathname === '/') {
        window.setTimeout(() => scrollToHash(hash, NAV_OFFSET), 50);
      } else {
        router.push(href);
      }
    }
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled || pathname !== '/'
          ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm'
          : 'bg-gradient-to-b from-white to-transparent py-4'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            onClick={(event) => handleNavClick(event, '/')}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 bg-black group-hover:border-primary transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cu-logo.png"
                alt="Camden United Logo"
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.22]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-oswald font-bold text-lg tracking-wider leading-none group-hover:text-primary transition-colors uppercase">
                Camden
              </span>
              <span className="text-primary font-oswald font-bold text-lg tracking-wider leading-none group-hover:text-gray-900 transition-colors uppercase">
                United
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center space-x-3 2xl:space-x-5">
            {navLinks.map((link) =>
              link.href === '/games' ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-primary font-oswald font-medium text-xs 2xl:text-sm uppercase tracking-wider 2xl:tracking-widest transition-colors relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="text-gray-600 hover:text-primary font-oswald font-medium text-xs 2xl:text-sm uppercase tracking-wider 2xl:tracking-widest transition-colors relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          <div className="xl:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-primary transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) =>
                link.href === '/games' ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-gray-600 hover:text-primary font-oswald font-bold text-xl uppercase tracking-widest py-2 transition-colors border-b border-gray-100 last:border-0"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block text-center text-gray-600 hover:text-primary font-oswald font-bold text-xl uppercase tracking-widest py-2 transition-colors border-b border-gray-100 last:border-0"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
