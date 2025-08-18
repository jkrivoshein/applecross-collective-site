// src/components/Shows.tsx
import type { Show } from '@/lib/types';

export default function Shows({ shows }: { shows: Show[] }) {
  if (!Array.isArray(shows) || shows.length === 0) {
    return <div className="text-center py-10">No upcoming shows.</div>;
  }

  return (
    <div className="space-y-4">
      {shows.map((show, idx) => {
        const date = new Date(show.date);
        const dateStr = date.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        return (
          <div
            key={idx}
            className="p-4 rounded-xl border border-gray-700 bg-gray-900 text-center"
          >
            <div className="text-lg font-semibold">{dateStr}</div>
            <div className="mt-1 text-base font-medium">
              {show.title ?? show.location}
            </div>
            {show.title && show.location && (
              <div className="text-sm opacity-70">{show.location}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
