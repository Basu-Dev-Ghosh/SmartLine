// app/components/AboutUsSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Users,
  Award,
  Zap,
  BarChart3,
  Sun,
  Battery,
  Settings,
} from "lucide-react";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

const AboutUsSection = () => {
  const services = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "UPS Procurement & Repairing Services",
      description:
        "Sales, installation, and expert-level repair of online and offline UPS systems across a range of capacities and brands.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Power Audit Services",
      description:
        "Detailed assessment and optimization of power consumption for industrial and commercial clients.",
    },
    {
      icon: <Sun className="w-5 h-5" />,
      title: "Solar Power Solutions",
      description:
        "Design and implementation of solar energy systems for sustainable and cost-effective power generation.",
    },
    {
      icon: <Battery className="w-5 h-5" />,
      title: "VRLA SMF Battery Sales",
      description:
        "Supply of high-quality Valve Regulated Lead Acid (Sealed Maintenance-Free) batteries for UPS and backup systems.",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Automatic Transfer Switch (ATS)",
      description:
        "Installation and servicing of ATS units to ensure seamless switching between power sources during outages.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Servo Controlled Voltage Stabilizers",
      description:
        "Supply and servicing of stabilizers for sensitive equipment and voltage fluctuation protection.",
    },
  ];

  const milestones = [
    {
      year: "1998",
      title: "Company Founded",
      description:
        "Started as a computer hardware and IT support company by Mr. Ajoy Kumar Saha",
    },
    {
      year: "2008",
      title: "Private Limited Company",
      description:
        "Became a private limited company with Mr. Ajoy Kumar Saha and Mrs. Marnali Saha as Directors",
    },
    {
      year: "2023",
      title: "25+ Years of Excellence",
      description:
        "Continued growth and evolution into a specialized power backup and energy solutions provider",
    },
  ];

  return (
    <section id="about" className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full opacity-10"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      ></div>
      <div
        className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full opacity-5"
        style={{ backgroundColor: BRAND_COLORS.secondary }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Smartline E Commerce Pvt. Ltd.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Over 25 years of excellence in power backup and energy solutions
          </p>
        </motion.div>

        {/* Company History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Company story */}
              <div>
                <div className="flex items-center mb-6">
                  <Calendar
                    className="w-8 h-8 mr-3"
                    style={{ color: BRAND_COLORS.primary }}
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Journey
                  </h3>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in <strong>1998</strong> by Mr. Ajoy Kumar Saha, an
                    Electronics and Telecommunications graduate from Durgapur
                    Regional Engineering College (now NIT Durgapur), Smartline
                    Pvt. Ltd. has grown into a specialized provider of power
                    backup and energy solutions.
                  </p>
                  <p>
                    What began as a computer hardware and IT support company
                    has, over the last 25+ years, evolved to meet the growing
                    demand for reliable power systems in both commercial and
                    industrial sectors.
                  </p>
                  <p>
                    In <strong>2008</strong>, Smartline became a private limited
                    company, with Mr. Ajoy Kumar Saha and Mrs. Marnali Saha as
                    Directors. Their combined leadership has shaped the
                    company's strategic direction and helped build a reputation
                    for technical excellence and dependable service.
                  </p>
                </div>
              </div>

              {/* Right side - Timeline */}
              <div>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4"
                        style={{ backgroundColor: BRAND_COLORS.primary }}
                      >
                        {milestone.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Directors Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users
                className="w-8 h-8 mr-3"
                style={{ color: BRAND_COLORS.primary }}
              />
              <h3 className="text-2xl font-bold text-gray-900">
                Our Leadership
              </h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Together, they have been the driving force behind the company's
              growth, bringing dedication, vision, and leadership that have
              helped Smartline evolve into a trusted name in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Director 1 - Mr. Ajoy Kumar Saha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/ajoy_saha.jpeg"
                  alt="Mr. Ajoy Kumar Saha - Founder & Director"
                  width={400}
                  height={300}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Mr. Ajoy Kumar Saha
                </h4>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  Founder & Director
                </p>
                <p className="text-gray-600 text-sm">
                  Electronics and Telecommunications graduate from Durgapur
                  Regional Engineering College (now NIT Durgapur). Founded the
                  company in 1998 and has been leading its strategic growth for
                  over 25 years.
                </p>
              </div>
            </motion.div>

            {/* Director 2 - Mrs. Marnali Saha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/marnali_saha.jpeg"
                  alt="Mrs. Marnali Saha - Director"
                  width={400}
                  height={300}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Mrs. Marnali Saha
                </h4>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  Director
                </p>
                <p className="text-gray-600 text-sm">
                  Co-Director since 2008, playing a crucial role in shaping the
                  company's strategic direction and building a reputation for
                  technical excellence and dependable service.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Current Focus - Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award
                className="w-8 h-8 mr-3"
                style={{ color: BRAND_COLORS.primary }}
              />
              <h3 className="text-2xl font-bold text-gray-900">
                What We Do Today
              </h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Today, Smartline Pvt. Ltd. focuses exclusively on delivering
              end-to-end power backup and energy efficiency solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      backgroundColor: `rgba(88, 200, 227, 0.1)`,
                      color: BRAND_COLORS.primary,
                    }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 md:p-12"
            style={{
              background: `linear-gradient(135deg, rgba(88, 200, 227, 0.1) 0%, rgba(88, 200, 227, 0.05) 100%)`,
            }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With over <strong>25 years of experience</strong>, Smartline
              continues to provide reliable and comprehensive IT and power
              backup solutions, upholding its commitment to{" "}
              <strong>quality and customer satisfaction</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
