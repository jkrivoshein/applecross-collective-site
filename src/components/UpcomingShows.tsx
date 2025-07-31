'use client';

import { useEffect, useState } from 'react';
import type { Artist } from '@/lib/types';

interface Show {
  date: string;
  location: string;
}

export default function UpcomingShows({ artist }: { artist: Artist }) {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    if (!artist.calendarUrl) return;

    const fetchShows = async () => {
      try {
        const res = await fetch(`/api/calendar/${artist.slug}`);
        const json: unknown = await res.json();

        if (
          typeof json === 'object' &&
          json !== null &&
          'shows' in json &&
          Array.isArray((json as Record<string, unknown>).shows)
        ) {
          const showsRaw = (json as { shows: unknown }).shows;

          if (
            Array.isArray(showsRaw) &&
            showsRaw.every(
              (item): item is Show =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'location' in item &&
                typeof (item as Record<string, unknown>).date === 'string' &&
                typeof (item as Record<string, unknown>).location === 'string'
            )
          ) {
            setShows(showsRaw);
          }
        }
      } catch (e) {
        console.error('Failed to load calendar:', e);
      }
    };

    void fetchShows();
  }, [artist]);

  if (!shows.length) {
    return (
      <div className="text-center text-gray-400 py-6">
        No upcoming shows.
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center text-gray-200">
      {shows.map((show, i) => (
        <div key={i}>
          <div className="font-semibold">{show.date}</div>
          <div className="text-sm">{show.location}</div>
        </div>
      ))}
    </div>
  );
}
