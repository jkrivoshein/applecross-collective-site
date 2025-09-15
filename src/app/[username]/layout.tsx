// src/app/[username]/layout.tsx
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
