import Navbar from '@/components/Layout/Navbar';
import { ReactNode } from 'react';

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex ">
      <main className="p-0 flex-1">
        {children}
      </main>
    </div>
  );
}