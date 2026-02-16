'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

const tableData = [
  { rank: 1, team: 'Sporting Duet M 1st XI', played: 19, won: 15, drawn: 2, lost: 2, gf: 57, ga: 31, gd: 26, points: 47 },
  { rank: 2, team: 'London Fennecs', played: 17, won: 13, drawn: 1, lost: 3, gf: 50, ga: 20, gd: 30, points: 40 },
  { rank: 3, team: 'Camden United', played: 21, won: 11, drawn: 4, lost: 6, gf: 63, ga: 33, gd: 30, points: 39 },
  { rank: 4, team: 'Hayes & Hillingdon', played: 18, won: 12, drawn: 3, lost: 3, gf: 47, ga: 26, gd: 21, points: 39 },
  { rank: 5, team: 'Eagles Land Cricklewood', played: 19, won: 11, drawn: 3, lost: 5, gf: 42, ga: 29, gd: 13, points: 38 },
  { rank: 6, team: 'Camden & Islington United', played: 21, won: 11, drawn: 4, lost: 6, gf: 61, ga: 40, gd: 21, points: 37 },
  { rank: 7, team: 'Larkspur Rovers', played: 19, won: 11, drawn: 3, lost: 5, gf: 51, ga: 34, gd: 17, points: 36 },
  { rank: 8, team: 'Stonewall', played: 19, won: 12, drawn: 0, lost: 7, gf: 35, ga: 29, gd: 6, points: 36 },
  { rank: 9, team: 'Kensington Dragons', played: 15, won: 9, drawn: 1, lost: 5, gf: 46, ga: 33, gd: 13, points: 28 },
  { rank: 10, team: 'Harrow United', played: 20, won: 6, drawn: 4, lost: 10, gf: 48, ga: 53, gd: -5, points: 26 },
  { rank: 11, team: 'Wood Lane', played: 20, won: 8, drawn: 2, lost: 10, gf: 43, ga: 49, gd: -6, points: 26 },
  { rank: 12, team: 'LBS Lions', played: 22, won: 8, drawn: 1, lost: 13, gf: 48, ga: 61, gd: -13, points: 22 },
  { rank: 13, team: 'Kodak (Harrow)', played: 21, won: 4, drawn: 2, lost: 15, gf: 29, ga: 59, gd: -30, points: 17 },
  { rank: 14, team: 'Jolof Sports', played: 19, won: 5, drawn: 3, lost: 10, gf: 37, ga: 47, gd: -10, points: 16 },
  { rank: 15, team: 'PFC Victoria Res.', played: 18, won: 3, drawn: 3, lost: 12, gf: 29, ga: 61, gd: -32, points: 10 },
  { rank: 16, team: 'Indian Gymkhana Club', played: 21, won: 2, drawn: 1, lost: 18, gf: 28, ga: 87, gd: -59, points: 7 },
  { rank: 17, team: 'Hilltop 2nds', played: 15, won: 1, drawn: 1, lost: 12, gf: 24, ga: 46, gd: -22, points: 4 },
];

export default function LeagueTable() {
  return (
    <section className="py-12 bg-white relative z-0 mt-4 lg:mt-8 mx-4 lg:mx-8 mb-20 rounded-t-3xl border-t border-gray-100 shadow-xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Standings</h4>
            <h2 className="text-3xl md:text-4xl font-oswald font-black uppercase text-gray-900 leading-none">
              League Table
            </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-hide">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th scope="col" className="px-3 py-2 font-bold tracking-wider w-12 bg-gray-50">Pos</th>
                  <th scope="col" className="px-3 py-2 font-bold tracking-wider bg-gray-50">Team</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider bg-gray-50">P</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider hidden sm:table-cell bg-gray-50">W</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider hidden sm:table-cell bg-gray-50">D</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider hidden sm:table-cell bg-gray-50">L</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider hidden md:table-cell bg-gray-50">GF</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider hidden md:table-cell bg-gray-50">GA</th>
                  <th scope="col" className="px-2 py-2 text-center font-bold tracking-wider bg-gray-50">GD</th>
                  <th scope="col" className="px-3 py-2 text-center font-bold tracking-wider bg-gray-50">Pts</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <motion.tr 
                    key={row.team}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={clsx(
                      "border-b border-gray-50 hover:bg-gray-50 transition-colors",
                      row.team === 'Camden United' ? "bg-red-50 hover:bg-red-100" : ""
                    )}
                  >
                    <td className="px-3 py-2 font-medium text-gray-400">
                        {row.rank}
                    </td>
                    <td className={clsx("px-3 py-2 font-oswald font-bold uppercase tracking-wide text-xs sm:text-sm whitespace-nowrap", row.team === 'Camden United' ? "text-primary" : "text-gray-900")}>
                      {row.team}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-600 font-medium">{row.played}</td>
                    <td className="px-2 py-2 text-center text-gray-600 hidden sm:table-cell">{row.won}</td>
                    <td className="px-2 py-2 text-center text-gray-600 hidden sm:table-cell">{row.drawn}</td>
                    <td className="px-2 py-2 text-center text-gray-600 hidden sm:table-cell">{row.lost}</td>
                    <td className="px-2 py-2 text-center text-gray-400 hidden md:table-cell">{row.gf}</td>
                    <td className="px-2 py-2 text-center text-gray-400 hidden md:table-cell">{row.ga}</td>
                    <td className={clsx("px-2 py-2 text-center font-bold", row.gd > 0 ? "text-green-600" : row.gd < 0 ? "text-red-600" : "text-gray-600")}>
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="px-3 py-2 text-center font-bold text-gray-900 text-sm">
                        {row.points}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Fade out effect */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
