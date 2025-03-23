// app/contact/layout.tsx
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "./loading"; // You'll need to create this

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <main className="flex-grow pt-24 pb-16">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
