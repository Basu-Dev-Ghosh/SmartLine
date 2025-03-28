// app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";


// Define brand colors as constants for easy maintenance
const BRAND_COLORS = {
  smartlineBlue: "#58c8e3",
  smartlineBlueDark: "#45a0b7", // Darker shade for hover effects
  smartlineBlueLight: "#e0f7fc", // Light shade for backgrounds
  smartlineRed: "#dc2626",
  smartlineRedDark: "#b91c1c", // Darker shade for hover effects
  smartlineRedLight: "#fee2e2", // Light shade for backgrounds
};

const ContactPage = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"contact" | "quote">("contact");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    // Clear any error when user starts typing again
    if (submitError) setSubmitError(null);
  };

  const handleQuoteChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({ ...prev, [name]: value }));
    // Clear any error when user starts typing again
    if (submitError) setSubmitError(null);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      // Form submitted successfully
      setFormSubmitted(true);

      // Clear form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset form after 3 seconds
      setTimeout(() => setFormSubmitted(false), 3000);
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setSubmitError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      // Form submitted successfully
      setFormSubmitted(true);

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

      // Reset form after 3 seconds
      setTimeout(() => setFormSubmitted(false), 3000);
    } catch (error: any) {
      console.error("Error submitting quote form:", error);
      setSubmitError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabVariants = {
    active: {
      backgroundColor: BRAND_COLORS.smartlineBlue,
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
    <>
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="relative w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#58c8e3]/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#dc2626]/10 blur-3xl"></div>

          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
              <span className="text-[#dc2626]">SMART</span>
              <span className="text-[#58c8e3]">LiNE</span>{" "}
              <span className="ml-2">Contact</span>
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl -mt-12 relative z-20">
          <div className="text-center mb-12 bg-white rounded-t-xl shadow-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or need a customized solution? We're here to help
              with all your power management needs.
            </p>
          </div>

          <div className="bg-white rounded-b-xl shadow-lg overflow-hidden mb-12">
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
              {/* Error message display */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{submitError}</span>
                  </div>
                </motion.div>
              )}

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
                    <div className="w-20 h-20 bg-[#e0f7fc] rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <svg
                        className="w-10 h-10 text-[#58c8e3]"
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
                      className="px-6 py-2 bg-[#58c8e3] text-white rounded-md hover:bg-[#45a0b7] transition-colors shadow-md"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="flex justify-end"
                    >
                      <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-[#58c8e3] text-white font-medium rounded-md transition-all shadow-md flex items-center ${
                          isSubmitting
                            ? "opacity-80 cursor-not-allowed"
                            : "hover:bg-[#45a0b7]"
                        }`}
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                          <option value="Above ₹10,00,000">
                            Above ₹10,00,000
                          </option>
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
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
                        disabled={isSubmitting}
                        placeholder="Please describe your project needs, specifications, or any other details that will help us prepare an accurate quote."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-70"
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="flex justify-end"
                    >
                      <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-[#58c8e3] text-white font-medium rounded-md transition-all shadow-md flex items-center ${
                          isSubmitting
                            ? "opacity-80 cursor-not-allowed"
                            : "hover:bg-[#45a0b7]"
                        }`}
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                        {isSubmitting ? "Sending..." : "Request Quote"}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg flex items-start border-t-4 border-[#58c8e3]"
            >
              <div className="rounded-full bg-[#e0f7fc] p-3 mr-4 shadow-inner">
                <svg
                  className="w-6 h-6 text-[#58c8e3]"
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
                <h3 className="font-medium text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">7439031293</p>
                <p className="text-gray-600">9831596920 / 9831062430</p>
              </div>
            </motion.div>
            // Continuation of app/contact/page.tsx from previous snippet //
            This is the final part of the contact page component
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg flex items-start border-t-4 border-[#58c8e3]"
            >
              <div className="rounded-full bg-[#e0f7fc] p-3 mr-4 shadow-inner">
                <svg
                  className="w-6 h-6 text-[#58c8e3]"
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
                <h3 className="font-medium text-gray-900 mb-2">Visit Us</h3>
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
            className="rounded-xl overflow-hidden shadow-lg h-96 mb-8"
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

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 mb-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#58c8e3]/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#dc2626]/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Power Up Your Business?
                </h2>
                <p className="text-gray-300 mb-6">
                  Our experts are ready to help you with customized power
                  solutions that fit your needs and budget. Get in touch today
                  and let's discuss how we can help you stay powered.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("quote")}
                    className="px-6 py-3 bg-[#58c8e3] hover:bg-[#45a0b7] text-white font-medium rounded-md transition-colors shadow-md"
                  >
                    Request a Quote
                  </motion.button>
                  <motion.a
                    href="tel:7439031293"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition-colors shadow-md flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Call Us Now
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                  <span className="text-[#58c8e3] mr-2">Q:</span>
                  What types of UPS systems do you offer?
                </h3>
                <p className="text-gray-600 pl-6">
                  We offer a wide range of UPS systems including online UPS,
                  line-interactive UPS, and offline UPS in various capacities to
                  suit different power requirements. Our solutions range from
                  small office setups to large industrial applications.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                  <span className="text-[#58c8e3] mr-2">Q:</span>
                  Do you provide installation services?
                </h3>
                <p className="text-gray-600 pl-6">
                  Yes, we provide professional installation services for all our
                  products. Our team of experienced technicians ensures proper
                  setup and integration with your existing power infrastructure.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                  <span className="text-[#58c8e3] mr-2">Q:</span>
                  What is your service area?
                </h3>
                <p className="text-gray-600 pl-6">
                  We primarily serve Kolkata and surrounding areas in West
                  Bengal. However, for larger projects, we can consider
                  extending our services to other regions. Please contact us for
                  specific location inquiries.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                  <span className="text-[#58c8e3] mr-2">Q:</span>
                  Do you offer maintenance contracts?
                </h3>
                <p className="text-gray-600 pl-6">
                  Yes, we offer Annual Maintenance Contracts (AMC) for all our
                  products. Our AMC services include regular maintenance checks,
                  priority support, and discounted rates on repairs and
                  replacements.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                  <span className="text-[#58c8e3] mr-2">Q:</span>
                  How long does it take to get a quote?
                </h3>
                <p className="text-gray-600 pl-6">
                  We typically respond to quote requests within 24-48 business
                  hours. For more complex requirements, we might need additional
                  time to prepare a detailed proposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactPage;
