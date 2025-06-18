"use client";

import { useState } from "react";
import { artists } from "@/lib/artist.config";
import ArtistClientPage from "@/components/ArtistClientPage";

export default function HomePage() {
  const artistKeys = Object.keys(artists);
  const [selectedArtistKey, setSelectedArtistKey] = useState("applecross-collective");

  const selectedArtist = artists[selectedArtistKey];

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 md:px-16 lg:px-32 bg-[#0e0e0e] text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-4 md:mb-0">
          Applecross Collective
        </h1>
        <select
          value={selectedArtistKey}
          onChange={(e) => setSelectedArtistKey(e.target.value)}
          className="bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2"
        >
          {artistKeys.map((key) => (
            <option key={key} value={key}>
              {artists[key].name}
            </option>
          ))}
        </select>
      </div>

      <ArtistClientPage artist={selectedArtist} />
    </div>
  );
}
