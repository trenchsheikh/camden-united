'use client';

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { scrollToHash } from '@/lib/scroll';

const NAV_OFFSET = 88;
const INSTAGRAM_URL = 'https://www.instagram.com/camdenunitedfc/';

const footerColumns = [
  {
    title: 'Club',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Teams', href: '#teams' },
      { name: 'Sponsors', href: '#sponsors' },
      { name: 'In Memory', href: '#in-memory' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { name: 'Partner With Us', href: '#partners' },
      { name: 'Case Studies', href: '#case-studies' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Media', href: '#media' },
      { name: 'Contact', href: '#contact' },
      { name: 'Instagram', href: INSTAGRAM_URL, external: true },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToHash(href, NAV_OFFSET);
  };

  return (
    <footer className="bg-gray-50 text-gray-900 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link
              href="/"
              onClick={(event) => handleNavClick(event, '/')}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200 group-hover:border-primary transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cu-logo.png"
                  alt="Camden United Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-oswald font-bold uppercase tracking-wider text-gray-900 group-hover:text-primary transition-colors">
                  Camden United
                </h3>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A Camden CIC for young men aged 16+. Football, mentoring, and pathways, founded by the community, for the community.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Camden United on Instagram"
              className="w-10 h-10 bg-white border border-gray-200 inline-flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-primary font-oswald font-bold uppercase tracking-widest text-sm mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-wide"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-wide"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-10">
          <p className="text-gray-500 text-xs uppercase tracking-wider text-center md:text-left">
            &copy; {currentYear} Camden United FC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
