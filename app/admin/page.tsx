// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types for the data
interface ContactForm {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface QuoteForm {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  productInterest: string;
  requirements: string;
  budget?: string;
  timeline?: string;
  createdAt: string;
}

interface PaginatedContacts {
  contacts: ContactForm[];
  total: number;
}

interface PaginatedQuotes {
  quotes: QuoteForm[];
  total: number;
}

// Dashboard component
const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "quotes">("contacts");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Data state
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [quotes, setQuotes] = useState<QuoteForm[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Check for mobile view on component mount and window resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    // Initial check
    checkMobileView();

    // Add event listener for resize
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Authentication
  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        // Fetch initial data
        fetchData();
      } else {
        setError("Invalid passcode. Please try again.");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  // Fetch data based on active tab
  const fetchData = async (page = 1, query = "") => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "contacts") {
        const response = await fetch(
          `/api/contact?page=${page}&limit=${itemsPerPage}${
            query ? `&query=${query}` : ""
          }`
        );

        if (!response.ok) throw new Error("Failed to fetch contacts");

        const data: PaginatedContacts = await response.json();
        setContacts(data.contacts);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } else {
        const response = await fetch(
          `/api/quote?page=${page}&limit=${itemsPerPage}${
            query ? `&query=${query}` : ""
          }`
        );

        if (!response.ok) throw new Error("Failed to fetch quotes");

        const data: PaginatedQuotes = await response.json();
        setQuotes(data.quotes);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Effect for tab change
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage(1);
      setSearchQuery("");
      fetchData(1, "");
    }
  }, [activeTab, isAuthenticated]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(1, searchQuery);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page, searchQuery);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // View item details
  const viewItemDetails = (item: any) => {
    setSelectedItem(item);
    if (isMobileView) {
      setShowDetailMobile(true);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const endpoint =
        activeTab === "contacts" ? "/api/contact/" : "/api/quote/";
      const response = await fetch(`${endpoint}${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      // Refresh data
      fetchData(currentPage, searchQuery);

      // Clear selected item if it was deleted
      if (selectedItem && selectedItem._id === id) {
        setSelectedItem(null);
        if (isMobileView) {
          setShowDetailMobile(false);
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to delete item");
    }
  };

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              <span className="text-[#dc2626]">SMART</span>
              <span className="text-[#58c8e3]">LiNE</span>
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              Admin Dashboard
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handlePasscodeSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="passcode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Admin Passcode
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all"
                placeholder="Enter passcode"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#58c8e3] hover:bg-[#45a0b7] text-white font-medium rounded-md transition-colors shadow-md text-sm sm:text-base"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Main dashboard - with the header moved to layout
  return (
    <>
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex-1 py-3 sm:py-4 text-sm sm:text-base font-medium text-center focus:outline-none ${
                activeTab === "contacts"
                  ? "bg-[#58c8e3] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Contact Submissions
            </button>
            <button
              onClick={() => setActiveTab("quotes")}
              className={`flex-1 py-3 sm:py-4 text-sm sm:text-base font-medium text-center focus:outline-none ${
                activeTab === "quotes"
                  ? "bg-[#58c8e3] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Quote Requests
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${
                  activeTab === "contacts" ? "contacts" : "quotes"
                }...`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#58c8e3] focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 sm:px-4 py-2 bg-[#58c8e3] hover:bg-[#45a0b7] text-white font-medium rounded-md transition-colors shadow-md text-sm sm:text-base"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  fetchData(1, "");
                }}
                className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors text-sm sm:text-base"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Content area - split into list and detail view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List view - hide on mobile when viewing details */}
          <div
            className={`lg:col-span-2 ${
              isMobileView && showDetailMobile ? "hidden" : "block"
            }`}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}

              {/* Loading state */}
              {loading ? (
                <div className="p-8 text-center">
                  <svg
                    className="animate-spin h-10 w-10 text-[#58c8e3] mx-auto mb-4"
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
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : (
                <>
                  {/* Data table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {activeTab === "contacts" ? (
                            <>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </>
                          ) : (
                            <>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                              </th>
                              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activeTab === "contacts" &&
                          (contacts.length === 0 ? (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-4 text-center text-gray-500"
                              >
                                No contact submissions found
                              </td>
                            </tr>
                          ) : (
                            contacts.map((contact) => (
                              <tr
                                key={contact._id}
                                className={
                                  selectedItem &&
                                  selectedItem._id === contact._id
                                    ? "bg-[#e0f7fc]"
                                    : "hover:bg-gray-50 cursor-pointer"
                                }
                                onClick={() => viewItemDetails(contact)}
                              >
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                                    {contact.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">
                                    {contact.email}
                                  </div>
                                </td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {contact.subject}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                  {isMobileView
                                    ? new Date(
                                        contact.createdAt
                                      ).toLocaleDateString()
                                    : formatDate(contact.createdAt)}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteItem(contact._id);
                                    }}
                                    className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ))}

                        {activeTab === "quotes" &&
                          (quotes.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-6 py-4 text-center text-gray-500"
                              >
                                No quote requests found
                              </td>
                            </tr>
                          ) : (
                            quotes.map((quote) => (
                              <tr
                                key={quote._id}
                                className={
                                  selectedItem && selectedItem._id === quote._id
                                    ? "bg-[#e0f7fc]"
                                    : "hover:bg-gray-50 cursor-pointer"
                                }
                                onClick={() => viewItemDetails(quote)}
                              >
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                                    {quote.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">
                                    {quote.email}
                                  </div>
                                </td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {quote.company}
                                </td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {quote.productInterest}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                  {isMobileView
                                    ? new Date(
                                        quote.createdAt
                                      ).toLocaleDateString()
                                    : formatDate(quote.createdAt)}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteItem(quote._id);
                                    }}
                                    className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="text-sm text-gray-700">
                            Page{" "}
                            <span className="font-medium">{currentPage}</span>{" "}
                            of <span className="font-medium">{totalPages}</span>
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 flex justify-center rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <button
                              onClick={() =>
                                handlePageChange(Math.max(1, currentPage - 1))
                              }
                              disabled={currentPage === 1}
                              className={`relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium ${
                                currentPage === 1
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              Previous
                            </button>

                            {/* Page numbers */}
                            {[...Array(totalPages)].map((_, index) => {
                              const pageNum = index + 1;
                              // Only show nearby pages to avoid cluttering
                              if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= currentPage - 1 &&
                                  pageNum <= currentPage + 1)
                              ) {
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium ${
                                      currentPage === pageNum
                                        ? "z-10 bg-[#e0f7fc] border-[#58c8e3] text-[#45a0b7]"
                                        : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              } else if (
                                pageNum === currentPage - 2 ||
                                pageNum === currentPage + 2
                              ) {
                                return (
                                  <span
                                    key={pageNum}
                                    className="relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              return null;
                            })}

                            <button
                              onClick={() =>
                                handlePageChange(
                                  Math.min(totalPages, currentPage + 1)
                                )
                              }
                              disabled={currentPage === totalPages}
                              className={`relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium ${
                                currentPage === totalPages
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              Next
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Detail view */}
          <div
            className={`lg:col-span-1 ${
              isMobileView && !showDetailMobile ? "hidden" : "block"
            }`}
          >
            <AnimatePresence>
              {selectedItem ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isMobileView ? 0 : 20,
                    y: isMobileView ? 20 : 0,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: 0,
                    x: isMobileView ? 0 : 20,
                    y: isMobileView ? 20 : 0,
                  }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {activeTab === "contacts"
                        ? "Contact Details"
                        : "Quote Request Details"}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        if (isMobileView) {
                          setShowDetailMobile(false);
                        }
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <dl className="divide-y divide-gray-200">
                      {Object.entries(selectedItem).map(([key, value]) => {
                        // Skip internal fields
                        if (key === "_id") return null;

                        return (
                          <div
                            key={key}
                            className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"
                          >
                            <dt className="text-sm font-medium text-gray-500 capitalize mb-1 sm:mb-0">
                              {key === "createdAt"
                                ? "Submitted"
                                : key.replace(/([A-Z])/g, " $1").trim()}
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                              {key === "createdAt" ? (
                                formatDate(value as string)
                              ) : key === "message" ||
                                key === "requirements" ? (
                                <div className="whitespace-pre-wrap max-h-60 overflow-y-auto">
                                  {value as string}
                                </div>
                              ) : (
                                (value as string)
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {isMobileView && (
                        <button
                          onClick={() => {
                            setShowDetailMobile(false);
                            setSelectedItem(null);
                          }}
                          className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          Back to List
                        </button>
                      )}
                      <button
                        onClick={() => deleteItem(selectedItem._id)}
                        className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                      >
                        Delete {activeTab === "contacts" ? "Contact" : "Quote"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-gray-200">
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No item selected
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select an item from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
