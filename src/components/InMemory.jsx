'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ARTICLE_URL =
  'https://www.camdennewjournal.co.uk/article/abdulaziz-munye-tributes-to-co-founder-of-football-club-after-death-at-just-26';

export default function InMemory() {
  return (
    <section id="in-memory" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl"
        >
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
            In Memory
          </h4>
          <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase leading-none mb-4">
            Abdulaziz Munye
          </h2>
          <p className="text-white/60 font-oswald uppercase tracking-widest text-sm mb-6">
            Co founder · Rest in power · 1996 to 2022
          </p>
          <div className="w-20 h-2 bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6 text-white/80 text-lg leading-relaxed"
          >
            <p>
              Abdulaziz Munye co founded Camden United FC to help combat youth violence and
              give young people in Camden a free, welcoming place to play football. Growing up
              in Somers Town, he helped turn grief into community action after friends were
              lost to knife crime, including the murders of two brothers within six months of
              each other in 2018.
            </p>
            <p>
              Together with co founder Hafid Ali, Abdulaziz built a club that removed barriers
              of cost and travel so young men could belong, compete, and support each other.
              His talent on the pitch was widely remembered, and his wider gift was bringing
              people together across Camden through the game.
            </p>
            <p>
              Abdulaziz died suddenly in November 2022, aged 26. Players held a minute of
              silence at Market Road as United played on in his honour. Tributes poured in from
              across the borough, including from Camden Council leadership and community
              partners who recognised how many young lives he had inspired.
            </p>

            <blockquote className="border-l-4 border-primary pl-6 py-1 text-white font-medium italic">
              People were asking me whether we should cancel the game but I wanted to bring
              people together. It is what Abdulaziz would have wanted us to do.
              <footer className="mt-3 not-italic text-sm font-oswald uppercase tracking-widest text-white/50">
                Hafid Ali · Co founder, Camden United FC
              </footer>
            </blockquote>

            <p>
              In a letter dated 18 November 2022, Keir Starmer MP, then Member of Parliament
              for Holborn and St Pancras, wrote to offer condolences and praised Abdulaziz as
              someone who rolled up his sleeves after a painful time for the community, calling
              him truly the best of Camden for the lives he touched by setting up Camden United
              FC.
            </p>

            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white font-oswald font-bold uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-gray-900 transition-colors"
            >
              Read Camden New Journal tribute
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="overflow-hidden border border-white/15 bg-black/40 p-2 md:p-3 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/keir-starmer-letter.png"
                alt="Letter of condolence from Keir Starmer MP to Camden United following the death of Abdulaziz Munye"
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>
            <figcaption className="text-xs font-oswald uppercase tracking-widest text-white/45">
              Letter from Keir Starmer MP · 18 November 2022
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
