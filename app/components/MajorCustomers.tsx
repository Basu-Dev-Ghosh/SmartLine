// app/components/MajorCustomers.tsx
"use client";

import { useState } from "react";
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

  const sectors: CustomerSector[] = [
    {
      id: "banking",
      name: "Banking Sector",
      customers: [
        "SBI",
        "Axis Bank",
        "IDBI Bank",
        "Allahabad Bank",
        "ICICI Bank",
        "HDFC Bank",
        "RBI",
        "UCO Bank",
        "Bank of India",
        "Central Bank",
        "UKBG",
        "UBI",
        "OBC",
      ],
    },
    {
      id: "public",
      name: "Public Sector",
      customers: [
        "Sail",
        "DPL",
        "Indian Oil",
        "BPCL",
        "DVC",
        "BHEL",
        "NTPC",
        "ONG",
      ],
    },
    {
      id: "telecom",
      name: "Telecom Sector",
      customers: ["Airtel", "Vodafone", "Simoco", "BSNL", "Aircel"],
    },
    {
      id: "retail",
      name: "Retail Sector",
      customers: [
        "Future Group",
        "Spencer",
        "More",
        "Shopper Stop",
        "South City",
        "Mobile Store",
        "Shreeram Ozone",
        "Tanishk",
        "Pantaloons",
        "Avani mall",
      ],
    },
    {
      id: "education",
      name: "Education Sector",
      customers: [
        "ICFAI",
        "ICA",
        "Jadavpur University",
        "CMERI",
        "Rahbadh Engg College",
        "Saha Institute",
        "NIT Durgapur",
        "NHSM",
        "Techno India",
      ],
    },
    {
      id: "government",
      name: "Government Sector",
      customers: [
        "Airport Authority of India",
        "Department of Astronomy",
        "National Horticultural Board",
        "Eastern Railway",
        "South Eastern Railway",
        "Geological Survey of India",
        "Webel Technologies",
        "Dept of Customs",
        "Samir",
        "ERTL",
      ],
    },
    {
      id: "courier",
      name: "Courier Sector",
      customers: ["AFL", "Blue Dart", "DTDC"],
    },
    {
      id: "it",
      name: "IT Sector",
      customers: [
        "Rolta India",
        "Globsyn",
        "Sky Tech",
        "First source",
        "Huges",
        "IXIA",
        "On Process",
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare Sector",
      customers: [
        "Peerless Hospital",
        "Woodard Hospital",
        "Mison Hospital",
        "Apollo Hospital",
        "B.M Birla Hospital",
        "West Bengal Health",
        "CMRI Hospital",
        "NRS Hospital",
        "Chattaranjan Hospital",
        "Barasat Hospital",
        "Canning Hospital",
        "Indian Institute of Lever",
      ],
    },
    {
      id: "consultant",
      name: "Consultants Sector",
      customers: [
        "M.N Dusdur",
        "Mecon",
        "DCL / DCIPS",
        "Descon Limited",
        "Lalbmeyer International India",
        "RITES Ltd",
        "Nitson & Amitsu Pvt Ltd",
      ],
    },
    {
      id: "si",
      name: "System Integrator",
      customers: [
        "CMS",
        "Hewlett Packard",
        "Sysnet Global",
        "Accel IT Services",
        "Bharat IT Services",
        "Tech Elicon",
        "PCS",
      ],
    },
    {
      id: "industrial",
      name: "Industrial Sector",
      customers: [
        "Ultratech Cement",
        "Simplex",
        "Ambuja Cement",
        "Paharpur Cooling Tower",
        "Hindustan Lever",
        "L&T",
        "Balmar Lawrie",
        "Eveready",
        "TATA Chemicals",
        "Philips",
        "Kesoram Rayon",
        "ITC",
        "BEML",
        "Berjer Paints",
        "Jenson Nicholson",
        "Britannia Industries",
        "Bieco Lawrie",
        "Tata Tea",
        "Godrej",
        "Glaxo",
        "Blue Star",
        "Orissa Sponge Iron",
        "Philips Carbon",
        "Prax Air",
        "Schneider Electric",
        "Shyam Steel",
        "Bhusan Steel",
        "Ruchi Soya",
        "Emami",
        "Mitsubishi",
      ],
    },
    {
      id: "ups",
      name: "UPS OEM Sector",
      customers: ["DB Power", "Power One", "Emerson", "APC", "Delta"],
    },
    {
      id: "power",
      name: "Power Sector",
      customers: [
        "CESC",
        "WBSEDCL/WBSETCL",
        "Power Grid",
        "Purulia Pump Stored",
      ],
    },
    {
      id: "other",
      name: "Other Sector",
      customers: [
        "Inox",
        "Microsec",
        "Ananda Bazar",
        "Kodak",
        "Srijan Reality",
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
            onClick={() => setActiveTab("all")}
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
              onClick={() => setActiveTab(sector.id)}
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
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                expandedSector === sector.id ? "shadow-lg" : "shadow-sm"
              }`}
            >
              <div
                className={`px-6 py-4 cursor-pointer ${
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

              {(expandedSector === sector.id || activeTab !== "all") && (
                <div className="px-6 py-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {sector.customers.map((customer, index) => (
                      <span
                        key={`${sector.id}-${index}`}
                        className="inline-block px-3 py-1 rounded-md text-sm border border-gray-200 bg-gray-50 text-gray-700"
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  style={{ color: BRAND_COLORS.secondary }}
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
              <span
                className="font-medium"
                style={{ color: BRAND_COLORS.secondary }}
              >
                Ather Energy (EV Charger)
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  style={{ color: BRAND_COLORS.secondary }}
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
              <span
                className="font-medium"
                style={{ color: BRAND_COLORS.secondary }}
              >
                Einova (Online UPS)
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  style={{ color: BRAND_COLORS.secondary }}
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
              <span
                className="font-medium"
                style={{ color: BRAND_COLORS.secondary }}
              >
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
