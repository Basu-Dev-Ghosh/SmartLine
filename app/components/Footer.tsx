// app/components/Footer.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const [emailInput, setEmailInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription - would be implemented with backend
    alert(`Thank you for subscribing with ${emailInput}`);
    setEmailInput('');
  };

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // If on home page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-green-600 to-red-600"></div>
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-green-600/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-red-600/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
                <span className="text-red-500">SMART</span>
                <span className="text-green-500">LiNE</span>
              </h3>
              <p className="text-gray-400 text-sm">
                An ISO 9001:2015 Certified Company
              </p>
            </div>
            
            <p className="text-gray-300 text-sm mb-6">
              A brainchild of qualified, experienced engineers & management professionals with a vision to help Industry meet their business goals through our expertise, service & solution.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Contact Us</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  221 Jodhpur Garden, Kolkata: 700 045
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  7439031293 / 9831596920 / 9831062430
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  smartline.ecom@gmail.com
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Links - Changed from Services to include section links */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('products')}>
                  Our Products
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('services')}>
                  Our Services
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('partners')}>
                  Partner Brands
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('customers')}>
                  Major Customers
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('valued-customers')}>
                  Valued Customers
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('why-choose')}>
                  Why Choose Us
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors">
                <Link href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Our Products & Services */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-gray-700 pb-2">Products & Services</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('products')}>
                  Online UPS
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('products')}>
                  Battery Solutions
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('products')}>
                  Solar Products
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('products')}>
                  Automation Products
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('services')}>
                  UPS & Battery Services
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('services')}>
                  Power Audit
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('services')}>
                  Solar Solutions
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                <button onClick={() => scrollToSection('services')}>
                  AMC Services
                </button>
              </li>
              <li className="hover:text-green-500 transition-colors">
                <Link href="/contact?tab=quote">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter & Social Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-gray-700 pb-2">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers
            </p>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 text-gray-300 px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </form>
            
            <h4 className="text-lg font-medium mb-4">Why SMARTLiNE?</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div 
                className="flex items-center text-gray-300 cursor-pointer hover:text-green-500 transition-colors"
                onClick={() => scrollToSection('why-choose')}
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Expertise</span>
              </div>
              <div 
                className="flex items-center text-gray-300 cursor-pointer hover:text-green-500 transition-colors"
                onClick={() => scrollToSection('why-choose')}
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Availability</span>
              </div>
              <div 
                className="flex items-center text-gray-300 cursor-pointer hover:text-green-500 transition-colors"
                onClick={() => scrollToSection('why-choose')}
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Flexibility</span>
              </div>
              <div 
                className="flex items-center text-gray-300 cursor-pointer hover:text-green-500 transition-colors"
                onClick={() => scrollToSection('why-choose')}
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Speed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Smartline E Commerce (P) Ltd. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-xs">
            <p>Always On Line ( 24 x 7 x 365 )</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;