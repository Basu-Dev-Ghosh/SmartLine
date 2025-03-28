// app/components/WhyChooseSmartline.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

const WhyChooseSmartline = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const toggleRegion = (regionId: string) => {
    if (expandedRegion === regionId) {
      setExpandedRegion(null);
    } else {
      setExpandedRegion(regionId);
    }
  };

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

  const strengths = [
    {
      id: "expertise",
      title: "Expertise",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M11.35 3.836c-.065.21-.1.436-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.094-.75.302-.75.714v3.465a.75.75 0 0 1-.072.362l-3.483 6.19a.75.75 0 0 0 .188.787l2.5 2.5a.75.75 0 0 0 .787.188l6.19-3.483a.75.75 0 0 1 .362-.072h3.465a.75.75 0 0 0 .714-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.094-.75.302-.75.714v3.465a.75.75 0 0 1-.072.362l-3.483 6.19a.75.75 0 0 0 .188.787l2.5 2.5a.75.75 0 0 0 .787.188l6.19-3.483a.75.75 0 0 1 .362-.072h3.465a.75.75 0 0 0 .714-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.094-.75.302-.75.714v3.465a.75.75 0 0 1-.072.362l-3.483 6.19a.75.75 0 0 0 .188.787l2.5 2.5a.75.75 0 0 0 .787.188l6.19-3.483a.75.75 0 0 1 .362-.072h3.465a.75.75 0 0 0 .714-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.094-.75.302-.75.714v3.465a.75.75 0 0 1-.072.362l-3.483 6.19a.75.75 0 0 0 .188.787l2.5 2.5a.75.75 0 0 0 .787.188l6.19-3.483a.75.75 0 0 1 .362-.072h3.465a.75.75 0 0 0 .714-.75a2.25 2.25 0 0 0-.1-.664" />
        </svg>
      ),
      description:
        "Our team brings deep expertise, delivering customized solutions tailored to your specific industry needs.",
    },
    {
      id: "availability",
      title: "Availability",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      description:
        "24/7 support through multiple communication channels, ensuring we're always within reach.",
    },
    {
      id: "flexibility",
      title: "Flexibility",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
        </svg>
      ),
      description:
        "Agile approach to meet evolving client requirements with quick adaptation and custom solutions.",
    },
    {
      id: "speed",
      title: "Speed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.584 10.5c.105.424.51.729.94.729h12.852c.402 0 .751-.254.846-.641l1.991-7.958a.75.75 0 0 0-.881-.916 49.86 49.86 0 0 1-14.506 1.406V2.405Zm0 0V18a.75.75 0 0 0 .75.75h15A.75.75 0 0 0 19.5 18V6.908c0-1.282-.869-2.402-2.134-2.612a48.443 48.443 0 0 1-11.577-1.59.75.75 0 0 0-.906.838Z" />
        </svg>
      ),
      description:
        "Rapid response and solution delivery, keeping pace with your business's dynamic needs.",
    },
  ];

  // Geographic regions
  const regions = [
    {
      id: "north",
      name: "North Bengal & Sikkim",
      description: "Residential Technical Hub and dedicated support",
      areas: [
        "Coochbehar",
        "Siliguri",
        "Jalpaiguri",
        "Alipurduar",
        "Darjeeling",
        "Sikkim",
      ],
    },
    {
      id: "central",
      name: "Central Regions",
      description: "Dedicated manpower for comprehensive coverage",
      areas: ["Uttar Dinajpur", "Dakshin Dinajpur", "Malda"],
    },
    {
      id: "west",
      name: "Western Regions",
      description: "Technical expertise across industrial centers",
      areas: ["Asansol", "Purulia", "Durgapur", "Surrounding Regions"],
    },
    {
      id: "east",
      name: "Eastern Regions",
      description: "Dedicated service and support personnel",
      areas: ["Purba Medinipur", "Paschim Medinipur"],
    },
    {
      id: "kolkata",
      name: "Kolkata & Surroundings",
      description: "Head Office and primary service hub",
      areas: [
        "Kolkata",
        "Howrah",
        "Hooghly",
        "Krishnanagar",
        "Burdwan",
        "Surrounding Areas",
      ],
    },
  ];

  return (
    <section
      id="why-choose"
      className="relative py-16 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose{" "}
            <span style={{ color: BRAND_COLORS.secondary }}>SMART</span>{" "}
            <span style={{ color: BRAND_COLORS.primary }}>LiNE</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Delivering innovative solutions with expertise, reliability, and
            commitment
          </motion.p>
        </motion.div>

        {/* Geographic Presence Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Geographical Presence
              </h3>
              <p className="text-gray-600 mb-6">
                Comprehensive coverage across West Bengal & Sikkim with a 50+
                personnel service team
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regions.map((region) => (
                  <motion.div
                    key={region.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div
                      className="p-4 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleRegion(region.id)}
                    >
                      <h4 className="font-medium text-gray-800">
                        {region.name}
                      </h4>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${
                          expandedRegion === region.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                        style={{ color: BRAND_COLORS.primary }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {expandedRegion === region.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-sm text-gray-600 mb-2">
                          {region.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {region.areas.map((area, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs rounded"
                              style={{
                                backgroundColor: `rgba(88, 200, 227, 0.1)`,
                                color: BRAND_COLORS.primary,
                              }}
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white rounded-md shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `rgba(88, 200, 227, 0.1)` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: BRAND_COLORS.primary }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Head Office and Primary Repairing Hub in Kolkata
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Service team of over 50 personnel throughout West Bengal
                      to provide prompt and reliable support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Strengths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {strengths.map((strength) => (
            <motion.div
              key={strength.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white border border-gray-100 rounded-lg p-6 
                transform transition-all duration-300 
                hover:shadow-lg group
                relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(strength.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Subtle background accent */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundColor: BRAND_COLORS.primary,
                  clipPath: "circle(70% at 100% 0)",
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 mb-4 rounded-full 
                  flex items-center justify-center
                  transition-transform duration-300
                  group-hover:scale-110"
                style={{
                  backgroundColor: `rgba(88, 200, 227, 0.1)`,
                  color: BRAND_COLORS.primary,
                }}
              >
                {strength.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {strength.title}
                </h3>
                <p className="text-gray-600 text-sm">{strength.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center"
        >
          {[
            {
              number: "20+",
              label: "Years of Experience",
            },
            {
              number: "24/7",
              label: "Customer Support",
            },
            {
              number: "50+",
              label: "Service Personnel",
            },
            {
              number: "Fast",
              label: "Response Time",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              transition={{ duration: 0.2 }}
              className="rounded-lg p-6 border transform transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: `rgba(88, 200, 227, 0.05)`,
                borderColor: `rgba(88, 200, 227, 0.1)`,
              }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: BRAND_COLORS.primary }}
              >
                {stat.number}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to{" "}
            <span style={{ color: BRAND_COLORS.primary }}>Transform</span> Your
            Business?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            With 20+ years of experience serving customers across Eastern India,
            we're committed to delivering exceptional solutions tailored to your
            needs.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-white font-semibold rounded-lg 
                shadow-md hover:shadow-lg 
                transition-all duration-300
                flex items-center justify-center
                mx-auto
                group"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Contact Our Experts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSmartline;
