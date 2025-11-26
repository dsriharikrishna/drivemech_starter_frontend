import Navbar from '@/components/Layout/Navbar';
import { ReactNode } from 'react';

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 m-4 py-12">
        {children}
      </main>
    </div>
  );
}