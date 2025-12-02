import ProfileSidebar from "@/components/customer/profile/ProfileSidebar";
import Navbar from "@/components/Layout/Navbar";
import { ReactNode } from "react";

export default function ProfileRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      <div className="flex p-4 gap-4">
        <aside className="h-full">
          <ProfileSidebar />
        </aside>

        <main className="flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
