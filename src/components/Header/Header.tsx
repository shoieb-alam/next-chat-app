"use client";

import ProfileDropdown from "@/components/Sidebar/ProfileDropdown";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const hideProfileDropdown = pathname === "/" || pathname === "/signup";

  return (
    <header
      className={`${
        pathname === "/signup" ? "bg-green-500" : "bg-blue-500"
      } app-header flex justify-between items-center py-4 px-8 text-white`}
    >
      <h1 className="text-xl font-bold">Chat App</h1>
      {!hideProfileDropdown && <ProfileDropdown />}
    </header>
  );
}
