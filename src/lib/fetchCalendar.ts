import type { Show } from './types';

const toIso = (raw: string): string | undefined => {
  const m = raw.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})Z)?$/);
  if (!m) return undefined;
  const [, y, mo, d, hh = '00', mm = '00', ss = '00'] = m;
  const iso = `${y}-${mo}-${d}T${hh}:${mm}:${ss}Z`;
  const dt = new Date(iso);
  return Number.isNaN(dt.getTime()) ? undefined : dt.toISOString();
};

export async function getShowsFromIcs(icsUrl: string): Promise<Show[]> {
  const res = await fetch(icsUrl, { cache: 'no-store' });
  if (!res.ok) return [];
  const text = await res.text();

  const lines = text.replace(/\r\n[ \t]/g, '').split(/\r?\n/);

  const shows: Show[] = [];
  let inEvent = false;
  let dtstart = '';
  let location = '';
  let summary = '';

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true; dtstart = ''; location = ''; summary = '';
      continue;
    }
    if (line === 'END:VEVENT') {
      if (dtstart) {
        const iso = toIso(dtstart);
        if (iso) shows.push({ date: iso, location, title: summary || undefined });
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith('DTSTART')) {
      const [, value] = line.split(':', 2);
      dtstart = (value ?? '').trim();
    } else if (line.startsWith('LOCATION:')) {
      location = line.slice('LOCATION:'.length).trim();
    } else if (line.startsWith('SUMMARY:')) {
      summary = line.slice('SUMMARY:'.length).trim();
    }
  }

  const now = Date.now();
  return shows
    .filter(s => Date.parse(s.date) >= now)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
