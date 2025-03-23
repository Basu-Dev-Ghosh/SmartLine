// app/components/MajorCustomers.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CustomerSector {
  id: string;
  name: string;
  customers: string[];
  color: string;
}

const MajorCustomers = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  
  const toggleSector = (sectorId: string) => {
    if (expandedSector === sectorId) {
      setExpandedSector(null);
    } else {
      setExpandedSector(sectorId);
    }
  };
  
  const sectors: CustomerSector[] = [
    {
      id: 'banking',
      name: 'Banking Sector',
      color: 'amber',
      customers: [
        'SBI', 'Axis Bank', 'IDBI Bank', 'Allahabad Bank', 
        'ICICI Bank', 'HDFC Bank', 'RBI', 'UCO Bank', 
        'Bank of India', 'Central Bank', 'UKBG', 'UBI', 'OBC'
      ]
    },
    {
      id: 'public',
      name: 'Public Sector',
      color: 'blue',
      customers: [
        'Sail', 'DPL', 'Indian Oil', 'BPCL', 
        'DVC', 'BHEL', 'NTPC', 'ONG'
      ]
    },
    {
      id: 'telecom',
      name: 'Telecom Sector',
      color: 'green',
      customers: [
        'Airtel', 'Vodafone', 'Simoco', 'BSNL', 'Aircel'
      ]
    },
    {
      id: 'retail',
      name: 'Retail Sector',
      color: 'red',
      customers: [
        'Future Group', 'Spencer', 'More', 'Shopper Stop', 
        'South City', 'Mobile Store', 'Shreeram Ozone', 
        'Tanishk', 'Pantaloons', 'Avani mall'
      ]
    },
    {
      id: 'education',
      name: 'Education Sector',
      color: 'orange',
      customers: [
        'ICFAI', 'ICA', 'Jadavpur University', 'CMERI', 
        'Rahbadh Engg College', 'Saha Institute', 
        'NIT Durgapur', 'NHSM', 'Techno India'
      ]
    },
    {
      id: 'government',
      name: 'Government Sector',
      color: 'rose',
      customers: [
        'Airport Authority of India', 'Department of Astronomy', 
        'National Horticultural Board', 'Eastern Railway', 
        'South Eastern Railway', 'Geological Survey of India', 
        'Webel Technologies', 'Dept of Customs', 'Samir', 'ERTL'
      ]
    },
    {
      id: 'courier',
      name: 'Courier Sector',
      color: 'purple',
      customers: [
        'AFL', 'Blue Dart', 'DTDC'
      ]
    },
    {
      id: 'it',
      name: 'IT Sector',
      color: 'cyan',
      customers: [
        'Rolta India', 'Globsyn', 'Sky Tech', 
        'First source', 'Huges', 'IXIA', 'On Process'
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Sector',
      color: 'pink',
      customers: [
        'Peerless Hospital', 'Woodard Hospital', 'Mison Hospital', 
        'Apollo Hospital', 'B.M Birla Hospital', 'West Bengal Health', 
        'CMRI Hospital', 'NRS Hospital', 'Chattaranjan Hospital', 
        'Barasat Hospital', 'Canning Hospital', 'Indian Institute of Lever'
      ]
    },
    {
      id: 'consultant',
      name: 'Consultants Sector',
      color: 'teal',
      customers: [
        'M.N Dusdur', 'Mecon', 'DCL / DCIPS', 'Descon Limited', 
        'Lalbmeyer International India', 'RITES Ltd', 
        'Nitson & Amitsu Pvt Ltd'
      ]
    },
    {
      id: 'si',
      name: 'System Integrator',
      color: 'gray',
      customers: [
        'CMS', 'Hewlett Packard', 'Sysnet Global', 
        'Accel IT Services', 'Bharat IT Services', 
        'Tech Elicon', 'PCS'
      ]
    },
    {
      id: 'industrial',
      name: 'Industrial Sector',
      color: 'indigo',
      customers: [
        'Ultratech Cement', 'Simplex', 'Ambuja Cement', 
        'Paharpur Cooling Tower', 'Hindustan Lever', 'L&T', 
        'Balmar Lawrie', 'Eveready', 'TATA Chemicals', 'Philips', 
        'Kesoram Rayon', 'ITC', 'BEML', 'Berjer Paints', 
        'Jenson Nicholson', 'Britannia Industries', 'Bieco Lawrie', 
        'Tata Tea', 'Godrej', 'Glaxo', 'Blue Star', 'Orissa Sponge Iron', 
        'Philips Carbon', 'Prax Air', 'Schneider Electric', 
        'Shyam Steel', 'Bhusan Steel', 'Ruchi Soya', 'Emami', 'Mitsubishi'
      ]
    },
    {
      id: 'ups',
      name: 'UPS OEM Sector',
      color: 'lime',
      customers: [
        'DB Power', 'Power One', 'Emerson', 'APC', 'Delta'
      ]
    },
    {
      id: 'power',
      name: 'Power Sector',
      color: 'emerald',
      customers: [
        'CESC', 'WBSEDCL/WBSETCL', 'Power Grid', 'Purulia Pump Stored'
      ]
    },
    {
      id: 'other',
      name: 'Other Sector',
      color: 'stone',
      customers: [
        'Inox', 'Microsec', 'Ananda Bazar', 'Kodak', 'Srijan Reality'
      ]
    }
  ];
  
  // Function to get color classes based on sector color
  const getColorClasses = (colorName: string, isActive: boolean = false) => {
    const baseClasses = isActive ? 'text-white ' : 'text-gray-700 hover:text-gray-900 ';
    
    const colorMap: {[key: string]: {bg: string, bgLight: string, border: string}} = {
      amber: {bg: 'bg-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200'},
      blue: {bg: 'bg-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200'},
      green: {bg: 'bg-green-600', bgLight: 'bg-green-50', border: 'border-green-200'},
      red: {bg: 'bg-red-600', bgLight: 'bg-red-50', border: 'border-red-200'},
      orange: {bg: 'bg-orange-600', bgLight: 'bg-orange-50', border: 'border-orange-200'},
      rose: {bg: 'bg-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200'},
      purple: {bg: 'bg-purple-600', bgLight: 'bg-purple-50', border: 'border-purple-200'},
      cyan: {bg: 'bg-cyan-600', bgLight: 'bg-cyan-50', border: 'border-cyan-200'},
      pink: {bg: 'bg-pink-600', bgLight: 'bg-pink-50', border: 'border-pink-200'},
      teal: {bg: 'bg-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-200'},
      gray: {bg: 'bg-gray-600', bgLight: 'bg-gray-50', border: 'border-gray-200'},
      indigo: {bg: 'bg-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200'},
      lime: {bg: 'bg-lime-600', bgLight: 'bg-lime-50', border: 'border-lime-200'},
      emerald: {bg: 'bg-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200'},
      stone: {bg: 'bg-stone-600', bgLight: 'bg-stone-50', border: 'border-stone-200'},
    };
    
    if (isActive) {
      return baseClasses + colorMap[colorName].bg;
    } else {
      return baseClasses + colorMap[colorName].bgLight + ' ' + colorMap[colorName].border;
    }
  };
  
  // Filter sectors based on active tab
  const filteredSectors = activeTab === 'all' 
    ? sectors 
    : sectors.filter(sector => sector.id === activeTab);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Major Customers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SMARTLiNE is proud to serve these prestigious organizations across Eastern India
          </p>
        </motion.div>
        
        {/* Sector filter tabs */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Sectors
          </button>
          
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveTab(sector.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === sector.id ? getColorClasses(sector.color, true) : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>
        
        {/* Customer list by sector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSectors.map((sector) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`border rounded-lg overflow-hidden ${expandedSector === sector.id ? 'shadow-lg' : 'shadow-sm'}`}
            >
              <div 
                className={`px-6 py-4 cursor-pointer ${getColorClasses(sector.color, expandedSector === sector.id)}`}
                onClick={() => toggleSector(sector.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{sector.name}</h3>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${expandedSector === sector.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              {(expandedSector === sector.id || activeTab !== 'all') && (
                <div className="px-6 py-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {sector.customers.map((customer, index) => (
                      <span 
                        key={`${sector.id}-${index}`}
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(sector.color)}`}
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
      
      </div>
    </section>
  );
};

export default MajorCustomers;