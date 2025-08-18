import ArtistClientPage from '@/components/ArtistClientPage';
import { getArtistBySlug } from '@/lib/artist.config';
import { getShowsFromIcs } from '@/lib/fetchCalendar';
import { notFound } from 'next/navigation';
import type { Show } from '@/lib/types';

export default async function Page(context: { params: { username: string } }) {
  const { params } = await Promise.resolve(context);
  const { username } = params;

  const artist = getArtistBySlug(username);
  if (!artist) notFound();

  let mergedShows: Show[] = Array.isArray(artist.shows)
    ? artist.shows.map(s => ({ date: s.date, location: s.location, title: s.title }))
    : [];

  if (artist.calendarUrl) {
    try {
      const cal = await getShowsFromIcs(artist.calendarUrl);
      const key = (s: Show) =>
        `${new Date(s.date).toISOString().slice(0,10)}|${s.location.toLowerCase()}|${(s.title ?? '').toLowerCase()}`;

      const map = new Map<string, Show>();
      for (const s of mergedShows) map.set(key(s), s);
      for (const s of cal) map.set(key(s), s);

      mergedShows = [...map.values()].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    } catch (e) {
      console.error('Calendar fetch failed:', e);
    }
  }

  const artistWithShows = { ...artist, shows: mergedShows } as typeof artist & { shows: Show[] };
  return <ArtistClientPage artist={artistWithShows} />;
}
