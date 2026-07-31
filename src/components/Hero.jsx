'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { scrollToHash } from '@/lib/scroll';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/sunday.jpg"
          alt="Camden United Sunday League"
          fill
          className="object-cover opacity-80"
          priority
          style={{ objectPosition: '55% 60%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-primary font-bold tracking-widest uppercase mb-2 animate-pulse text-sm md:text-base">
            Welcome to the Club
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black font-oswald leading-[0.85] tracking-tighter mb-4 md:mb-6 uppercase drop-shadow-sm">
            <span className="text-gray-900 block">Camden</span>
            <span className="text-primary block">United</span>
          </h1>

          <p className="text-gray-600 max-w-lg mb-8 md:mb-10 text-base md:text-lg leading-relaxed border-l-4 border-primary pl-4 md:pl-6 font-medium">
            For the Youth, By the Youth
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href="#about"
              onClick={(event) => {
                event.preventDefault();
                scrollToHash('#about');
              }}
              className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-primary text-white font-oswald font-bold uppercase tracking-widest text-base md:text-lg overflow-hidden rounded-full hover:bg-gray-900 transition-all shadow-xl shadow-primary/30"
            >
              <span className="relative z-10">Read More</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-900/50" />
            </a>
            <a
              href="/games"
              className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 border-2 border-gray-900 font-oswald font-bold uppercase tracking-widest text-base md:text-lg rounded-full hover:bg-gray-900 hover:text-white transition-all"
            >
              Camden Games
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
