'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Clock3, MapPin, ExternalLink } from 'lucide-react';

const OPTIONS = [
  { id: 'all', label: 'All Teams' },
  { id: 'first', label: 'First Team' },
  { id: 'midweek', label: 'Midweek Team' },
  { id: 'ogs', label: "Camden OG's" },
];

const TEAM_NAMES = {
  first: 'First Team',
  midweek: 'Midweek Team',
  ogs: "Camden OG's",
};

function Match({ game }) {
  const isCamden = (name) => /camden (?:& islington |and islington )?united/i.test(name);
  const ground = ['midweek', 'ogs'].includes(game.team) ? 'Market Road Football Pitches' : game.ground;
  return (
    <li className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-[135px_1fr_auto] items-start sm:items-center gap-3 sm:gap-6">
      <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
        <span className="bg-gray-100 text-gray-800 font-oswald font-bold text-sm px-3 py-1 min-w-20 text-center">
          {game.kickoff || 'TBC'}
        </span>
        <span className="text-xs uppercase font-oswald font-bold tracking-wide text-primary">{game.venue}</span>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1 flex flex-wrap items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" /> {game.date}
        </p>
        <p className="font-oswald font-bold uppercase text-lg sm:text-xl leading-tight">
          <span className={isCamden(game.home) ? 'text-primary' : 'text-gray-900'}>{game.home}</span>
          <span className="mx-2 font-medium text-gray-400 normal-case">vs</span>
          <span className={isCamden(game.away) ? 'text-primary' : 'text-gray-900'}>{game.away}</span>
        </p>
        <p className="text-xs uppercase text-gray-400 tracking-wider mt-1">{game.competition || 'Fixture'}</p>
        {ground && (
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {ground}
          </p>
        )}
      </div>
      <span className="font-oswald font-bold text-sm text-gray-400 uppercase tracking-wide hidden sm:inline">vs</span>
    </li>
  );
}

export default function FixturesBoard({ gamesByTeam, sourceUrls, updatedAt }) {
  const [selected, setSelected] = useState('all');
  const displayedTeams = selected === 'all' ? ['first', 'midweek', 'ogs'] : [selected];
  const visible = useMemo(() => displayedTeams.flatMap((team) => gamesByTeam[team] || [])
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO) || (a.kickoff || '').localeCompare(b.kickoff || '')), [selected, gamesByTeam]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter fixtures by Camden United team">
        {OPTIONS.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => setSelected(option.id)}
            aria-pressed={selected === option.id}
            className={`rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-oswald font-bold uppercase tracking-wide border transition-colors ${selected === option.id ? 'bg-primary border-primary text-white' : 'border-gray-300 text-gray-700 bg-white hover:border-primary hover:text-primary'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl sm:text-3xl font-oswald font-black uppercase text-gray-900">
          {selected === 'all' ? 'Next Fixtures' : `${TEAM_NAMES[selected]} Fixtures`}
        </h2>
        <p className="text-sm text-gray-500">Next 3 matches per team</p>
      </div>

      {visible.length ? (
        <ul className="divide-y divide-gray-200 border-y border-gray-200">
          {visible.map((game) => (
            <Match key={`${game.team}-${game.id}`} game={game} />
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 border border-gray-200 p-8 text-center text-gray-600">
          <Clock3 className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
          No confirmed upcoming fixtures available for this team yet.
        </div>
      )}
      {selected === 'all' && !gamesByTeam.midweek?.length && (
        <p className="text-sm text-gray-500 mt-5">
          Midweek Team: no upcoming match details could be verified from FA Full-Time.
        </p>
      )}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-xs text-gray-600">
        {Object.entries(sourceUrls).filter(([id]) => selected === 'all' || id === selected).map(([id, url]) => (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary underline underline-offset-2">
            {TEAM_NAMES[id]} source <ExternalLink className="w-3 h-3" />
          </a>
        ))}
      </div>
      {updatedAt && <p className="text-xs text-gray-400 mt-3">Last checked: {new Date(updatedAt).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'medium', timeStyle: 'short' })} UK time</p>}
    </div>
  );
}
