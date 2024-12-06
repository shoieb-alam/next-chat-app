"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toggleDropdown();
    router.push("/");
  };

  return (
    <div className="relative">
      {/* Profile icon or avatar */}
      <button onClick={toggleDropdown} className="flex items-center space-x-2 p-2 bg-blue-600 rounded-full text-white">
        <span>👤</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48">
          <ul className="py-2">
            <li>
              <button
                onClick={() => router.push("/profile")}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/settings")}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
