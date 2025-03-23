// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import RootLayoutClient from "./RootLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMARTLiNE - Power Solutions & Electrical Services",
  description:
    "SMARTLiNE is an ISO 9001:2015 Company providing power solutions, UPS, battery, solar and electrical services across Eastern India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient>
          <Navbar />
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
