// app/components/ServiceApproachCTA.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

const ServiceApproachCTA = () => {
  const router = useRouter();

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

  return (
    <div className="mt-24 container mx-auto px-4 lg:px-8 mb-10">
      {/* Service Approach Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - text content */}
            <div className="p-8 lg:p-12 flex flex-col">
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
                brings decades of experience to every project, ensuring reliable
                and efficient solutions.
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
          Contact us today to discuss your specific needs and how SMARTLiNE can
          tailor solutions to help you meet your business goals.
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
  );
};

export default ServiceApproachCTA;
