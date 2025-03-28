// app/components/ServicesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

interface ServiceSubcategory {
  id: string;
  title: string;
  description: string;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  subcategories?: ServiceSubcategory[];
}

const ServicesSection = () => {
  // Use client-side detection to prevent hydration errors
  const [isClient, setIsClient] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(
    "ups-service"
  );
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToTestimonials = () => {
    // If on homepage, scroll to section
    const testimonialsSection = document.getElementById("testimonials");
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to homepage with testimonials anchor
      router.push("/#testimonials");
    }
  };

  // Exact service structure as specified
  const services: Service[] = [
    {
      id: "ups-service",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "UPS & Battery Service",
      description:
        "Complete range of UPS and battery maintenance and repair services.",
      benefits: [
        "Extended equipment lifespan",
        "Reduced downtime risk",
        "Improved system efficiency",
      ],
      subcategories: [
        {
          id: "ups-repair",
          title: "UPS Repairing",
          description:
            "Expert diagnosis and repair of UPS systems of all brands and capacities.",
        },
        {
          id: "ups-amc",
          title: "UPS AMC Service",
          description:
            "Annual Maintenance Contracts ensuring your UPS operates at peak performance year-round.",
        },
        {
          id: "preventive-maintenance",
          title: "Preventive Maintenance",
          description:
            "Scheduled maintenance to prevent failures and extend equipment life.",
        },
      ],
    },
    {
      id: "power-audit",
      icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      title: "Power Audit",
      description:
        "Detailed assessment of your power infrastructure to identify risks and optimization opportunities.",
      benefits: [
        "Energy efficiency analysis",
        "Risk assessment",
        "Cost reduction strategies",
      ],
    },
    {
      id: "battery-health",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      title: "Battery Health Monitoring",
      description:
        "Proactive monitoring of battery conditions to prevent failures and extend lifespan.",
      benefits: [
        "Real-time monitoring",
        "Predictive maintenance",
        "Extended battery life",
      ],
    },
    {
      id: "custom-solutions",
      icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
      title: "Customized Solutions",
      description:
        "Tailored power solutions designed for your specific business requirements and environment.",
      benefits: ["Needs assessment", "Custom design", "Turnkey implementation"],
    },
    {
      id: "ev-charger",
      icon: "M5 12a1 1 0 01-1-1V5a1 1 0 011-1h2a1 1 0 011 1v1h10a1 1 0 011 1v7a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H6a1 1 0 01-1-1z M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12",
      title: "EV Charger Services",
      description:
        "Installation, maintenance and repair services for electric vehicle charging stations.",
      benefits: [
        "Expert technical support",
        "Preventive maintenance",
        "Performance optimization",
      ],
    },
    {
      id: "amc-service",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "UPS AMC Services",
      description:
        "Annual Maintenance Contracts ensuring your power systems operate at peak performance year-round.",
      benefits: [
        "Scheduled maintenance",
        "Priority support",
        "Cost predictability",
      ],
    },
    {
      id: "electrical-wiring",
      icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
      title: "Electrical L.T. Wiring",
      description:
        "Professional electrical wiring and maintenance services for commercial and industrial facilities.",
      benefits: [
        "Safety compliance",
        "Efficient distribution",
        "Regular maintenance",
      ],
    },
    {
      id: "solar-solutions",
      icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
      title: "Customized Solar Solutions",
      description:
        "End-to-end solar power system installation and maintenance for sustainable energy generation.",
      benefits: [
        "Renewable energy",
        "Reduced electricity costs",
        "Long-term ROI",
      ],
    },
  ];

  // Toggle expanded service
  const toggleExpand = (serviceId: string) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  // Simple fade-in animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  // Server-side rendering or initial client render
  if (!isClient) {
    return (
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of power and electrical services to keep your
              business running smoothly
            </p>
          </div>
          <div className="flex justify-center">
            <p>Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  // Client-side render with animations
  return (
    <section
      id="services"
      className="py-16 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 rounded-full opacity-20"
        style={{ backgroundColor: `rgba(88, 200, 227, 0.2)` }}
      ></div>
      <div
        className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 rounded-full opacity-20"
        style={{ backgroundColor: `rgba(88, 200, 227, 0.1)` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SMARTLiNE offers a comprehensive range of power and electrical
            services to keep your business running smoothly and efficiently
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full ${
                expandedService === service.id ? "lg:col-span-3" : ""
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `rgba(88, 200, 227, 0.1)`,
                    }}
                    animate={{
                      scale: activeService === service.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: activeService === service.id ? Infinity : 0,
                      repeatType: "loop",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      style={{ color: BRAND_COLORS.primary }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={service.icon}
                      />
                    </svg>
                  </motion.div>

                  {service.subcategories && (
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          expandedService === service.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            expandedService === service.id
                              ? "M5 15l7-7 7 7"
                              : "M19 9l-7 7-7-7"
                          }
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Expanded subcategories */}
                {service.subcategories && expandedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 mb-6"
                  >
                    <h4 className="font-medium text-gray-800 mb-3 text-sm uppercase tracking-wider">
                      Our Services Include:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {service.subcategories.map((subcat, idx) => (
                        <div
                          key={subcat.id}
                          className="bg-gray-50 p-4 rounded-md"
                        >
                          <h5 className="font-medium text-gray-900 mb-1">
                            {subcat.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {subcat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="mt-auto">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <motion.svg
                          className="w-4 h-4 mt-1 mr-2"
                          style={{ color: BRAND_COLORS.primary }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ opacity: 1 }}
                          animate={{
                            opacity:
                              activeService === service.id ? [1, 0.5, 1] : 1,
                            x: activeService === service.id ? [0, 2, 0] : 0,
                          }}
                          transition={{
                            duration: 1,
                            delay: idx * 0.2,
                            repeat: activeService === service.id ? Infinity : 0,
                            repeatType: "loop",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </motion.svg>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-gray-100">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-gray-50 font-medium rounded hover:bg-gray-100 transition-colors duration-300 text-sm flex items-center justify-center"
                    style={{ color: BRAND_COLORS.primary }}
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - text content */}
              <div className="p-8 lg:p-12">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
                  style={{ backgroundColor: `rgba(88, 200, 227, 0.1)` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    style={{ color: BRAND_COLORS.primary }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Service Approach
                </h3>
                <p className="text-gray-600 mb-6">
                  At SMARTLiNE, we believe in a proactive, customer-centric
                  approach to service delivery. Our team of qualified engineers
                  brings decades of experience to every project, ensuring
                  reliable and efficient solutions.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Expertise",
                      description:
                        "Our team members have several years of expertise in providing customized solutions across various applications.",
                    },
                    {
                      title: "24x7 Availability",
                      description:
                        "We communicate with you round the clock, ensuring support whenever you need it - Always On Line.",
                    },
                    {
                      title: "Flexibility",
                      description:
                        "We custom-build solutions to your specific requirements and can adjust quickly to changes or additions.",
                    },
                    {
                      title: "Speed",
                      description:
                        "While keeping up with changing business needs and technology, we have a proven record of delivering solutions on time.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex">
                      <div className="flex-shrink-0">
                        <div
                          className="flex items-center justify-center h-6 w-6 rounded-full text-white"
                          style={{ backgroundColor: BRAND_COLORS.primary }}
                        >
                          {idx + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-6 py-3 text-white font-medium rounded-md shadow-md transition-colors duration-300 inline-flex items-center"
                    style={{
                      backgroundColor: BRAND_COLORS.primary,
                    }}
                  >
                    Contact Our Service Team
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </motion.button>
                </Link>
              </div>

              {/* Right side - Service stats */}
              <div
                className="p-8 lg:p-12 text-white"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              >
                <h3 className="text-2xl font-bold mb-8">
                  Why Customers Choose Our Services
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { number: "20+", label: "Years of Service Experience" },
                    { number: "500+", label: "Successful Service Projects" },
                    { number: "24/7", label: "Customer Support" },
                    { number: "100%", label: "Client Satisfaction Goal" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="text-center p-6 rounded-lg"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="text-3xl md:text-4xl font-bold mb-2"
                      >
                        {stat.number}
                      </motion.div>
                      <p className="text-white/80">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 border-t border-white/20 pt-8">
                  <h4 className="font-semibold mb-4">
                    Service Level Agreement Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Guaranteed response times",
                      "Preventive maintenance schedules",
                      "Priority emergency support",
                      "Regular system health reports",
                      "Dedicated service manager",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-white/70"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Custom Services?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We understand that every business has unique power requirements.
            Contact us today to discuss your specific needs and how SMARTLiNE
            can tailor solutions to help you meet your business goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact?tab=quote")}
              className="px-8 py-3 text-white font-medium rounded-md shadow-md transition-colors duration-300"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Request a Quote
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTestimonials}
              className="px-8 py-3 bg-white font-medium rounded-md shadow-md border transition-colors duration-300"
              style={{
                color: BRAND_COLORS.primary,
                borderColor: BRAND_COLORS.primary,
              }}
            >
              See Testimonials
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
