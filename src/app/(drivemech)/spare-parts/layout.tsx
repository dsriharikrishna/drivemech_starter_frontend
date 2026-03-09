import Navbar from "@/components/Layout/Navbar";
import SparePartsNavbar from "@/components/spare-parts/home/SparePartsNavbar";
import { ToastProvider } from "@/components/ui/ToastProvider";

export default function SparePartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="p-0 flex-1 mt-16 pt-0 w-full">
          <SparePartsNavbar />
          <div className="w-full">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
