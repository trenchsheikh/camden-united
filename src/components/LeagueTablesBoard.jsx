'use client';

import { useState } from 'react';
import { ExternalLink, Trophy } from 'lucide-react';

const TEAM_OPTIONS = [
  { id: 'all', title: 'All Teams' },
  { id: 'first', title: 'First Team' },
  { id: 'midweek', title: 'Midweek Team' },
  { id: 'ogs', title: "Camden OG's" },
];
const LABELS = { first: 'First Team', midweek: 'Midweek Team', ogs: "Camden OG's" };

function LeagueTable({ id, data }) {
  const standings = data?.rows || [];
  const updated = data?.updatedAt && !Number.isNaN(Date.parse(data.updatedAt))
    ? new Date(data.updatedAt).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'medium', timeStyle: 'short' })
    : null;
  return (
    <section className="scroll-mt-28" aria-label={`${LABELS[id]} league standings`}>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-oswald font-black uppercase text-gray-900">{LABELS[id]}</h2>
          <p className="text-gray-500 text-sm mt-1">{data?.division || 'League standings'} · 2026/27 season</p>
        </div>
        <div className="text-xs text-gray-500 text-right">
          {data?.sourceUpdatedAt && <p>League updated {new Date(data.sourceUpdatedAt + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
          {updated && <p>Synced {updated} UK</p>}
        </div>
      </div>
      {standings.length ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full min-w-[570px] text-sm">
            <thead>
              <tr className="bg-gray-900 text-white font-oswald uppercase tracking-wide text-xs">
                <th scope="col" className="px-3 py-3 text-left w-10">#</th>
                <th scope="col" className="px-3 py-3 text-left">Club</th>
                <th scope="col" className="px-2 py-3 text-center" title="Played">P</th>
                <th scope="col" className="px-2 py-3 text-center" title="Won">W</th>
                <th scope="col" className="px-2 py-3 text-center" title="Drawn">D</th>
                <th scope="col" className="px-2 py-3 text-center" title="Lost">L</th>
                <th scope="col" className="px-2 py-3 text-center" title="Goal difference">GD</th>
                <th scope="col" className="px-3 py-3 text-center" title="Points">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {standings.map((row) => {
                const camden = id === 'ogs'
                  ? /camden united og['’]s/i.test(row.name)
                  : /^camden united(?: fc)?$/i.test(row.name.trim());
                return (
                  <tr key={`${row.position}-${row.name}`} className={camden ? 'bg-red-50 border-l-4 border-primary font-semibold' : 'bg-white even:bg-gray-50'}>
                    <td className="px-3 py-3 font-oswald font-bold text-gray-600 tabular-nums">{row.position}</td>
                    <td className={`px-3 py-3 ${camden ? 'text-primary' : 'text-gray-900'}`}>
                      {row.name}
                      {camden && <span className="ml-2 text-[10px] uppercase tracking-wide whitespace-nowrap">Our Team</span>}
                    </td>
                    <td className="px-2 py-3 text-center tabular-nums">{row.played}</td>
                    <td className="px-2 py-3 text-center tabular-nums">{row.won}</td>
                    <td className="px-2 py-3 text-center tabular-nums">{row.drawn}</td>
                    <td className="px-2 py-3 text-center tabular-nums">{row.lost}</td>
                    <td className="px-2 py-3 text-center tabular-nums">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                    <td className="px-3 py-3 text-center font-oswald font-bold text-base tabular-nums">{row.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-7 sm:p-9 text-gray-600">
          <Trophy className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
          <p className="font-oswald font-bold uppercase text-gray-900 mb-1">League standings</p>
          <p className="text-sm max-w-xl">The latest table can be viewed at the league's website using the link below.</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        {data?.source && (
          <a href={data.source} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary hover:text-gray-900 text-sm font-medium underline underline-offset-4">
            {id === 'first' ? 'Standings source: NonLeagueMatters' : 'View official league table'}
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
        {data?.officialSource && (
          <a href={data.officialSource} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary text-sm underline underline-offset-4">
            Official Mitoo league table <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}

export default function LeagueTablesBoard({ tables }) {
  const [selected, setSelected] = useState('all');
  const teams = selected === 'all' ? ['first', 'midweek', 'ogs'] : [selected];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter league tables by team">
        {TEAM_OPTIONS.map(({id,title}) => (
          <button key={id} type="button" onClick={() => setSelected(id)} aria-pressed={selected === id}
            className={`rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-oswald font-bold uppercase tracking-wide border transition-colors ${selected === id ? 'bg-primary border-primary text-white' : 'border-gray-300 text-gray-700 bg-white hover:border-primary hover:text-primary'}`}>
            {title}
          </button>
        ))}
      </div>
      <div className="space-y-14">
        {teams.map((id) => <LeagueTable key={id} id={id} data={tables.teams?.[id]} />)}
      </div>
      <p className="text-xs text-gray-500 mt-10">
        Standings reflect the most recently retrieved league records, not a real-time score feed. Automated refresh is scheduled for Sundays at 8:10pm UK time.
      </p>
    </div>
  );
}
