import Navbar from '@/components/Layout/Navbar';
import { ReactNode } from 'react';

export default function LocationRootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex bg-white">
            <Navbar />
            <main className="pt-18 flex-1">
                {children}
            </main>
        </div>
    );
}