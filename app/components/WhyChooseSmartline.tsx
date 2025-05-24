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
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const toggleRegion = (regionId: string) => {
    if (expandedRegion === regionId) {
      setExpandedRegion(null);
    } else {
      setExpandedRegion(regionId);
    }
  };

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId);
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

  // Updated strengths based on client's "Why Us" document
  const strengths = [
    {
      id: "cost-optimization",
      title: "Cost Optimization",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2v20m5-5l-5 5-5-5m5-10a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
        </svg>
      ),
      description:
        "We focus on extending the life of your major equipment and avoiding unnecessary purchases through strategic cost optimization.",
    },
    {
      id: "customer-education",
      title: "Customer Education",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
        </svg>
      ),
      description:
        "We educate customers with technical knowledge to help them maintain their UPS and battery systems effectively.",
    },
    {
      id: "ethical-sales",
      title: "Ethical Sales Approach",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
      ),
      description:
        "We practice ethical sales by avoiding push selling, unlike competitors. We guide clients in making the right purchasing decisions.",
    },
    {
      id: "priority-service",
      title: "24/7 Priority Service",
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
        "Strong after-sales service available 24/7. Customers receive priority service with every purchase, unlike many OEMs.",
    },
    {
      id: "accurate-analysis",
      title: "Accurate Load Analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m6 0a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2z" />
        </svg>
      ),
      description:
        "We provide accurate load analysis and guide clients in making informed decisions for their power requirements.",
    },
    {
      id: "comprehensive-amc",
      title: "Comprehensive AMC Services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description:
        "Offering both Comprehensive and Non-Comprehensive AMCs for UPS and solar-related services with chargeable repair options.",
    },
  ];

  // Service prioritization quadrants
  const serviceQuadrants = [
    {
      id: "comprehensive-amc",
      title: "Comprehensive AMCs",
      position: "top-left",
      color: "#4A90E2",
      description:
        "Extensive maintenance contracts with limited customer interaction",
      icon: "🔧",
    },
    {
      id: "priority-service",
      title: "24/7 Priority Service",
      position: "top-right",
      color: "#7ED321",
      description:
        "Immediate customer satisfaction with round-the-clock support",
      icon: "🕐",
    },
    {
      id: "basic-repairs",
      title: "Basic UPS Repairs",
      position: "bottom-left",
      color: "#F5A623",
      description: "Standard repairs without prioritizing customer needs",
      icon: "⚙️",
    },
    {
      id: "customer-education",
      title: "Customer Education",
      position: "bottom-right",
      color: "#8CC152",
      description:
        "Empowers customers with knowledge but lacks immediate service focus",
      icon: "📚",
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
      className="relative py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Why Choose{" "}
            <span style={{ color: BRAND_COLORS.secondary }}>SMART</span>
            <span style={{ color: BRAND_COLORS.primary }}>LiNE</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Delivering innovative UPS and solar solutions with 20+ years of
            expertise, ethical business practices, and customer-first approach
          </motion.p>
        </motion.div>

        {/* Service Prioritization Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Service Prioritization and Customer Focus
              </h3>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                Our strategic approach balances comprehensive service offerings
                with immediate customer satisfaction
              </p>

              <div className="relative">
                {/* Quadrant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Y-axis label */}
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-600 hidden md:block">
                    Service Priority
                  </div>

                  {/* X-axis label */}
                  <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600 hidden md:block">
                    Customer Focus
                  </div>

                  {serviceQuadrants.map((quadrant) => (
                    <motion.div
                      key={quadrant.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="relative p-6 rounded-xl border-2 transition-all duration-300"
                      style={{
                        backgroundColor: `${quadrant.color}15`,
                        borderColor: `${quadrant.color}40`,
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{quadrant.icon}</span>
                        <h4
                          className="text-lg font-bold"
                          style={{ color: quadrant.color }}
                        >
                          {quadrant.title}
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {quadrant.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Strengths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core{" "}
            <span style={{ color: BRAND_COLORS.primary }}>Strengths</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengths.map((strength) => (
              <motion.div
                key={strength.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white border border-gray-100 rounded-2xl p-8 
                  transform transition-all duration-300 
                  hover:shadow-xl group
                  relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(strength.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background accent */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundColor: BRAND_COLORS.primary,
                    clipPath: "circle(70% at 100% 0)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 mb-6 rounded-2xl 
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
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {strength.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Presence Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-3"
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
              <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                Comprehensive coverage across West Bengal & Sikkim with a 50+
                personnel service team ensuring prompt and reliable support
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region) => (
                  <motion.div
                    key={region.id}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    onMouseEnter={() => handleRegionHover(region.id)}
                    onMouseLeave={() => handleRegionHover(null)}
                  >
                    <div
                      className="p-6 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleRegion(region.id)}
                    >
                      <h4 className="font-bold text-gray-800">{region.name}</h4>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${
                          expandedRegion === region.id ||
                          hoveredRegion === region.id
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

                    {/* Show content on both hover and click */}
                    {(expandedRegion === region.id ||
                      hoveredRegion === region.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-sm text-gray-600 mb-3">
                          {region.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {region.areas.map((area, index) => (
                            <span
                              key={index}
                              className="inline-block px-3 py-1 text-xs rounded-full font-medium"
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
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              number: "20+",
              label: "Years Experience",
              sublabel: "Industry Expertise",
            },
            {
              number: "500+",
              label: "Clients Served",
              sublabel: "Across 12+ Sectors",
            },
            {
              number: "99.9%",
              label: "Uptime Guarantee",
              sublabel: "Reliable Solutions",
            },
            {
              number: "24/7",
              label: "Expert Support",
              sublabel: "Always Available",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center rounded-2xl p-8 border transform transition-all duration-300 hover:shadow-lg bg-white"
              style={{
                borderColor: `rgba(88, 200, 227, 0.2)`,
              }}
            >
              <h3
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: BRAND_COLORS.primary }}
              >
                {stat.number}
              </h3>
              <p className="text-gray-800 font-semibold">{stat.label}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-gray-50 to-white rounded-2xl p-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience{" "}
            <span style={{ color: BRAND_COLORS.primary }}>Excellence</span>?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join 500+ satisfied customers who trust SMARTLINE for their power
            solutions. Experience ethical business practices, technical
            expertise, and unmatched after-sales support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white font-bold rounded-xl 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300
                  flex items-center justify-center
                  group"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              >
                Get Priority Service
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
            <Link href="/faq">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 text-gray-700 font-semibold rounded-xl 
                  hover:bg-gray-50 transition-all duration-300
                  flex items-center justify-center"
                style={{ borderColor: BRAND_COLORS.primary }}
              >
                View FAQ
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSmartline;
