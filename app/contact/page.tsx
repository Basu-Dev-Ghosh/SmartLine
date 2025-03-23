// app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"contact" | "quote">("contact");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check URL params for tab selection
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check URL params for tab selection
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "quote") {
      setActiveTab("quote");
    }
  }, [searchParams]);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productInterest: "",
    requirements: "",
    budget: "",
    timeline: "",
  });

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", contactForm);
    // Here you would typically send the data to your backend
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    // Clear form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote Form Submitted:", quoteForm);
    // Here you would typically send the data to your backend
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    // Clear form
    setQuoteForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      productInterest: "",
      requirements: "",
      budget: "",
      timeline: "",
    });
  };

  const tabVariants = {
    active: {
      backgroundColor: "#16a34a",
      color: "white",
      transition: { duration: 0.3 },
    },
    inactive: {
      backgroundColor: "white",
      color: "#4b5563",
      transition: { duration: 0.3 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl mt-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Get in Touch with <span className="text-red-600">SMART</span>{" "}
          <span className="text-green-600">LiNE</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or need a customized solution? We're here to help with
          all your power management needs.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tab switcher */}
        <div className="flex border-b border-gray-200">
          <motion.button
            variants={tabVariants}
            animate={activeTab === "contact" ? "active" : "inactive"}
            onClick={() => setActiveTab("contact")}
            className="flex-1 py-4 font-medium text-center focus:outline-none"
          >
            Contact Us
          </motion.button>
          <motion.button
            variants={tabVariants}
            animate={activeTab === "quote" ? "active" : "inactive"}
            onClick={() => setActiveTab("quote")}
            className="flex-1 py-4 font-medium text-center focus:outline-none"
          >
            Request a Quote
          </motion.button>
        </div>

        {/* Form container */}
        <div className="p-6 md:p-8 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                key="success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Submission Successful!
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  {activeTab === "contact"
                    ? "Thank you for reaching out. We'll get back to you shortly."
                    : "Thank you for your interest. Our team will prepare a quote for you as soon as possible."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Submit Another Message
                </motion.button>
              </motion.div>
            ) : activeTab === "contact" ? (
              <motion.form
                key="contact"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-md"
                  >
                    Send Message
                  </motion.button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="quote"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleQuoteSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="quote-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      required
                      value={quoteForm.name}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="quote-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      required
                      value={quoteForm.email}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="quote-phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      required
                      value={quoteForm.phone}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={quoteForm.company}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="productInterest"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product/Service Interest *
                    </label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      required
                      value={quoteForm.productInterest}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    >
                      <option value="">Select an option</option>
                      <option value="Online UPS">Online UPS</option>
                      <option value="Battery Solutions">
                        Battery Solutions
                      </option>
                      <option value="Solar Products">Solar Products</option>
                      <option value="EV Chargers">EV Chargers</option>
                      <option value="Power Audit">Power Audit</option>
                      <option value="AMC Services">AMC Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={quoteForm.budget}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    >
                      <option value="">Select a range</option>
                      <option value="Below ₹50,000">Below ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">
                        ₹50,000 - ₹1,00,000
                      </option>
                      <option value="₹1,00,000 - ₹5,00,000">
                        ₹1,00,000 - ₹5,00,000
                      </option>
                      <option value="₹5,00,000 - ₹10,00,000">
                        ₹5,00,000 - ₹10,00,000
                      </option>
                      <option value="Above ₹10,00,000">Above ₹10,00,000</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={quoteForm.timeline}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediate">Immediate (ASAP)</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1 month">Within 1 month</option>
                      <option value="3 months">Within 3 months</option>
                      <option value="Long term">Long term planning</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Details/Requirements *
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={5}
                    required
                    value={quoteForm.requirements}
                    onChange={handleQuoteChange}
                    placeholder="Please describe your project needs, specifications, or any other details that will help us prepare an accurate quote."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-md"
                  >
                    Request Quote
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-start"
        >
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
            <p className="text-gray-600 mb-2">7439031293</p>
            <p className="text-gray-600">9831596920 / 9831062430</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-start"
        >
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
            <p className="text-gray-600">smartline.ecom@gmail.com</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-start"
        >
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Visit Us</h3>
            <p className="text-gray-600">221 Jodhpur Garden,</p>
            <p className="text-gray-600">Kolkata: 700 045</p>
          </div>
        </motion.div>
      </div>

      {/* Google Maps iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 rounded-xl overflow-hidden shadow-md h-96"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.6736262083846!2d88.36766527519287!3d22.50974907955751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271200beeca41%3A0x6fc90a75bb5bd576!2sJodhpur%20Park%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1710945400000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SMARTLiNE Office Location"
          className="rounded-xl"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactPage;
