// app/components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Define brand colors
const BRAND_COLORS = {
  smartlineBlue: "#58c8e3",
  smartlineRed: "#dc2626",
};

interface DropdownProps {
  title: string;
  items: { label: string; sectionId?: string; href?: string }[];
  isScrolled: boolean;
  onItemClick: (sectionId?: string, href?: string) => void;
}

const Dropdown = ({ title, items, isScrolled, onItemClick }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative mt-1">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 text-gray-800 ${
            isHovered ? "text-[#58c8e3]" : ""
          }`}
          style={{ color: isHovered ? BRAND_COLORS.smartlineBlue : "#374151" }}
          onMouseEnter={() => {
            setIsOpen(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            onMouseLeave={() => setIsOpen(false)}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="dropdown-item-container"
              >
                <button
                  onClick={() => {
                    onItemClick(item.sectionId, item.href);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[rgba(88,200,227,0.1)] hover:text-[#58c8e3]"
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isHomePage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  const handleNavigation = (sectionId?: string, href?: string) => {
    if (href) {
      // Navigate to the specific page
      router.push(href);
      setIsOpen(false); // Close mobile menu
      return;
    }

    if (!sectionId) return;

    setIsOpen(false); // Close mobile menu if open

    if (isHomePage) {
      // If on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a small delay to allow the mobile menu to close first
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // If on another page, navigate to home with hash
      router.push(`/#${sectionId}`);
    }
  };

  const productDropdownItems = [
    { label: "All Products", sectionId: "products" },
    { label: "Online UPS", sectionId: "products" },
    { label: "Battery Solutions", sectionId: "products" },
    { label: "Solar Products", sectionId: "products" },
    { label: "EV Chargers", sectionId: "products" },
  ];

  const servicesDropdownItems = [
    { label: "All Services", sectionId: "services" },
    { label: "UPS & Battery Services", sectionId: "services" },
    { label: "Power Audit", sectionId: "services" },
    { label: "Solar Solutions", sectionId: "services" },
    { label: "AMC Services", sectionId: "services" },
  ];

  const navItems = [
    { label: "Customers", sectionId: "customers" },
    { label: "Partners", sectionId: "partners" },
    { label: "FAQ", sectionId: "faq" },
    { label: "Why Us", sectionId: "why-choose" },
    { label: "About Us", sectionId: "about" },
  ];

  // Skip rendering the navbar on admin pages
  if (isAdminPage) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance based on scroll
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (isHomePage) {
        // Update active section for highlighting
        const sections = [
          "hero",
          "products",
          "services",
          "customers",
          "partners",
          "valued-customers",
          "why-choose",
          "faq",
          "about",
        ];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Effect to handle URL hash on page load
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500); // Delay to ensure page is fully loaded
      }
    }
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-center px-4 md:px-6">
        <div className="max-w-6xl w-full flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button
              onClick={() => handleNavigation("hero")}
              className="flex items-center"
            >
              {/* Replace Logo component with Image component */}
              <Image
                src="/logo.png"
                alt="SMARTLiNE"
                width={180}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </button>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Dropdown
              title="Products"
              items={productDropdownItems}
              isScrolled={isScrolled}
              onItemClick={handleNavigation}
            />
            <Dropdown
              title="Services"
              items={servicesDropdownItems}
              isScrolled={isScrolled}
              onItemClick={handleNavigation}
            />

            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleNavigation(item.sectionId)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-[#58c8e3] ${
                    activeSection === item.sectionId && isHomePage
                      ? "text-[#58c8e3]"
                      : "text-gray-800"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.label}
                </button>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#58c8e3] ${
                  pathname === "/contact" ? "text-[#58c8e3]" : "text-gray-800"
                }`}
              >
                Contact
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact?tab=quote")}
              className="bg-[#58c8e3] hover:bg-[#3cb0cd] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md"
            >
              Get a Quote
            </motion.button>

            {/* Admin Link - Discreet link at the end of the navbar */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin"
                className="text-xs text-gray-400 hover:text-[#58c8e3] transition-colors duration-200"
                title="Admin Dashboard"
              >
                Admin
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {/* Products dropdown for mobile */}
                <div className="py-2 border-b border-gray-100">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-medium text-gray-800 mb-2"
                  >
                    Products
                  </motion.div>
                  <div className="space-y-2 pl-4">
                    {productDropdownItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.2 + index * 0.05,
                        }}
                      >
                        <button
                          onClick={() => handleNavigation(item.sectionId)}
                          className="block text-gray-600 hover:text-[#58c8e3] text-sm text-left"
                        >
                          {item.label}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Services dropdown for mobile */}
                <div className="py-2 border-b border-gray-100">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-medium text-gray-800 mb-2"
                  >
                    Services
                  </motion.div>
                  <div className="space-y-2 pl-4">
                    {servicesDropdownItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.3 + index * 0.05,
                        }}
                      >
                        <button
                          onClick={() => handleNavigation(item.sectionId)}
                          className="block text-gray-600 hover:text-[#58c8e3] text-sm text-left"
                        >
                          {item.label}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Other menu items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.sectionId)}
                      className={`block py-2 text-left w-full text-gray-800 hover:text-[#58c8e3] font-medium border-b border-gray-100 ${
                        activeSection === item.sectionId && isHomePage
                          ? "text-[#58c8e3]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}

                {/* Contact link for mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.7 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-left w-full text-gray-800 hover:text-[#58c8e3] font-medium border-b border-gray-100 ${
                      pathname === "/contact" ? "text-[#58c8e3]" : ""
                    }`}
                  >
                    Contact
                  </Link>
                </motion.div>

                {/* Get a quote button for mobile */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  onClick={() => {
                    router.push("/contact?tab=quote");
                    setIsOpen(false);
                  }}
                  className="w-full bg-[#58c8e3] hover:bg-[#3cb0cd] text-white px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 shadow-md mt-4"
                >
                  Get a Quote
                </motion.button>

                {/* Admin link for mobile - at the very bottom and discreet */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  className="mt-4 pt-4 border-t border-gray-100 text-center"
                >
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-400 hover:text-[#58c8e3] transition-colors duration-200"
                  >
                    Admin Access
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
