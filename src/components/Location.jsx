'use client';

import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';

const OFFICE_ADDRESS = {
  line1: '30 Bertram St',
  line2: 'London N19 5DQ, United Kingdom',
};

const MAPS_QUERY = encodeURIComponent(
  `${OFFICE_ADDRESS.line1}, ${OFFICE_ADDRESS.line2}`
);
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function Location() {
  return (
    <section id="location" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              Visit Us
            </h4>
            <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-6">
              Our Office
            </h2>
            <div className="w-16 h-1.5 bg-primary mb-8" />

            <div className="flex gap-4 items-start mb-8">
              <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-oswald font-bold uppercase text-gray-900 leading-snug">
                  {OFFICE_ADDRESS.line1}
                </p>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  {OFFICE_ADDRESS.line2}
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-md mb-8">
              Drop by our Camden office, or open the map for directions from wherever you are.
            </p>

            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-oswald font-bold uppercase tracking-widest py-4 px-8 hover:bg-gray-900 transition-colors"
            >
              Open in Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative w-full"
          >
            <div className="relative w-full overflow-hidden border border-gray-300 bg-white shadow-sm aspect-[4/3] md:aspect-[5/4]">
              <iframe
                title="Camden United office on Google Maps"
                src={MAPS_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
