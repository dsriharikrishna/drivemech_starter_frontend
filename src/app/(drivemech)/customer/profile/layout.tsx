"use client";

import ProfileSidebar from "@/components/customer/profile/ProfileSidebar";
import ScrollableTabs, { TabItem } from "@/components/ui/ScrollableTabs";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, Car, CreditCard, MapPin, Settings } from "lucide-react";

const TABS: TabItem[] = [
  { id: "/customer/profile", label: "Profile", icon: <User size={18} /> },
  { id: "/customer/profile/my-orders", label: "Orders", icon: <ShoppingBag size={18} /> },
  { id: "/customer/profile/my-vehicles", label: "Vehicles", icon: <Car size={18} /> },
  { id: "/customer/profile/my-payments", label: "Payments", icon: <CreditCard size={18} /> },
  { id: "/customer/profile/my-address", label: "Addresses", icon: <MapPin size={18} /> },
  { id: "/customer/profile/my-settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function ProfileRootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    TABS.find((t) =>
      t.id === "/customer/profile"
        ? pathname === "/customer/profile"
        : pathname.startsWith(t.id)
    )?.id ?? "/customer/profile";

  return (
    <div className="w-full flex flex-col">

      {/* ── MOBILE TAB BAR ── only visible below lg, sticks below the fixed navbar (top-16) */}
      <div className="lg:hidden sticky top-16 z-20 bg-white border-b border-gray-100 shadow-sm -mx-3 px-2 py-1.5 overflow-hidden">
        <ScrollableTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(id) => router.push(id)}
          variant="compact"
          showArrows={true}
          arrowPosition="inside"
          className="w-full"
        />
      </div>

      {/* ── BODY ── */}
      <div className="flex gap-4 mt-2 lg:mt-0 px-8 py-4">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-4 self-start h-[calc(100vh-6rem)]">
          <ProfileSidebar />
        </aside>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 min-w-0 bg-white rounded-xl shadow-sm p-3">
          {children}
        </main>

      </div>
    </div>
  );
}
