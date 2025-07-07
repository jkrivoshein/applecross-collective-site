import type { Show } from '@/lib/types';

export default function UpcomingShows({ shows }: { shows?: Show[] }) {
  if (!shows || shows.length === 0) {
    return <p className="text-sm text-white">No shows announced.</p>;
  }

  return (
    <ul className="space-y-4 mt-4">
      {shows.map((show, idx) => (
        <li key={idx} className="text-sm text-white">
          {show.date} — {show.location}
        </li>
      ))}
    </ul>
  );
}
