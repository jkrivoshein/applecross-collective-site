import { Artist } from '@/lib/types';

export default function UpcomingShows({ artist }: { artist: Artist }) {
  if (!Array.isArray(artist.shows)) return null;

  return (
    <div className="space-y-4">
      {artist.shows.map((show, idx) => (
        <div key={idx} className="text-sm">
          <p>{show.date}</p>
          <p className="text-muted-foreground">{show.location}</p>
        </div>
      ))}
    </div>
  );
}
