'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const targetDate = new Date('2026-02-21T14:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/sunday.jpg"
          alt="Camden United Sunday League"
          fill
          className="object-cover opacity-80"
          priority
          style={{ objectPosition: '55% 60%' }}
        />
        {/* Gradient Overlay for Fade Effect - Light Theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            >
              <Link
                href="#join"
                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-primary text-white font-oswald font-bold uppercase tracking-widest text-base md:text-lg overflow-hidden rounded-full hover:bg-gray-900 transition-all shadow-xl shadow-primary/30"
              >
                <span className="relative z-10">Read More</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-900/50" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Countdown / Stats Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden lg:block justify-self-end w-full max-w-md"
          >
            <div className="bg-white/90 backdrop-blur-md p-1 border-t-4 border-primary shadow-2xl">
                <div className="bg-white p-6 text-center border border-gray-100">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Next Match</p>
                    <h3 className="text-gray-900 font-oswald text-2xl uppercase mb-6">Vs Stonewall FC</h3>
                    
                    <div className="flex justify-center gap-4 mb-6">
                        {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((num, i) => (
                            <div key={i} className="text-center">
                                <div className="bg-gray-100 text-gray-900 font-oswald font-bold text-3xl px-3 py-2 rounded mb-1 border border-gray-200 w-16">
                                    {num}
                                </div>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{['Days', 'Hrs', 'Mins', 'Secs'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Visual Flair Lines */}
             <div className="flex justify-end mt-2 gap-1">
                 <div className="h-1 w-16 bg-primary" />
                 <div className="h-1 w-8 bg-gray-300" />
                 <div className="h-1 w-4 bg-gray-200" />
             </div>
          </motion.div>
          
          {/* Mobile Only Countdown Component (Simplified) */}
           <div className="lg:hidden mt-8">
             <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border-t-4 border-primary shadow-xl">
               <p className="text-center text-primary font-bold uppercase tracking-widest text-[10px] mb-1">Next Match: Stonewall FC</p>
                <div className="flex justify-between gap-2">
                    {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((num, i) => (
                        <div key={i} className="text-center flex-1">
                            <div className="bg-gray-50 text-gray-900 font-oswald font-bold text-xl py-1 rounded border border-gray-100">
                                {num}
                            </div>
                            <span className="text-[9px] text-gray-400 uppercase tracking-wider">{['Days', 'Hrs', 'Min', 'Sec'][i]}</span>
                        </div>
                    ))}
                </div>
             </div>
           </div>
        
        </div>
      </div>
    </section>
  );
}
