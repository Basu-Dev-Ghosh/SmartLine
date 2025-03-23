// app/components/ProductsShowcase.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductCategory {
  id: string;
  name: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

const ProductsShowcase = () => {
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState('power');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Use useEffect to indicate we're client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const productCategories: ProductCategory[] = [
    {
      id: 'power',
      name: 'Power Solutions',
      products: [
        {
          id: 'ups',
          name: 'Online UPS',
          description: 'Reliable power backup solutions for critical applications',
          image: '/products/ups.jpg',
          features: ['Pure Sine Wave Output', 'Double Conversion Technology', 'Advanced Battery Management']
        },
        {
          id: 'battery',
          name: 'SMF Battery',
          description: '2 Volt Industrial Battery solutions for long-term backup needs',
          image: '/products/battery.jpg',
          features: ['Maintenance Free', 'Long Service Life', 'High Energy Density']
        },
        {
          id: 'charger',
          name: 'Battery Charger',
          description: 'Advanced charging solutions for all battery types',
          image: '/products/charger.jpg',
          features: ['Smart Charging Algorithm', 'Multiple Battery Support', 'Temperature Compensation']
        }
      ]
    },
    {
      id: 'solar',
      name: 'Solar Solutions',
      products: [
        {
          id: 'solar-panel',
          name: 'Solar Panels',
          description: 'High-efficiency solar panels for sustainable energy generation',
          image: '/products/solar.jpg',
          features: ['High Conversion Efficiency', 'Weather Resistant', 'Long Lifespan']
        },
        {
          id: 'solar-battery',
          name: 'Solar Battery',
          description: 'Energy storage solutions for solar power systems',
          image: '/products/solar-battery.jpg',
          features: ['Deep Cycle Technology', 'High Charge Acceptance', 'Low Self-Discharge']
        },
        {
          id: 'solar-inverter',
          name: 'Solar Inverter',
          description: 'Convert solar DC power to AC for residential and commercial use',
          image: '/products/inverter.jpg',
          features: ['High Efficiency', 'MPPT Technology', 'Grid-Tie Capability']
        }
      ]
    },
    {
      id: 'electrical',
      name: 'Electrical Solutions',
      products: [
        {
          id: 'control-panel',
          name: 'Electrical Control Panel',
          description: 'Custom control panels for industrial automation',
          image: '/products/control-panel.jpg',
          features: ['Custom Design', 'Industry Standards Compliant', 'Remote Monitoring']
        },
        {
          id: 'servo',
          name: 'Servo Voltage Stabilizer',
          description: 'Protect equipment from voltage fluctuations',
          image: '/products/servo.jpg',
          features: ['Fast Response Time', 'High Accuracy', 'Wide Input Range']
        },
        {
          id: 'led',
          name: 'LED Solutions',
          description: 'Energy-efficient lighting solutions for various applications',
          image: '/products/led.jpg',
          features: ['Energy Saving', 'Long Life', 'Low Maintenance']
        }
      ]
    },
    {
      id: 'ev',
      name: 'EV Solutions',
      products: [
        {
          id: 'ev-charger',
          name: 'EV Charger',
          description: 'Modern charging infrastructure for electric vehicles',
          image: '/products/ev-charger.jpg',
          features: ['Fast Charging', 'Multiple Connector Options', 'Smart Control System']
        },
        {
          id: 'ev-battery',
          name: 'EV Battery Solutions',
          description: 'Battery solutions for electric vehicle applications',
          image: '/products/ev-battery.jpg',
          features: ['High Energy Density', 'Rapid Charging', 'Long Cycle Life']
        }
      ]
    }
  ];

  // Find the active category
  const currentCategory = productCategories.find(category => category.id === activeCategory) || productCategories[0];

  // Animations (ONLY used on client side)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Handle image error
  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  // Get product color based on category
  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'power': return 'bg-green-600';
      case 'solar': return 'bg-yellow-600';
      case 'electrical': return 'bg-blue-600';
      case 'ev': return 'bg-red-600';
      default: return 'bg-green-600';
    }
  };

  // Generate product background color for fallback
  const getProductBgColor = (index: number) => {
    const colors = [
      'from-green-100 to-green-200',
      'from-blue-100 to-blue-200',
      'from-yellow-100 to-yellow-200',
      'from-red-100 to-red-200',
      'from-purple-100 to-purple-200',
      'from-indigo-100 to-indigo-200'
    ];
    return colors[index % colors.length];
  };

  // Only render the animated version when on client-side
  if (!isClient) {
    // Server-side or initial render - use a simple non-animated version
    return (
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products & Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of power and electrical solutions to meet your business needs
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
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-green-50 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-50 rounded-full opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products & Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of power and electrical solutions to meet your business needs
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-10 gap-2"
        >
          {productCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `${getCategoryColor(category.id)} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentCategory.products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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
                      <div className={`absolute inset-0 bg-gradient-to-br ${getProductBgColor(index)} rounded-t-lg flex items-center justify-center`}>
                        <div className="text-center px-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-2 text-gray-600 font-medium">{product.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay that appears on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
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
                              x: hoveredProduct === product.id ? 0 : -10 
                            }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          >
                            <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center font-medium ${activeCategory === 'solar' ? 'text-yellow-600' : activeCategory === 'electrical' ? 'text-blue-600' : activeCategory === 'ev' ? 'text-red-600' : 'text-green-600'}`}
                >
                  Learn More
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.button>
              </div>
              
              {/* Animated corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute top-0 right-0 ${getCategoryColor(activeCategory)} text-white transform rotate-45 translate-y-[-50%] translate-x-[50%] w-24 text-center py-1 text-xs font-semibold`}>
                  New
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        
      </div>
    </section>
  );
};

export default ProductsShowcase;