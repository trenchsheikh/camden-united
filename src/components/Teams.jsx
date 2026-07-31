'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToHash } from '@/lib/scroll';

const featuredSquads = [
  {
    title: 'First Team',
    src: '/first-team.jpg',
    alt: 'Camden United First Team celebrating with the trophy',
    caption: 'Open age Saturday side, competing for Camden United on and off the pitch.',
    aspectClass: 'aspect-[16/10] md:aspect-[21/9]',
    imageClass: 'object-cover object-[center_45%]',
  },
  {
    title: 'Midweek Teams',
    src: '/midweek.jpg',
    alt: 'Camden United midweek teams group photo on the pitch',
    caption: 'Ages 16 to 25, using football, mentoring, and peer support through the week.',
    aspectClass: 'aspect-[16/10] md:aspect-[21/9]',
    imageClass: 'object-cover object-[center_55%]',
  },
];

const pairedSquads = [
  {
    title: 'Founding Members',
    src: '/founding.png',
    alt: 'Camden United founding members team photo on the pitch',
    caption: 'Ages 25 and over, sustaining the relationships and leadership that built the club.',
    aspectClass: 'aspect-[3/4]',
    imageClass: 'object-contain object-center',
    compact: true,
  },
  {
    title: 'Munye League U18',
    src: '/munye-league-team.jpeg',
    alt: 'Munye League under 18 team celebrating with medals and a trophy',
    caption: 'Ages 16 to 18, using football to engage young men, then workshops and mentorship.',
    aspectClass: 'aspect-[4/3]',
    imageClass: 'object-cover object-center',
  },
];

function SquadFigure({ squad, delay = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className={`w-full min-w-0 ${squad.compact ? 'max-w-md md:max-w-lg mx-auto md:mx-0' : ''}`}
    >
      <div className="relative w-full overflow-hidden border border-gray-300 bg-white p-2 sm:p-3 shadow-sm">
        <div
          className={`relative w-full overflow-hidden bg-gray-100 ${squad.aspectClass}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={squad.src}
            alt={squad.alt}
            className={`absolute inset-0 h-full w-full ${squad.imageClass}`}
          />
        </div>
      </div>
      <figcaption className="mt-4 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-primary font-oswald font-bold uppercase tracking-widest text-xs mb-1">
            The Squad
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-oswald font-black uppercase text-gray-900 leading-tight break-words">
            {squad.title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed sm:max-w-md sm:text-right">
          {squad.caption}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export default function Teams() {
  return (
    <section id="teams" className="py-16 sm:py-20 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 skew-x-12 transform translate-x-20 hidden sm:block" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-16 gap-6">
          <div className="min-w-0">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              The Club
            </h4>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none">
              Our <br /> Teams
            </h2>
            <p className="mt-4 max-w-xl text-gray-500 text-sm sm:text-base leading-relaxed">
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
            className="group inline-flex items-center gap-2 text-gray-900 font-oswald uppercase tracking-widest hover:text-primary transition-colors shrink-0"
          >
            Get Involved <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="space-y-10 sm:space-y-12 mb-10 sm:mb-14 md:mb-16">
          {featuredSquads.map((squad, index) => (
            <SquadFigure key={squad.title} squad={squad} delay={index * 0.05} />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            {pairedSquads.map((squad, index) => (
              <SquadFigure
                key={squad.title}
                squad={squad}
                delay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 text-white px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14"
        >
          <p className="text-primary font-oswald font-bold uppercase tracking-widest text-sm mb-3">
            Beyond Our Squads
          </p>
          <h3 className="text-2xl sm:text-3xl font-oswald font-black uppercase mb-4 leading-tight">
            The Munye League
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="space-y-5 text-white/80 text-sm sm:text-base leading-relaxed">
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
                <li
                  key={item}
                  className="flex gap-3 sm:gap-4 items-start border-t border-white/10 pt-4 first:border-0 first:pt-0"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
                  <span className="text-white font-medium leading-relaxed text-sm sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
