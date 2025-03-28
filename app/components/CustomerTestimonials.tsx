// app/components/CustomerTestimonials.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red (if needed)
};

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  sector: string;
  companyLogo?: string;
}

const CustomerTestimonials = () => {
  const [activeSector, setActiveSector] = useState<string>("all");

  const testimonials: Testimonial[] = [
    {
      id: "testimony1",
      quote:
        "SMARTLiNE has been instrumental in our digital banking infrastructure upgrade. Their UPS solutions ensure our critical systems remain operational 24/7, significantly reducing downtime incidents.",
      author: "Rajiv Sharma",
      position: "IT Infrastructure Head",
      company: "SBI",
      sector: "Banking",
      companyLogo: "/testimonials/sbi.jpg",
    },
    {
      id: "testimony2",
      quote:
        "After implementing SMARTLiNE's power management solutions, we've seen a 35% reduction in energy costs across our manufacturing facilities. Their team's technical expertise and prompt service are exceptional.",
      author: "Anand Maheshwari",
      position: "Plant Operations Director",
      company: "Ultratech Cement",
      sector: "Industrial",
      companyLogo: "/testimonials/ultratech.jpg",
    },
    {
      id: "testimony3",
      quote:
        "The battery health monitoring system from SMARTLiNE has transformed how we manage our critical power infrastructure. Real-time alerts and predictive analytics have helped us prevent several potential outages.",
      author: "Dr. Vineet Arora",
      position: "Technical Director",
      company: "Apollo Hospital",
      sector: "Healthcare",
      companyLogo: "/testimonials/apollo.jpg",
    },
    {
      id: "testimony4",
      quote:
        "We've partnered with SMARTLiNE for over a decade, and their consistent quality in UPS maintenance has kept our telecommunications infrastructure running smoothly even in challenging conditions.",
      author: "Priya Venkatesh",
      position: "Network Operations Manager",
      company: "Airtel",
      sector: "Telecom",
      companyLogo: "/testimonials/airtel.jpg",
    },
    {
      id: "testimony5",
      quote:
        "SMARTLiNE's innovative EV charging solutions have been a perfect fit for our sustainability initiatives. The seamless integration with our existing systems has made the transition remarkably smooth.",
      author: "Amit Sinha",
      position: "Chief Sustainability Officer",
      company: "Indian Oil",
      sector: "Public Sector",
      companyLogo: "/testimonials/indianoil.jpg",
    },
    {
      id: "testimony6",
      quote:
        "As we expand our retail presence, SMARTLiNE has been a reliable partner for all our power backup needs. Their customized solutions for variable power conditions have been invaluable in regions with unstable power supply.",
      author: "Rahul Kapoor",
      position: "Operations Director",
      company: "Future Group",
      sector: "Retail",
      companyLogo: "/testimonials/futuregroup.jpg",
    },
    {
      id: "testimony7",
      quote:
        "The solar power solutions implemented by SMARTLiNE have helped us reduce our carbon footprint while ensuring reliable power for our research facilities. Their holistic approach to power management stands out.",
      author: "Dr. Sameer Gupta",
      position: "Dean of Infrastructure",
      company: "Jadavpur University",
      sector: "Education",
      companyLogo: "/testimonials/jadavpur.jpg",
    },
    {
      id: "testimony8",
      quote:
        "SMARTLiNE's proactive approach to maintenance and their 24/7 support have been crucial for our operations. Their team's quick response during critical situations has saved us from significant downtime.",
      author: "Deepak Verma",
      position: "IT Manager",
      company: "Airport Authority of India",
      sector: "Government",
      companyLogo: "/testimonials/aai.jpg",
    },
  ];

  // Sectors for filtering
  const sectors = [
    "all",
    "Banking",
    "Industrial",
    "Healthcare",
    "Telecom",
    "Public Sector",
    "Retail",
    "Education",
    "Government",
  ];

  // Filter testimonials based on active sector
  const filteredTestimonials =
    activeSector === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.sector === activeSector
        );

  // Logo placeholder for missing images
  const LogoPlaceholder = ({ company }: { company: string }) => (
    <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200">
      <span className="text-sm font-medium text-gray-500">
        {company.slice(0, 2)}
      </span>
    </div>
  );

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear what our valued customers across Eastern India have to say
            about SMARTLiNE's solutions and services
          </p>
        </motion.div>

        {/* Sector filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12 gap-2"
        >
          {sectors.map((sector) => (
            <motion.button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeSector === sector
                  ? "text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeSector === sector ? BRAND_COLORS.primary : "",
                boxShadow:
                  activeSector === sector
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    : "none",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {sector === "all" ? "All Sectors" : sector}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="relative mb-8">
                  <svg
                    className="absolute top-0 left-0 w-10 h-10 opacity-10 transform -translate-x-6 -translate-y-6"
                    fill="currentColor"
                    style={{ color: BRAND_COLORS.primary }}
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-gray-600 italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {testimonial.companyLogo ? (
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 flex items-center justify-center">
                        <img
                          src={testimonial.companyLogo}
                          alt={`${testimonial.company} logo`}
                          className="h-full w-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            document.getElementById(
                              `placeholder-${testimonial.id}`
                            )!.style.display = "flex";
                          }}
                        />
                        <div
                          id={`placeholder-${testimonial.id}`}
                          className="h-full w-full items-center justify-center hidden"
                        >
                          <LogoPlaceholder company={testimonial.company} />
                        </div>
                      </div>
                    ) : (
                      <LogoPlaceholder company={testimonial.company} />
                    )}
                    <div className="ml-3">
                      <div className="text-base font-semibold text-gray-800">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.position}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: BRAND_COLORS.primary }}
                      >
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {testimonial.sector}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-6">
            Join our growing list of satisfied customers
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            Contact Us Today
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
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
