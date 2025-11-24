import { ReactNode } from 'react';

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}