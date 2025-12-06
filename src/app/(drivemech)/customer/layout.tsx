import Navbar from '@/components/Layout/Navbar';
import { ReactNode } from 'react';

export default function CutomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex ">
      <Navbar />
      <main className="p-0 flex-1 mt-16">
        {children}
      </main>
    </div>
  );
}