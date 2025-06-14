// app/components/PartnerBrands.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Brand colors matching Smartline theme
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline cyan/teal
  secondary: "#dc2626", // smartline red
};

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: "oem" | "si";
  description: string;
}

const PartnerBrands = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"oem" | "si">("oem");

  const partners: Partner[] = [
    // OEM Partners (as specified by client)
    {
      id: "fuji-electric",
      name: "Fuji Electric India Private Limited",
      logo: "/partners/fuji.jpg", // Not available yet
      type: "oem",
      description:
        "Leading manufacturer of power electronics and industrial systems.",
    },
    {
      id: "schneider-electric",
      name: "Schneider Electric",
      logo: "/partners/schneider.jpg", // Available
      type: "oem",
      description:
        "Global leader in energy management and automation solutions.",
    },
    {
      id: "amara-raja",
      name: "Amara Raja Energy & Mobility Limited",
      logo: "/partners/amara-raja.png", // Available
      type: "oem",
      description: "Advanced energy storage and mobility solutions provider.",
    },
    {
      id: "exide",
      name: "Exide",
      logo: "/partners/exide.jpg", // Available
      type: "oem",
      description: "Trusted battery technology and energy storage solutions.",
    },
    {
      id: "apc",
      name: "APC",
      logo: "/partners/apc.png", // Available
      type: "oem",
      description:
        "Uninterruptible power supply and surge protection solutions.",
    },
    {
      id: "delta",
      name: "Delta",
      logo: "/partners/delta.png", // Available
      type: "oem",
      description: "Power and thermal management solutions provider.",
    },
    {
      id: "vertiv",
      name: "Vertiv (Earlier Known as Emerson)",
      logo: "/partners/vertiv.png", // Available
      type: "oem",
      description: "Critical digital infrastructure and continuity solutions.",
    },
    {
      id: "waaree",
      name: "Waaree Energies Ltd",
      logo: "/partners/waaree.png", // Not available yet
      type: "oem",
      description: "Solar energy solutions and renewable power systems.",
    },
    {
      id: "relicell",
      name: "Relicell",
      logo: "/partners/relicell.jpg", // Available
      type: "oem",
      description: "Advanced battery technology and power storage solutions.",
    },

    // SI Partners (as specified by client)
    {
      id: "hp",
      name: "Hewlett Packard (HP)",
      logo: "/partners/hp.jpg", // Available
      type: "si",
      description:
        "Global technology solutions and digital transformation services.",
    },
    {
      id: "future-netwings",
      name: "Future Netwings Solutions Private Limited",
      logo: "/partners/future-netwings.png", // Not available yet
      type: "si",
      description: "Comprehensive IT infrastructure and networking solutions.",
    },
    {
      id: "accel-it",
      name: "Accel IT Services",
      logo: "/partners/accel.jpg", // Available (assuming accel.jpg is for Accel IT)
      type: "si",
      description: "Enterprise IT solutions and system integration services.",
    },
    {
      id: "cms-computers",
      name: "CMS Computers",
      logo: "/partners/cms-computers.png", // Not available yet
      type: "si",
      description: "Complete computer solutions and IT support services.",
    },
    {
      id: "team-computer",
      name: "Team Computer",
      logo: "/partners/team-computer.png", // Not available yet
      type: "si",
      description:
        "Professional IT services and technology solutions provider.",
    },
    {
      id: "bharat-it",
      name: "Bharat IT",
      logo: "/partners/bharat-it.png", // Available (assuming bharat.jpg is for Bharat IT)
      type: "si",
      description: "Integrated IT solutions and digital services provider.",
    },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Filter partners based on active tab
  const filteredPartners = partners.filter(
    (partner) => partner.type === activeTab
  );

  return (
    <section id="partners" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Collaborating with industry-leading OEM and SI partners to deliver
            comprehensive power solutions and exceptional service quality
          </p>
        </motion.div>

        {/* Partner Type Tabs - Only OEM and SI */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-xl shadow-lg border border-gray-200">
            {[
              {
                value: "oem",
                label: "OEM Partners",
                count: partners.filter((p) => p.type === "oem").length,
              },
              {
                value: "si",
                label: "SI Partners",
                count: partners.filter((p) => p.type === "si").length,
              },
            ].map((tab, index) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as "oem" | "si")}
                className={`px-8 py-4 text-sm font-semibold transition-all duration-300 relative ${
                  index === 0 ? "rounded-l-xl" : "rounded-r-xl"
                } ${
                  activeTab === tab.value
                    ? "text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  background:
                    activeTab === tab.value
                      ? "linear-gradient(135deg, #58c8e3, #22d3ee)"
                      : "transparent",
                }}
              >
                <span className="flex flex-col items-center">
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs mt-1 ${
                      activeTab === tab.value
                        ? "text-white/80"
                        : "text-gray-500"
                    }`}
                  >
                    ({tab.count})
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab} // Re-animate when tab changes
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredPartners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px -5px rgba(0,0,0,0.15)",
              }}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 border border-gray-100 hover:border-cyan-200"
            >
              {/* Partner Logo */}
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 p-6">
                {/* Check if we have the actual logo file */}
                {[
                  "schneider.jpg",
                  "amara-raja.png",
                  "exide.jpg",
                  "apc.png",
                  "delta.png",
                  "vertiv.png",
                  "relicell.jpg",
                  "hp.jpg",
                  "accel.jpg",
                ].includes(partner.logo.split("/").pop() ?? "") ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-full object-contain filter hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // If image fails to load, show placeholder
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        ).style.display = "block";
                      }
                    }}
                  />
                ) : null}

                {/* Placeholder for missing logos */}
                <div
                  className="text-center"
                  style={{
                    display: [
                      "schneider.jpg",
                      "amara-raja.png",
                      "exide.jpg",
                      "apc.png",
                      "delta.png",
                      "vertiv.png",
                      "relicell.jpg",
                      "hp.jpg",
                      "accel.jpg",
                    ].includes(partner.logo.split("/").pop() ?? "")
                      ? "none"
                      : "block",
                  }}
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-cyan-600">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Partner Details */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {partner.description}
                </p>
                <div
                  className="rounded-full px-3 py-1 text-xs font-medium inline-block"
                  style={{
                    backgroundColor: `rgba(88, 200, 227, 0.1)`,
                    color: BRAND_COLORS.primary,
                  }}
                >
                  {partner.type === "oem" ? "OEM Partner" : "SI Partner"}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerBrands;
