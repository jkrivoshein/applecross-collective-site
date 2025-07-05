import type { Show } from '@/lib/types';

type Props = {
  shows?: Show[];
};

export default function UpcomingShows({ shows }: Props) {
  if (!Array.isArray(shows) || shows.length === 0) {
    return <p>No upcoming shows.</p>;
  }

  return (
    <ul className="space-y-2">
      {shows.map((show, i) => (
        <li key={i} className="text-muted-foreground">
          <strong>{show.date}</strong> — {show.location}
        </li>
      ))}
    </ul>
  );
}
