// components/admin/AdminHeader.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordChangeModal from "./PasswordChangeModal";
import Image from "next/image";

interface AdminHeaderProps {
  onLogout: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  title?: string;
}

const AdminHeader = ({
  onLogout,
  showBackButton = false,
  onBackClick,
  title = "Admin Dashboard",
}: AdminHeaderProps) => {
  const router = useRouter();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SMARTLiNE"
                width={180}
                height={50}
                className="h-12 w-auto"
                priority
              />
              <h2 className="text-xl font-bold text-gray-800 ml-4">{title}</h2>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {showBackButton && onBackClick && (
              <button
                onClick={onBackClick}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
            )}

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm sm:text-base hidden sm:block"
            >
              Change Password
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Small Screen Settings Menu */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="flex justify-around">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="py-3 px-4 flex-1 text-center text-gray-700"
          >
            <svg
              className="w-5 h-5 mx-auto mb-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-xs">Password</span>
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default AdminHeader;
