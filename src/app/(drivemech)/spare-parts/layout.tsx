import Navbar from "@/components/Layout/Navbar";
import SparePartsNavbar from "@/components/spare-parts/home/SparePartsNavbar";

export default function SparePartsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="p-0 flex-1 mt-16">
                <SparePartsNavbar />
                {children}
            </main>
        </div>
    );
}   