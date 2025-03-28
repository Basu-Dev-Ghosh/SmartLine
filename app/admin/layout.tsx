// app/admin/layout.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import AdminHeader from "../components/AdminHeader";

// Initialize font
const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Handling logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {/* Don't show header on login page */}
      {isAuthenticated && <AdminHeader onLogout={handleLogout} />}
      {children}
    </div>
  );
}
