'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Matches', href: '#matches' },
    { name: 'Teams', href: '#teams' },
    { name: 'Media', href: '#media' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm'
          : 'bg-gradient-to-b from-white to-transparent py-4'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-gray-200 group-hover:border-primary transition-colors">
                 <img
                    src="/cu-logo.png"
                    alt="Camden United Logo"
                    className="object-cover w-full h-full"
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-primary font-oswald font-medium text-sm uppercase tracking-widest transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>



          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">


              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-600 hover:text-primary font-oswald font-bold text-xl uppercase tracking-widest py-2 transition-colors border-b border-gray-100 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
