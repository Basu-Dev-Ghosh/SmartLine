// app/components/PartnerBrands.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: "oem" | "si";
  description: string;
}

const PartnerBrands = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "oem" | "si">("all");

  const partners: Partner[] = [
    // OEM Partners
    {
      id: "schneider",
      name: "Schneider Electric",
      logo: "/partners/schneider.jpg",
      type: "oem",
      description:
        "Global leader in energy management and automation solutions.",
    },
    {
      id: "exide",
      name: "Amara Raja / Exide",
      logo: "/partners/exide.jpg",
      type: "oem",
      description: "Innovative battery solutions for diverse industrial needs.",
    },
    {
      id: "relicell",
      name: "Relicell",
      logo: "/partners/relicell.jpg",
      type: "oem",
      description:
        "Advanced power storage technologies for critical applications.",
    },
    {
      id: "apc",
      name: "APC / Delta / Emerson",
      logo: "/partners/apc.jpg",
      type: "oem",
      description: "Cutting-edge power and cooling infrastructure solutions.",
    },
    // SI Partners
    {
      id: "accel",
      name: "Accel IT Services",
      logo: "/partners/accel.jpg",
      type: "si",
      description: "Comprehensive IT infrastructure and integration expertise.",
    },
    {
      id: "cms",
      name: "CMS Computers",
      logo: "/partners/cms.jpg",
      type: "si",
      description: "Enterprise-grade IT solutions and system integration.",
    },
    {
      id: "hp",
      name: "Hewlett Packard",
      logo: "/partners/hp.jpg",
      type: "si",
      description: "Global technology solutions and digital transformation.",
    },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
  const filteredPartners =
    activeTab === "all"
      ? partners
      : partners.filter((partner) => partner.type === activeTab);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Trusted <span className="text-green-600">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver innovative solutions
          </p>
        </motion.div>

        {/* Partner Type Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-full shadow-md">
            {[
              { value: "all", label: "All Partners" },
              { value: "oem", label: "OEM Partners" },
              { value: "si", label: "SI Partners" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as "all" | "oem" | "si")}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.value
                    ? "bg-green-600 text-white rounded-full"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPartners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px -5px rgba(0,0,0,0.1)",
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              {/* Partner Logo */}
              <div className="h-36 flex items-center justify-center bg-gray-50 border-b border-gray-100">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain"
                />
              </div>

              {/* Partner Details */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-1">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {partner.description}
                </p>
                <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs inline-block">
                  {partner.type === "oem" ? "OEM Partner" : "SI Partner"}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Strategic Partnership Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-green-500 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="bg-white p-8 rounded-b-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Strategic Partnership{" "}
              <span className="text-blue-600">Advantages</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Proven Expertise",
                  description:
                    "Access to top-tier technical knowledge and industry insights.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  title: "Integrated Solutions",
                  description:
                    "Seamless compatibility across multiple vendor technologies.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Cost Efficiency",
                  description:
                    "Competitive pricing through strategic partnerships.",
                },
              ].map((advantage, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all"
                >
                  <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/contact")}
                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 transition-all inline-flex items-center group"
              >
                Become a Partner
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerBrands;
