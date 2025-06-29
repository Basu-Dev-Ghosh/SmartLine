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
  hasLogo: boolean;
}

const PartnerBrands = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"oem" | "si">("oem");

  const partners: Partner[] = [
    // OEM Partners (as specified by client)
    {
      id: "fuji-electric",
      name: "Fuji Electric India Private Limited",
      logo: "/partners/fuji.jpg",
      type: "oem",
      description:
        "Leading manufacturer of power electronics and industrial systems.",
      hasLogo: true,
    },
    {
      id: "schneider-electric",
      name: "Schneider Electric",
      logo: "/partners/schneider.jpg",
      type: "oem",
      description:
        "Global leader in energy management and automation solutions.",
      hasLogo: true,
    },
    {
      id: "amara-raja",
      name: "Amara Raja Energy & Mobility Limited",
      logo: "/partners/araja.jpg",
      type: "oem",
      description: "Advanced energy storage and mobility solutions provider.",
      hasLogo: true,
    },
    {
      id: "exide",
      name: "Exide",
      logo: "/partners/exide.jpg",
      type: "oem",
      description: "Trusted battery technology and energy storage solutions.",
      hasLogo: true,
    },
    {
      id: "apc",
      name: "APC",
      logo: "/partners/apc2.jpg",
      type: "oem",
      description:
        "Uninterruptible power supply and surge protection solutions.",
      hasLogo: true,
    },
    {
      id: "delta",
      name: "Delta",
      logo: "/partners/delta.png",
      type: "oem",
      description: "Power and thermal management solutions provider.",
      hasLogo: true,
    },
    {
      id: "vertiv",
      name: "Vertiv (Earlier Known as Emerson)",
      logo: "/partners/vertiv.jpg",
      type: "oem",
      description: "Critical digital infrastructure and continuity solutions.",
      hasLogo: true,
    },
    {
      id: "waaree",
      name: "Waaree Energies Ltd",
      logo: "/partners/waaree.jpg",
      type: "oem",
      description: "Solar energy solutions and renewable power systems.",
      hasLogo: true,
    },
    {
      id: "relicell",
      name: "Relicell",
      logo: "/partners/relicell.jpg",
      type: "oem",
      description: "Advanced battery technology and power storage solutions.",
      hasLogo: true,
    },

    // SI Partners (as specified by client)
    {
      id: "hp",
      name: "Hewlett Packard (HP)",
      logo: "/partners/hp.jpg",
      type: "si",
      description:
        "Global technology solutions and digital transformation services.",
      hasLogo: true,
    },
    {
      id: "future-netwings",
      name: "Future Netwings Solutions Private Limited",
      logo: "/partners/fnet.jpg",
      type: "si",
      description: "Comprehensive IT infrastructure and networking solutions.",
      hasLogo: true,
    },
    {
      id: "accel-it",
      name: "Accel IT Services",
      logo: "/partners/accelit.jpg",
      type: "si",
      description: "Enterprise IT solutions and system integration services.",
      hasLogo: true,
    },
    {
      id: "cms-computers",
      name: "CMS Computers",
      logo: "/partners/cms2.jpg",
      type: "si",
      description: "Complete computer solutions and IT support services.",
      hasLogo: true,
    },
    {
      id: "team-computer",
      name: "Team Computer",
      logo: "/partners/tc.jpg",
      type: "si",
      description:
        "Professional IT services and technology solutions provider.",
      hasLogo: true,
    },
    {
      id: "bharat-it",
      name: "Bharat IT",
      logo: "/partners/bit.jpg",
      type: "si",
      description: "Integrated IT solutions and digital services provider.",
      hasLogo: true,
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
                {partner.hasLogo ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-full object-contain filter hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // If image fails to load, show placeholder
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const placeholder =
                        target.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = "block";
                      }
                    }}
                  />
                ) : null}

                {/* Placeholder for failed/missing logos */}
                <div
                  className="text-center"
                  style={{
                    display: partner.hasLogo ? "none" : "block",
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
