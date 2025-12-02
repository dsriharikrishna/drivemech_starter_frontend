import ProfileSidebar from "@/components/customer/profile/ProfileSidebar";
import { ReactNode } from "react";

export default function ProfileRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Centered container */}
      <div className="flex w-full max-w-7xl gap-4 p-4 overflow-hidden">
        
        {/* 👉 FIXED SIDEBAR */}
        <aside className="w-64 h-screen sticky top-4">
          <ProfileSidebar />
        </aside>

        {/* 👉 ONLY RIGHT SIDE SCROLLS */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

      </div>
    </div>
  );
}
