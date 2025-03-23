// app/RootLayoutClient.tsx
"use client";

import { useState, useEffect } from "react";
import SplashLoader from "./components/SplashLoader";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SplashLoader onComplete={() => setIsLoading(false)} />
      ) : (
        children
      )}
    </>
  );
}
