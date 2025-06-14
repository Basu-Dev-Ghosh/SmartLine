// app/components/ServicesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Battery,
  BarChart3,
  Settings,
  Car,
  Shield,
  Cable,
  Sun,
} from "lucide-react";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Exact service structure as specified
  const services: Service[] = [
    {
      id: "ups-service",
      icon: "Zap",
      title: "UPS & Battery Service",
      description:
        "End to End UPS and battery maintenance and repair services.",
      benefits: [
        "1 KVA to 100 KVA UPS Support",
        "PM Scheduling to Minimise Downtime",
        "Battery Health Checkup for proper battery backup time",
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
      icon: "BarChart3",
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
      icon: "Battery",
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
      icon: "Settings",
      title: "Customized Solutions",
      description:
        "Tailored power solutions designed for your specific business requirements and environment.",
      benefits: ["Needs assessment", "Custom design", "Turnkey implementation"],
    },
    {
      id: "ev-charger",
      icon: "Car",
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
      icon: "Shield",
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
      icon: "Cable",
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
      icon: "Sun",
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

  // Function to get the icon component
  const getIconComponent = (iconName: string) => {
    const icons = {
      Zap,
      Battery,
      BarChart3,
      Settings,
      Car,
      Shield,
      Cable,
      Sun,
    };
    return icons[iconName as keyof typeof icons] || Zap;
  };
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
                    {(() => {
                      const IconComponent = getIconComponent(service.icon);
                      return (
                        <IconComponent
                          className="h-6 w-6"
                          style={{ color: BRAND_COLORS.primary }}
                        />
                      );
                    })()}
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
      </div>
    </section>
  );
};

export default ServicesSection;
