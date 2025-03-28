// app/components/ValuedCustomersLogos.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ValuedCustomersLogos = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server-side rendering placeholder
  if (!isClient) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Valued Customers
            </h2>
            <p className="text-lg text-gray-600">Loading customer logos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Valued Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by leading organizations across various sectors throughout
            Eastern India
          </p>
        </motion.div>

        {/* Main logo display - Centered with more width */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto" // Removed background and padding to match screenshot
        >
          {/* Logo grid container with wider constraints */}
          <div className="mx-auto max-w-5xl">
            {" "}
            {/* Increased max width */}
            {/* Full-width image of the logo grid */}
            <img
              src="/valued-customers-logos.png"
              alt="SMARTLiNE Valued Customers Logos"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Text below image (optional) - hidden to match screenshot */}
          {/* <div className="mt-4 text-center">
            <p className="text-gray-800 font-medium text-lg">
              And many more across Eastern India...
            </p>
          </div> */}
        </motion.div>

        {/* Sector representation */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { name: "Banking", count: 15 },
            { name: "Industrial", count: 30 },
            { name: "Retail", count: 12 },
            { name: "Healthcare", count: 14 },
            { name: "Government", count: 10 },
            { name: "Education", count: 9 },
            { name: "Telecom", count: 5 },
            { name: "Power", count: 6 },
          ].map((sector) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm text-center"
            >
              <div className="text-lg md:text-xl font-bold text-red-600">
                {sector.count}+
              </div>
              <div className="text-sm text-gray-700">{sector.name}</div>
            </motion.div>
          ))}
        </div>

        {/* ISO certification and years of service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-smartline-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-smartline-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <div className="ml-3 text-gray-800">
              ISO 9001:2015 Certified Company
            </div>
          </div>

          <div className="h-6 border-l border-gray-300 hidden md:block"></div>

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="ml-3 text-gray-800">
              Over 20 Years Serving Eastern India
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuedCustomersLogos;
