import { NextResponse } from 'next/server';
import * as ical from 'node-ical';
import { getArtistBySlug } from '@/lib/artist.config';

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  const artist = getArtistBySlug(slug);

  if (!artist || !artist.calendarUrl) {
    return NextResponse.json({ error: 'No calendar URL for this artist' }, { status: 404 });
  }

  try {
    const data = await ical.async.fromURL(artist.calendarUrl);
    const now = new Date();

    const shows = Object.values(data)
      .filter((event): event is ical.VEvent => event.type === 'VEVENT' && event.start > now)
      .map((event) => ({
        date: event.start.toISOString(),
        location: event.location || event.summary || '',
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ shows });
  } catch (e) {
    console.error('Calendar fetch failed:', e);
    return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 });
  }
}
