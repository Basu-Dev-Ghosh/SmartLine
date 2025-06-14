// app/components/MajorCustomers.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

interface CustomerSector {
  id: string;
  name: string;
  customers: string[];
}

const MajorCustomers = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const toggleSector = (sectorId: string) => {
    if (expandedSector === sectorId) {
      setExpandedSector(null);
    } else {
      setExpandedSector(sectorId);
    }
  };

  // Reset expanded sector when changing tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setExpandedSector(null);
  };

  // Also reset expanded sector whenever activeTab changes (as a safety measure)
  useEffect(() => {
    setExpandedSector(null);
    console.log("Tab changed to:", activeTab, "Expanded sector reset to null");
  }, [activeTab]);

  const sectors: CustomerSector[] = [
    {
      id: "medical",
      name: "Medical Sector",
      customers: [
        "Indian Institute of Liver and Digestive Sciences (IILDS)",
        "Desun Hospital (PN Memorial Neurocentre & Research Institute Limited)",
        "Apollo Multispeciality Hospitals Limited",
        "CMRI (Calcutta Medical Research Institute)",
        "Medica Superspecialty Hospital",
        "Dr. SS Chatterjee Heart Centre",
        "Microlap Nursing Home",
        "Nibedita Nursing Home",
        "RN Tagore Hospital",
      ],
    },
    {
      id: "pwd-hospitals",
      name: "Various Hospitals under PWD",
      customers: [
        "Nil Ratan Sircar College & Hospital",
        "Calcutta National Medical College & Hospital",
        "Dr. JR Dhar Bangaon SD Hospital",
        "Diamond Harbour Medical College & Hospital",
        "Bhatpara General Hospital",
        "Mathabhanga Sub Divisional Hospital",
        "Mekhliganj Sub Divisional Hospital",
        "Tufanganj Sub Divisional Hospital",
        "MJN Medical College & Hospital",
        "Alipurduar District Hospital",
        "Dinhata Sub Divisional Hospital",
        "Coochbehar Circuit House",
        "North Bengal Medical College & Hospital",
      ],
    },
    {
      id: "education",
      name: "Education Sector",
      customers: [
        "NIFT (National Institute of Fashion Technology)",
        "Calcutta University",
        "Jadavpur University",
        "NSHM Knowledge Campus",
        "IIT Kharagpur",
        "Army Institute of Management Kolkata",
        "Neotia University (under Ambuja)",
      ],
    },
    {
      id: "it",
      name: "IT Sector",
      customers: [
        "Rebecca Technologies Private Limited",
        "Future Netwings Solutions Private Limited",
        "Milano IT Solutions (P) LTD",
        "Team Computer Private Limited",
        "Bharat IT Services Limited",
        "Tech Elecon",
        "Accel IT Resources Limited",
        "MB Software",
        "Elnova Services",
      ],
    },
    {
      id: "banking",
      name: "Banking Sector",
      customers: [
        "Uttarbangka Kshetriya Gramin Bank",
        "Bank of India (Howrah Zone)",
        "SBI Home Loan & SBI Life",
        "Malda Cooperative Bank",
        "Vidyasagar Central Co-operative Bank",
        "Tamluk Ghatal Central Co-Operative Bank Limited",
        "The New India Assurance Company Limited (Insurance Sector)",
      ],
    },
    {
      id: "government",
      name: "Government Sector",
      customers: [
        "WESEDCL (approx. 30 divisions throughout West Bengal)",
        "HUDCO (Housing & Urban Development Corporation)",
        "Indian Space Research Organisation (ISRO)",
        "Polytechnic Colleges Throughout West Bengal (WTL and Karigari Bhavan)",
        "ITI Colleges Throughout West Bengal (WTL and Karigari Bhavan)",
      ],
    },
    {
      id: "hospitality",
      name: "Hospitality/Hotels",
      customers: [
        "Novotel Kolkata (SPPL Hotels PVT LTD)",
        "Hotel Hindustan International",
      ],
    },
    {
      id: "corporate",
      name: "Corporate/Industrial",
      customers: [
        "India Power Corporation Limited",
        "Hiranmayee Energy Limited",
        "Skipper Limited",
        "Mother Dairy",
        "Emami Limited",
        "Amrit Cement",
        "Leatherman Fashion",
        "Trend Limited (West Side)",
        "Globe All India Services",
        "Graffiti Signgraphics Pvt. Ltd",
      ],
    },
    {
      id: "realestate",
      name: "Real Estate/Infrastructure",
      customers: [
        "Infinity Benchmark",
        "Merlin Infinity",
        "Infinity IT Lagoon",
        "Infinity Martin Burn Business Park",
        "Adventz Infinity",
        "Infinity Godrej Waterside",
        "Candor Techspace (Brookfield Properties Limited)",
        "Ambuja Neotia Merline",
        "Merlin Group",
        "Astra Tower Rajarhat IT Park",
        "CBRE Kolkata",
      ],
    },
  ];

  // Filter sectors based on active tab
  const filteredSectors =
    activeTab === "all"
      ? sectors
      : sectors.filter((sector) => sector.id === activeTab);

  return (
    <section id="customers" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Major Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SMARTLiNE is proud to serve these prestigious organizations across
            Eastern India
          </p>
        </motion.div>

        {/* Sector filter tabs */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === "all"
                ? "text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                activeTab === "all" ? BRAND_COLORS.primary : undefined,
            }}
          >
            All Sectors
          </button>

          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => handleTabChange(sector.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === sector.id
                  ? "text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeTab === sector.id ? BRAND_COLORS.primary : undefined,
              }}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Customer list by sector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSectors.map((sector) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`border rounded-lg overflow-hidden transition-all duration-300 flex flex-col ${
                expandedSector === sector.id ? "shadow-lg" : "shadow-sm"
              }`}
              style={{
                gridColumn: expandedSector === sector.id ? "1 / -1" : "auto",
              }}
            >
              <div
                className={`px-6 py-4 cursor-pointer flex-shrink-0 ${
                  expandedSector === sector.id
                    ? "text-white"
                    : "text-gray-700 hover:text-gray-900 bg-gray-50"
                }`}
                style={{
                  backgroundColor:
                    expandedSector === sector.id
                      ? BRAND_COLORS.primary
                      : undefined,
                }}
                onClick={() => toggleSector(sector.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{sector.name}</h3>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      expandedSector === sector.id ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Only show content when specifically expanded */}
              {expandedSector === sector.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-white flex-grow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sector.customers.map((customer, index) => (
                      <div
                        key={`${sector.id}-${index}`}
                        className="flex items-center p-3 rounded-md bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div
                          className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                          style={{ backgroundColor: BRAND_COLORS.primary }}
                        ></div>
                        <span className="text-sm text-gray-700 font-medium">
                          {customer}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Authorised Service Provider Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gray-50 rounded-lg p-8 border border-gray-100 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Authorised Service Provider Of:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: "rgba(88, 200, 227, 0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  style={{ color: BRAND_COLORS.primary }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-900">
                Einova (Online UPS)
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: "rgba(88, 200, 227, 0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  style={{ color: BRAND_COLORS.primary }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-900">
                TVSE (Multiple Products)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MajorCustomers;
