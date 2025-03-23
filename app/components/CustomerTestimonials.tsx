// app/components/CustomerTestimonials.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
  const [activeSector, setActiveSector] = useState<string>('all');
  
  const testimonials: Testimonial[] = [
    {
      id: 'testimony1',
      quote: "SMARTLiNE has been instrumental in our digital banking infrastructure upgrade. Their UPS solutions ensure our critical systems remain operational 24/7, significantly reducing downtime incidents.",
      author: "Rajiv Sharma",
      position: "IT Infrastructure Head",
      company: "SBI",
      sector: "Banking",
      companyLogo: "/testimonials/sbi.jpg",
    },
    {
      id: 'testimony2',
      quote: "After implementing SMARTLiNE's power management solutions, we've seen a 35% reduction in energy costs across our manufacturing facilities. Their team's technical expertise and prompt service are exceptional.",
      author: "Anand Maheshwari",
      position: "Plant Operations Director",
      company: "Ultratech Cement",
      sector: "Industrial",
      companyLogo: "/testimonials/ultratech.jpg",
    },
    {
      id: 'testimony3',
      quote: "The battery health monitoring system from SMARTLiNE has transformed how we manage our critical power infrastructure. Real-time alerts and predictive analytics have helped us prevent several potential outages.",
      author: "Dr. Vineet Arora",
      position: "Technical Director",
      company: "Apollo Hospital",
      sector: "Healthcare",
      companyLogo: "/testimonials/apollo.jpg",
    },
    {
      id: 'testimony4',
      quote: "We've partnered with SMARTLiNE for over a decade, and their consistent quality in UPS maintenance has kept our telecommunications infrastructure running smoothly even in challenging conditions.",
      author: "Priya Venkatesh",
      position: "Network Operations Manager",
      company: "Airtel",
      sector: "Telecom",
      companyLogo: "/testimonials/airtel.jpg",
    },
    {
      id: 'testimony5',
      quote: "SMARTLiNE's innovative EV charging solutions have been a perfect fit for our sustainability initiatives. The seamless integration with our existing systems has made the transition remarkably smooth.",
      author: "Amit Sinha",
      position: "Chief Sustainability Officer",
      company: "Indian Oil",
      sector: "Public Sector",
      companyLogo: "/testimonials/indianoil.jpg",
    },
    {
      id: 'testimony6',
      quote: "As we expand our retail presence, SMARTLiNE has been a reliable partner for all our power backup needs. Their customized solutions for variable power conditions have been invaluable in regions with unstable power supply.",
      author: "Rahul Kapoor",
      position: "Operations Director",
      company: "Future Group",
      sector: "Retail",
      companyLogo: "/testimonials/futuregroup.jpg",
    },
    {
      id: 'testimony7',
      quote: "The solar power solutions implemented by SMARTLiNE have helped us reduce our carbon footprint while ensuring reliable power for our research facilities. Their holistic approach to power management stands out.",
      author: "Dr. Sameer Gupta",
      position: "Dean of Infrastructure",
      company: "Jadavpur University",
      sector: "Education",
      companyLogo: "/testimonials/jadavpur.jpg",
    },
    {
      id: 'testimony8',
      quote: "SMARTLiNE's proactive approach to maintenance and their 24/7 support have been crucial for our operations. Their team's quick response during critical situations has saved us from significant downtime.",
      author: "Deepak Verma",
      position: "IT Manager",
      company: "Airport Authority of India",
      sector: "Government",
      companyLogo: "/testimonials/aai.jpg",
    }
  ];

  // Sectors for filtering
  const sectors = ['all', 'Banking', 'Industrial', 'Healthcare', 'Telecom', 'Public Sector', 'Retail', 'Education', 'Government'];
  
  // Filter testimonials based on active sector
  const filteredTestimonials = activeSector === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.sector === activeSector);

  // Logo placeholder for missing images
  const LogoPlaceholder = ({ company }: { company: string }) => (
    <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200">
      <span className="text-sm font-medium text-gray-500">{company.slice(0, 2)}  </span>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear what our valued customers across Eastern India have to say about SMARTLiNE's solutions and services
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSector === sector
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sector === 'all' ? 'All Sectors' : sector}
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
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  {testimonial.companyLogo ? (
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={testimonial.companyLogo}
                        alt={`${testimonial.company} logo`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          document.getElementById(`placeholder-${testimonial.id}`)!.style.display = 'flex';
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
                  <div className="ml-4">
                    <div className="text-lg font-bold text-gray-800">{testimonial.company}</div>
                    <div className="text-sm text-gray-500">{testimonial.sector} Sector</div>
                  </div>
                </div>
                
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-base font-medium text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
       
        
      
      </div>
    </section>
  );
};

export default CustomerTestimonials;