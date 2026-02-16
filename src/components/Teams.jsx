'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Star, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const teams = [
  {
    title: 'Youth Development',
    age: 'Ages 8-16',
    description: 'Structure and discipline for the next generation.',
    icon: Star,
    color: 'text-yellow-600',
    stat: '12 Teams',
  },
  {
    title: 'Senior Squad',
    age: 'Ages 17+',
    description: 'Elite competition and professional coaching standards.',
    icon: Trophy,
    color: 'text-primary',
    stat: '3 Divisions',
  },
  {
    title: 'Community',
    age: 'All Ages',
    description: 'Inclusive leagues for fitness, fun, and connection.',
    icon: Users,
    color: 'text-blue-600',
    stat: 'Weekly',
  },
];

export default function Teams() {
  return (
    <section id="teams" className="py-24 bg-gray-50 relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 skew-x-12 transform translate-x-20" />
       
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">The Club</h4>
            <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none">
              Our <br /> Teams
            </h2>
          </div>
          
          <Link href="#join" className="group flex items-center gap-2 text-gray-900 font-oswald uppercase tracking-widest hover:text-primary transition-colors">
            View Full Squad <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <motion.div
              key={team.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group relative bg-white p-8 border-t-4 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-gray-50 p-4 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <team.icon className={clsx("w-8 h-8", team.color)} />
                </div>
                <span className="text-gray-400 font-oswald text-sm uppercase tracking-wider">{team.stat}</span>
              </div>
              
              <h3 className="text-2xl font-oswald font-bold text-gray-900 uppercase mb-2 group-hover:text-primary transition-colors">{team.title}</h3>
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">{team.age}</p>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8 border-b border-gray-100 pb-8">
                {team.description}
              </p>
              
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 text-gray-900 font-bold uppercase text-xs tracking-widest group-hover:gap-3 transition-all"
              >
                Learn More <ChevronRight className="w-3 h-3 text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
