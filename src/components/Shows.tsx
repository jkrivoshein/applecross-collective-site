'use client';

import React from 'react';
type Show = { date: string; location: string };

export default function Shows({ shows }: { shows: Show[] }) {
  const parsed = (shows ?? [])
    .map((s) => ({ ...s, ts: Date.parse(s.date) }))
    .filter((s) => Number.isFinite(s.ts));

  const now = startOfDay(Date.now());

  const upcoming = parsed.filter((s) => s.ts >= now).sort((a, b) => a.ts - b.ts);
  const past = parsed.filter((s) => s.ts < now).sort((a, b) => b.ts - a.ts);

  if (parsed.length === 0) return <p className="text-center text-sm text-neutral-400">No shows listed.</p>;

  return (
    <div className="space-y-8 text-center">
      {upcoming.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">Upcoming</h3>
          <ul className="space-y-2">
            {upcoming.map((s) => (
              <li key={`${s.ts}-${s.location}`} className="rounded-xl border border-neutral-800 p-3">
                <div className="text-sm font-medium">{formatDate(s.ts)}</div>
                <div className="text-sm text-neutral-300">{s.location}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">Past</h3>
          <ul className="space-y-2">
            {past.map((s) => (
              <li key={`${s.ts}-${s.location}`} className="rounded-xl border border-neutral-800 p-3">
                <div className="text-sm font-medium">{formatDate(s.ts)}</div>
                <div className="text-sm text-neutral-400">{s.location}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function startOfDay(ts: number) {
  const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime();
}
function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
}
