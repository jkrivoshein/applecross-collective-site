"use client";

import { useEffect, useState } from "react";
import type { ScrapedLink } from "@/lib/types";
import { dedupeLinks } from "@/lib/utils";
import EmbeddedPlayer from "./EmbeddedPlayer";

type Props = {
  links: ScrapedLink[];
};

export default function LinktreeList({ links }: Props) {
  const [deduped, setDeduped] = useState<ScrapedLink[]>([]);

  useEffect(() => {
    const flat = dedupeLinks(links); // ✅ dedupeLinks is now synchronous
    setDeduped(flat);
  }, [links]);

  return (
    <div className="space-y-4">
      {deduped.map((link) => (
        <div key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:underline"
          >
            {link.label || link.url}
          </a>
          <EmbeddedPlayer url={link.url} />
        </div>
      ))}
    </div>
  );
}
