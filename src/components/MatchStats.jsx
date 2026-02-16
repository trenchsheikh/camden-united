'use client';

import { motion } from 'framer-motion';

const matches = [
  {
    date: 'Latest Match',
    home: { name: 'Camden United', score: 1 },
    away: { name: 'Camden & Islington', score: 3 },
    result: 'L',
  },
  {
    date: 'Previous',
    home: { name: 'Camden United', score: 7 },
    away: { name: 'London Fennecs', score: 0 },
    result: 'W',
  },
  {
    date: 'Previous',
    home: { name: 'Camden United', score: 4 },
    away: { name: 'Indian Gymkhana', score: 0 },
    result: 'W',
  },
  {
    date: 'Previous',
    home: { name: 'Larkspur Rovers', score: 6 },
    away: { name: 'Camden United', score: 3 },
    result: 'L',
  },
  {
    date: 'Previous',
    home: { name: 'Sporting Duet', score: 2 },
    away: { name: 'Camden United', score: 1 },
    result: 'L',
  },
];

export default function MatchStats() {
  return (
    <section className="bg-white py-12 relative z-20 -mt-10 lg:-mt-20 mx-4 lg:mx-8 rounded-t-3xl shadow-xl border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
          
          <div className="xl:w-auto text-center xl:text-left min-w-[200px]">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Results</h4>
            <h2 className="text-4xl font-oswald font-black uppercase text-gray-900 leading-none">
              The Last <br /> Matches
            </h2>
          </div>

          <div className="flex-1 w-full overflow-x-auto pb-4 -mb-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
            {matches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all w-[240px] flex-shrink-0"
              >
                <p className="text-center text-gray-400 text-[10px] font-bold uppercase mb-4 tracking-widest">{match.date}</p>
                <div className="flex flex-col gap-3">
                   <div className="flex justify-between items-center">
                      <span className={`font-oswald font-bold text-lg ${match.home.name === 'Camden United' ? 'text-primary' : 'text-gray-900'}`}>{match.home.name}</span>
                      <span className="font-oswald font-bold text-xl text-gray-900">{match.home.score}</span>
                   </div>
                   <div className="w-full h-px bg-gray-100" />
                   <div className="flex justify-between items-center">
                      <span className={`font-oswald font-bold text-lg ${match.away.name === 'Camden United' ? 'text-primary' : 'text-gray-900'}`}>{match.away.name}</span>
                      <span className="font-oswald font-bold text-xl text-gray-900">{match.away.score}</span>
                   </div>
                </div>
                <div className="mt-4 flex justify-center">
                   <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${match.result === 'W' ? 'bg-green-100 text-green-700' : match.result === 'D' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'}`}>
                      {match.result === 'W' ? 'Win' : match.result === 'D' ? 'Draw' : 'Loss'}
                   </span>
                </div>
              </motion.div>
            ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
