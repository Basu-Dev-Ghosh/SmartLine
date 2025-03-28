// app/components/ProductsShowcase.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Brand colors
const BRAND_COLORS = {
  primary: "#58c8e3", // smartline blue
  secondary: "#dc2626", // smartline red
};

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

interface SubCategory {
  id: string;
  name: string;
  products: Product[];
}

interface ProductCategory {
  id: string;
  name: string;
  subCategories?: SubCategory[];
  products?: Product[];
}

const ProductsShowcase = () => {
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ups");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Use useEffect to indicate we're client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Exact product structure as specified
  const productCategories: ProductCategory[] = [
    {
      id: "ups",
      name: "Online UPS",
      products: [
        {
          id: "online-ups",
          name: "Online UPS",
          description:
            "Reliable uninterruptible power supply solutions for critical applications",
          image: "/products/ups.jpg",
          features: [
            "Pure Sine Wave Output",
            "Double Conversion Technology",
            "Advanced Battery Management",
            "Network Management Capability",
          ],
        },
      ],
    },
    {
      id: "harmonic",
      name: "Harmonic Filter",
      products: [
        {
          id: "harmonic-filter",
          name: "Harmonic Filter",
          description:
            "Reduce harmonics and improve power quality in electrical systems",
          image: "/products/harmonic-filter.jpg",
          features: [
            "Real-time Harmonic Compensation",
            "Power Factor Correction",
            "Load Balancing",
            "Compact Design",
          ],
        },
      ],
    },
    {
      id: "batteries",
      name: "Batteries",
      subCategories: [
        {
          id: "smf-battery",
          name: "SMF Battery",
          products: [
            {
              id: "smf-battery-1",
              name: "SMF Battery",
              description:
                "Sealed Maintenance Free batteries for reliable backup power",
              image: "/products/smf-battery.jpg",
              features: [
                "Maintenance Free",
                "Long Service Life",
                "High Energy Density",
                "Leak-proof Design",
              ],
            },
          ],
        },
        {
          id: "dg-battery",
          name: "DG Battery",
          products: [
            {
              id: "dg-battery-1",
              name: "DG Battery",
              description: "High performance batteries for diesel generators",
              image: "/products/dg-battery.jpg",
              features: [
                "High Cranking Power",
                "Vibration Resistant",
                "Quick Charging",
                "Extreme Temperature Performance",
              ],
            },
          ],
        },
        {
          id: "inverter-battery",
          name: "Inverter Battery",
          products: [
            {
              id: "inverter-battery-1",
              name: "Inverter Battery",
              description:
                "Reliable batteries for home and office inverter systems",
              image: "/products/inverter-battery.jpg",
              features: [
                "Deep Cycle Technology",
                "Low Maintenance",
                "Longer Backup Time",
                "Overcharge Protection",
              ],
            },
          ],
        },
        {
          id: "industrial-battery",
          name: "2V Industrial Battery",
          products: [
            {
              id: "industrial-battery-1",
              name: "2V Industrial Battery",
              description: "Heavy-duty 2V cells for industrial applications",
              image: "/products/industrial-battery.jpg",
              features: [
                "Long Service Life",
                "High Current Capability",
                "Low Internal Resistance",
                "Excellent Cycling Performance",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "charger",
      name: "Industrial Battery Charger",
      products: [
        {
          id: "battery-charger",
          name: "Industrial Battery Charger",
          description: "Advanced charging solutions for industrial batteries",
          image: "/products/charger.jpg",
          features: [
            "Smart Charging Algorithm",
            "Multiple Battery Support",
            "Temperature Compensation",
            "Overcharge Protection",
          ],
        },
      ],
    },
    {
      id: "solar",
      name: "Solar Products",
      subCategories: [
        {
          id: "solar-panel",
          name: "Solar Panel",
          products: [
            {
              id: "solar-panel-1",
              name: "Solar Panel",
              description: "High-efficiency solar panels for energy generation",
              image: "/products/solar-panel.jpg",
              features: [
                "High Conversion Efficiency",
                "Weather Resistant",
                "Long Lifespan",
                "Low Light Performance",
              ],
            },
          ],
        },
        {
          id: "solar-battery",
          name: "Solar Battery",
          products: [
            {
              id: "solar-battery-1",
              name: "Solar Battery",
              description: "Energy storage solutions for solar power systems",
              image: "/products/solar-battery.jpg",
              features: [
                "Deep Cycle Technology",
                "High Charge Acceptance",
                "Low Self-Discharge",
                "Long Cycle Life",
              ],
            },
          ],
        },
        {
          id: "solar-inverter",
          name: "Solar Inverter",
          products: [
            {
              id: "solar-inverter-1",
              name: "Solar Inverter",
              description:
                "Convert solar DC power to AC for use in homes and businesses",
              image: "/products/solar-inverter.jpg",
              features: [
                "High Efficiency",
                "MPPT Technology",
                "Grid-Tie Capability",
                "Anti-Islanding Protection",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ats",
      name: "Automatic Transfer Switch (ATS)",
      products: [
        {
          id: "ats-1",
          name: "Automatic Transfer Switch",
          description: "Seamlessly switch between power sources",
          image: "/products/ats.jpg",
          features: [
            "Fast Transfer Time",
            "Reliable Operation",
            "Programmable Time Delays",
            "Status Monitoring",
          ],
        },
      ],
    },
    {
      id: "electrical",
      name: "Electrical Solutions",
      subCategories: [
        {
          id: "isolation-transformer",
          name: "Isolation Transformer",
          products: [
            {
              id: "isolation-transformer-1",
              name: "Isolation Transformer",
              description:
                "Provide galvanic isolation between electrical circuits",
              image: "/products/isolation-transformer.jpg",
              features: [
                "Noise Filtering",
                "Galvanic Isolation",
                "Surge Protection",
                "Common Mode Rejection",
              ],
            },
          ],
        },
        {
          id: "servo-stabilizer",
          name: "Servo Voltage Stabilizer",
          products: [
            {
              id: "servo-stabilizer-1",
              name: "Servo Voltage Stabilizer",
              description: "Maintain stable voltage for sensitive equipment",
              image: "/products/servo.jpg",
              features: [
                "Fast Response Time",
                "High Accuracy",
                "Wide Input Range",
                "Digital Control",
              ],
            },
          ],
        },
        {
          id: "control-panel",
          name: "Electrical Control Panel",
          products: [
            {
              id: "control-panel-1",
              name: "Electrical Control Panel",
              description: "Custom control panels for industrial applications",
              image: "/products/control-panel.jpg",
              features: [
                "Custom Design",
                "Industry Standards Compliant",
                "Remote Monitoring",
                "Safety Features",
              ],
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    // When category changes, reset subcategory if needed
    const category = productCategories.find((cat) => cat.id === activeCategory);
    if (category) {
      if (!category.subCategories) {
        setActiveSubCategory(null);
      } else if (
        !activeSubCategory ||
        !category.subCategories.find((sub) => sub.id === activeSubCategory)
      ) {
        setActiveSubCategory(category.subCategories[0].id);
      }
    }
  }, [activeCategory]);

  // Get current products to display
  const getCurrentProducts = (): Product[] => {
    const category = productCategories.find((cat) => cat.id === activeCategory);
    if (!category) return [];

    if (category.products) {
      return category.products;
    }

    if (category.subCategories && activeSubCategory) {
      const subCategory = category.subCategories.find(
        (sub) => sub.id === activeSubCategory
      );
      if (subCategory) {
        return subCategory.products;
      }
    }

    return [];
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  // Handle image error
  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  // Get product background color for fallback
  const getProductBgColor = (index: number) => {
    const colors = [
      "from-blue-100 to-blue-200",
      "from-teal-100 to-teal-200",
      "from-cyan-100 to-cyan-200",
      "from-sky-100 to-sky-200",
    ];
    return colors[index % colors.length];
  };

  // Only render the animated version when on client-side
  if (!isClient) {
    // Server-side or initial render - use a simple non-animated version
    return (
      <section
        id="products"
        className="py-16 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products & Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of power and electrical solutions to meet your
              business needs
            </p>
          </div>

          {/* Static loading state */}
          <div className="flex justify-center">
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Client-side render with full animations
  return (
    <section id="products" className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: `rgba(88, 200, 227, 0.2)` }}
      ></div>
      <div
        className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: `rgba(88, 200, 227, 0.1)` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products & Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of power and electrical solutions to meet your
            business needs
          </p>
        </motion.div>

        {/* Main Category Tabs - First Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-6 gap-2"
        >
          {productCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-5 py-2 rounded-md text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category.id
                    ? BRAND_COLORS.primary
                    : "#f3f4f6",
                color: activeCategory === category.id ? "white" : "#4b5563",
                boxShadow:
                  activeCategory === category.id
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Sub Category Tabs - Second Level (if available) */}
        {(() => {
          const currentCategory = productCategories.find(
            (cat) => cat.id === activeCategory
          );
          if (
            currentCategory?.subCategories &&
            currentCategory.subCategories.length > 0
          ) {
            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center mb-10 gap-2 bg-gray-50 py-3 px-4 rounded-lg"
              >
                {currentCategory.subCategories.map((subCategory) => (
                  <motion.button
                    key={subCategory.id}
                    onClick={() => setActiveSubCategory(subCategory.id)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 border ${
                      activeSubCategory === subCategory.id
                        ? "border-transparent shadow-sm font-medium"
                        : "border-gray-200 hover:border-gray-300 font-normal"
                    }`}
                    style={{
                      backgroundColor:
                        activeSubCategory === subCategory.id
                          ? "white"
                          : "transparent",
                      color:
                        activeSubCategory === subCategory.id
                          ? BRAND_COLORS.primary
                          : "#4b5563",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {subCategory.name}
                  </motion.button>
                ))}
              </motion.div>
            );
          }
          return null;
        })()}

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {getCurrentProducts().map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 bg-gray-100">
                {/* Product Image or Placeholder */}
                <div className="w-full h-full">
                  <div className="relative w-full h-full">
                    {!imageErrors[product.id] ? (
                      <>
                        <div
                          className="absolute inset-0 bg-center bg-cover rounded-t-lg"
                          style={{ backgroundImage: `url(${product.image})` }}
                        ></div>
                        {/* Hidden image to properly trigger error handler */}
                        <img
                          src={product.image}
                          alt=""
                          className="opacity-0 absolute w-px h-px"
                          onError={() => handleImageError(product.id)}
                        />
                      </>
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${getProductBgColor(
                          index
                        )} rounded-t-lg flex items-center justify-center`}
                      >
                        <div className="text-center px-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-gray-600 font-medium">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Overlay that appears on hover */}
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="text-white text-sm space-y-2">
                        {product.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: hoveredProduct === product.id ? 1 : 0,
                              x: hoveredProduct === product.id ? 0 : -10,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: 0.1 + index * 0.1,
                            }}
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              style={{ color: BRAND_COLORS.primary }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center font-medium"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-1"
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            Request Quotation
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

export default ProductsShowcase;
