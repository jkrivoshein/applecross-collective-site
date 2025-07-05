import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function ArtistPageShell({ children }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}
