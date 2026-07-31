'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToHash } from '@/lib/scroll';

const squadPhotos = [
  {
    title: 'First Team',
    src: '/first-team.jpg',
    alt: 'Camden United First Team celebrating with the trophy',
    caption: 'Open age Saturday side, competing for Camden United on and off the pitch.',
    objectPosition: 'object-[center_30%]',
    fit: 'object-cover',
  },
  {
    title: 'Midweek Teams',
    src: '/midweek.jpg',
    alt: 'Camden United midweek teams group photo on the pitch',
    caption: 'Ages 16 to 25, using football, mentoring, and peer support through the week.',
    objectPosition: 'object-center',
    fit: 'object-contain md:object-cover',
  },
  {
    title: 'Founding Members',
    src: '/founding.png',
    alt: 'Camden United founding members team photo on the pitch',
    caption: 'Ages 25 and over, sustaining the relationships and leadership that built the club.',
    objectPosition: 'object-center',
    fit: 'object-contain md:object-cover',
  },
];

export default function Teams() {
  return (
    <section id="teams" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 skew-x-12 transform translate-x-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              The Club
            </h4>
            <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none">
              Our <br /> Teams
            </h2>
            <p className="mt-4 max-w-xl text-gray-500 text-base leading-relaxed">
              Camden United is for young men aged 16+. We run three teams so members get the
              right support at every stage, plus the Munye League, connecting clubs across
              Camden.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToHash('#contact');
            }}
            className="group flex items-center gap-2 text-gray-900 font-oswald uppercase tracking-widest hover:text-primary transition-colors"
          >
            Get Involved <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="space-y-10 md:space-y-12 mb-14 md:mb-16">
          {squadPhotos.map((squad, index) => (
            <motion.figure
              key={squad.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <div className="relative w-full overflow-hidden border border-gray-300 bg-white p-2 md:p-3 shadow-sm">
                <div className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={squad.src}
                    alt={squad.alt}
                    className={`absolute inset-0 h-full w-full ${squad.fit} ${squad.objectPosition}`}
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-3 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-primary font-oswald font-bold uppercase tracking-widest text-xs mb-1">
                    The Squad
                  </p>
                  <h3 className="text-2xl md:text-3xl font-oswald font-black uppercase text-gray-900 leading-none">
                    {squad.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 max-w-md md:text-right leading-relaxed">
                  {squad.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 text-white px-8 py-10 md:px-12 md:py-14"
        >
          <p className="text-primary font-oswald font-bold uppercase tracking-widest text-sm mb-3">
            Beyond Our Squads
          </p>
          <h3 className="text-2xl md:text-3xl font-oswald font-black uppercase mb-4">
            The Munye League
          </h3>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5 text-white/80 leading-relaxed">
              <p>
                Founded and run by Camden United, the Munye League connects young people across
                eight Camden based clubs in the open age league and five organisations in the
                16 to 18 programme: a trusted network of support and opportunity across the borough.
              </p>
              <p>
                Through the Munye League we use football to engage young men aged 16 to 18.
                From that point we deliver workshops and mentorship sessions with them, building
                belonging on the pitch and pathways off it.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Started it off ourselves',
                'Became funded by GO! London',
                'Camden Council part fund it and provide pitch space',
                'Completely free, removing the financial barrier',
              ].map((item) => (
                <li key={item} className="flex gap-4 items-start border-t border-white/10 pt-4 first:border-0 first:pt-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
                  <span className="text-white font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
