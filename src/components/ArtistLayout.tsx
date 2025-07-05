'use client';

import React from 'react';

interface ArtistLayoutProps {
  children: React.ReactNode;
}

const ArtistLayout: React.FC<ArtistLayoutProps> = ({ children }) => {
  return <div className="artist-layout">{children}</div>;
};

export default ArtistLayout;
