"use client";

import useSWR from "swr";

export type LinkItem = { label: string; url: string };
export type LinktreeData = {
  profileImage: string | null;
  links: LinkItem[];
};

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<LinktreeData>);

export function LinktreeList({ username }: { username: string }) {
  const { data, error } = useSWR<LinktreeData>(
    `/api/linktree/${username}`,
    fetcher
  );

  if (error)
    return (
      <p className="text-sm text-red-400">
        Couldn’t load Linktree links.
      </p>
    );
  if (!data) return <p className="text-sm text-zinc-500">Loading…</p>;
  if (data.links.length === 0)
    return <p className="text-sm text-zinc-500">No links found.</p>;

  return (
    <ul className="mt-4 space-y-3">
      {data.links.map((ln) => (
        <li key={ln.url}>
          <a
            href={ln.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-5 py-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition font-medium"
          >
            {ln.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
