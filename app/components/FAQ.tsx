"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Battery,
  Zap,
  Settings,
  Shield,
  Calculator,
  Info,
  Phone,
  Mail,
} from "lucide-react";

const FAQ = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
    setActiveQuestion(null);
  };

  const toggleQuestion = (questionId: any) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  const faqSections = [
    {
      id: "ups-amc",
      title: "UPS AMC FAQ",
      icon: <Settings className="w-6 h-6" />,
      questions: [
        {
          id: "comprehensive-amc",
          question: "What is Comprehensive AMC of Online UPS System?",
          answer: `A Comprehensive Annual Maintenance Contract (AMC) for an Online UPS (Uninterruptible Power Supply) System is a service agreement between the UPS owner and the service provider. This contract ensures the proper maintenance, repair, and servicing of the UPS system to keep it running efficiently and prevent unexpected failures.`,
          hasImage: true,
          imageSrc: "/faq-images/image1.jpg",
          imageAlt: "Comprehensive AMC Services Diagram",
        },
        {
          id: "comprehensive-cover",
          question: "What Does a Comprehensive AMC of Online UPS System Cover?",
          answer: `Unlike a non-comprehensive AMC, which only includes servicing and excludes parts, a Comprehensive AMC typically includes all maintenance services, spare parts replacement, battery replacements, and comprehensive system support.`,
          hasImage: true,
          imageSrc: "/faq-images/image1.jpg",
          imageAlt: "Comprehensive AMC Coverage Flowchart",
        },
        {
          id: "non-comprehensive-amc",
          question: "What is a Non-Comprehensive AMC of Online UPS System?",
          answer: `A Non-Comprehensive AMC for an Online UPS (Uninterruptible Power Supply) System is a maintenance contract almost same as comprehensive AMC but it does not include the cost of spare parts or battery replacements. If any component of the UPS system needs to be replaced, the customer must bear the cost separately.`,
          hasImage: true,
          imageSrc: "/faq-images/image2.jpg",
          imageAlt: "Non-Comprehensive AMC Structure",
        },
        {
          id: "non-comprehensive-cover",
          question:
            "What Does a Non-Comprehensive AMC of Online UPS System Cover?",
          answer: `A Non-Comprehensive AMC covers regular maintenance services, preventive maintenance, system monitoring, and technical support, but excludes spare parts and component replacements.`,
          hasImage: true,
          imageSrc: "/faq-images/image2.jpg",
          imageAlt: "Non-Comprehensive AMC Services",
        },
        {
          id: "non-comprehensive-exclude",
          question:
            "What Non-Comprehensive UPS AMC of Online UPS System Does Not Cover?",
          answer: `A Non-Comprehensive AMC does not cover spare parts costs, battery replacements, component failures, and major repairs requiring part replacements.`,
          hasImage: true,
          imageSrc: "/faq-images/image3.jpg",
          imageAlt: "Non-Comprehensive AMC Exclusions",
        },
        {
          id: "comprehensive-benefits",
          question:
            "What are the Benefits of a Comprehensive AMC of Online UPS System?",
          answer: `The benefits include complete peace of mind, predictable costs, immediate support, extended equipment life, and comprehensive coverage including all parts and labor.`,
          hasImage: true,
          imageSrc: "/faq-images/image4.jpg",
          imageAlt: "Comprehensive AMC Benefits Chart",
        },
        {
          id: "when-non-comprehensive",
          question:
            "When to Choose a Non-Comprehensive AMC of Online UPS System?",
          answer: `Choose Non-Comprehensive AMC when:
          • Your UPS system is relatively new and less likely to require major repairs
          • You prefer to pay for spare parts only when necessary instead of a fixed cost
          • You already have backup spare parts available separately`,
        },
        {
          id: "preventive-maintenance",
          question:
            "What is Preventive Maintenance and what are the Key Activities present in Preventive Maintenance of an Online UPS System?",
          answer: `Preventive maintenance (PM) is a proactive approach to maintaining equipment, such as an Online UPS System, to prevent unexpected failures and extend its lifespan. It involves regular inspections, servicing, and minor repairs to ensure the system runs efficiently and reliably.

Key Activities Include:
1. Visual Inspection: Checking for loose connections, dust accumulation, or physical damage
2. Battery Health Check: Measuring battery voltage and capacity, checking for corrosion
3. Load Testing: Simulating power failure to ensure proper UPS function
4. Firmware & Software Updates: Updating UPS firmware for optimal performance
5. Electrical Parameter Testing: Checking input/output voltage and frequency
6. Cooling System & Dust Cleaning: Ensuring fans and heat sinks are clean
7. Alarm & Notification System Check: Testing error alerts and warning signals`,
          hasImage: true,
          imageSrc: "/faq-images/image5.jpg",
          imageAlt: "Preventive Maintenance Activities Flowchart",
        },
      ],
    },
    {
      id: "ups-general",
      title: "UPS FAQ",
      icon: <Zap className="w-6 h-6" />,
      questions: [
        {
          id: "ups-capacity-analysis",
          question: "How to analyse what Capacity of UPS System is required?",
          answer: `Choosing the right UPS system capacity requires a step-by-step analysis:

1. List All Equipment to be Connected
   • Servers, routers, switches
   • PCs, monitors
   • Medical or lab equipment
   • CCTV and security systems

2. Find Power Consumption of Each Device
   • Check power rating (watts or VA) on nameplate
   • Use actual wattage for accuracy
   • Formula: Power (VA) = Voltage (V) × Current (A)

3. Calculate Total Load
   • Add up all VA or Watt ratings
   • Convert: VA = Watts ÷ Power Factor (typical PF = 0.8)

4. Add Safety Margin (Buffer)
   • Add 20-25% margin for future growth
   • Recommended Capacity = Total Load × 1.25

5. Decide on Backup Time (Runtime)
   • 5-15 minutes: Safe shutdown
   • 30-60+ minutes: Extended operations

6. Consider Power Type
   • Single-phase or 3-phase matching
   • Online UPS for critical applications`,
          hasImage: true,
          imageSrc: "/faq-images/image6.jpg",
          imageAlt: "UPS Capacity Selection Guide",
        },
        {
          id: "ups-topology",
          question: "How to Know What Topology of UPS System to be used?",
          answer: `UPS topology selection depends on your equipment protection needs:

1. Basic Home/Office Electronics
   • Examples: Desktop PC, monitor, printer, Wi-Fi router
   • Protection Level: Low
   • Recommended: Standby UPS (2-10ms switch time)

2. Business Equipment/Network Hardware
   • Examples: Workstations, network switches, NAS, POS systems
   • Protection Level: Medium  
   • Recommended: Line-Interactive UPS (2-4ms switch time)

3. Critical Servers/Medical/Industrial Equipment
   • Examples: Servers, data centers, lab equipment, medical devices
   • Protection Level: High
   • Recommended: Online (Double-Conversion) UPS (Zero switch time)`,
          hasImage: true,
          imageSrc: "/faq-images/image7.jpg",
          imageAlt: "Standby UPS Diagram",
        },
        {
          id: "ups-phase-dc-bus",
          question: "What Should be the UPS Phase and UPS DC Bus?",
          answer: `UPS Phase Selection:

Single-Phase UPS:
• Use for: Homes, small offices, network closets
• Power range: Up to 10 KVA
• Input/Output: 230V
• Choose if load is under 10 kVA

Three-Phase UPS:
• Use for: Data centers, industrial setups
• Power range: 10 KVA and above
• Input/Output: 440V 3-phase
• Choose if you need more than 10 KVA

UPS DC Bus Voltage:
• Domestic UPS (500/600 VA): 12V
• Very Small UPS (1 kVA): 24V  
• Small UPS (2-3 kVA): 72/96V
• Mid-Range UPS (6-10 KVA): 192/240V
• Higher KVA (Above 10 KVA): Above 240V`,
          hasImage: true,
          imageSrc: "/faq-images/image10.jpg",
          imageAlt: "Single Phase UPS System",
        },
      ],
    },
    {
      id: "battery-faq",
      title: "Battery FAQ",
      icon: <Battery className="w-6 h-6" />,
      questions: [
        {
          id: "battery-type-selection",
          question: "How to Choose Battery Type for UPS System?",
          answer: `Battery Types for UPS Systems:

VRLA/SMF (Sealed Maintenance-Free):
• Most common for UPS applications
• Affordable and easy to install
• Lifespan: 3-5 years
• No maintenance required
• Temperature-sensitive
• Ideal for: Office, home, small server rooms

Tubular Lead-Acid Batteries:
• Higher lifespan (5-8 years)
• Better deep-discharge performance
• Requires ventilation and maintenance
• Ideal for: Industrial or semi-commercial use

Lithium-Ion Batteries:
• Long lifespan (10-15 years)
• Lightweight, fast charging, compact
• Expensive but cost-effective over time
• Excellent temperature tolerance
• Ideal for: High-end setups, data centers`,
          hasImage: true,
          imageSrc: "/faq-images/image14.jpg",
          imageAlt: "VRLA/SMF Battery Comparison Chart",
        },
        {
          id: "battery-ah-calculation",
          question: "How to Decide Battery AH (Amp-Hour)?",
          answer: `Battery AH Calculation Formula:

DC Current = (KVA rating × Load Power factor × 1000) ÷ (Battery Bank Voltage × Inverter efficiency)

AH Capacity = DC Current × K-factor × Design margin (1.1) × T-factor × Aging factor (1.25)

Example Calculation:
For 10 KVA load, 30 min backup, 16×12V SMF batteries:
• Power Factor: 0.9
• K factor @ 30 Min: 1.3
• Inverter efficiency: 85%
• Design Margin: 1.1
• Aging factor: 1.25

DC Current = (10 × 0.8 × 1000) ÷ (192 × 0.85) = 49 Amp
Required AH = 49 × 1.3 × 1.1 × 1 × 1.25 = 87.5 AH

Common Battery Configurations:
• 12V: 1 battery (Domestic UPS 500/600 VA)
• 24V: 2 batteries (Small UPS 1 kVA)
• 48V: 4 batteries (Typical UPS 2-3 kVA)
• 192V: 16 batteries (Mid-Range UPS 6-10 kVA)`,
          hasImage: true,
          imageSrc: "/faq-images/image13.jpg",
          imageAlt: "Battery AH Calculation Flowchart",
        },
        {
          id: "battery-life-expectancy",
          question: "What is the Battery Life Expectancy?",
          answer: `Battery life depends on type, usage conditions, temperature, and charging cycles:

Battery Life by Type:
• VRLA/SMF: 3-5 years (200-400 cycles)
• Tubular Lead-Acid: 5-8 years (800-1500 cycles)  
• Lithium-Ion: 10-15 years (2000-5000 cycles)
• Nickel-Cadmium: 10-20 years (1000-2000 cycles)

Key Factors Affecting Battery Life:
1. Temperature: Ideal 20-25°C, every 8°C rise cuts life in half
2. Depth of Discharge: Frequent deep discharges reduce life
3. Charge/Discharge Cycles: Each type has limited cycles
4. Charging Method: Poor chargers reduce life
5. Maintenance: Regular checks extend life`,
          hasImage: true,
          imageSrc: "/faq-images/image17.jpg",
          imageAlt: "Battery Life Factors Diagram",
        },
        {
          id: "battery-connecting-tools",
          question: "What are the Battery Connecting Tools which are Required?",
          answer: `Essential Battery Connection Tools:

1. Battery Interlink Cables/Jumpers
   • Material: Copper with PVC/XLPE insulation
   • Gauge: 10mm² to 50mm² depending on current
   • Length: 0.5 to 1 meter typical

2. Battery Terminal Lugs
   • Types: Flat copper lugs, ring terminals (M6, M8, M10)
   • Material: Tin-plated copper

3. Crimping Tool
   • Manual hydraulic or heavy-duty ratchet crimper
   • Die sizes to match cable gauge

4. Battery Torque Wrench/Spanner
   • Torque range: 5-10 Nm for small batteries

5. Cable Markers/Sleeves
   • Colors: Red (positive), Black (negative)

6. DC Breakers/Fuses/Battery Disconnects
   • Safety isolation for battery banks

7. Insulated Gloves & Multimeter
   • For safety and testing continuity/voltage`,
        },
        {
          id: "battery-rack-sizing",
          question:
            "How to Design the Sizing for Battery Bank and Battery Bank Rack?",
          answer: `Battery Rack Design Considerations:

Common Battery Sizes (12V):
• 7AH: ~150×65×95 mm, ~2.5 kg
• 18AH: ~180×75×170 mm, ~6.0 kg  
• 26AH: ~165×175×125 mm, ~9.0 kg
• 42AH: ~197×165×170 mm, ~14.5 kg
• 65AH: ~260×170×180 mm, ~24 kg
• 100AH: ~330×170×220 mm, ~35 kg

Battery Rack Types:
• 2-tier rack (4×12V/100AH): 48V string, ~700×500×500 mm
• 4-tier rack (8×12V): 96V string, ~800×500×1000 mm  
• 2-row parallel rack (16×): 192V, ~1200×800×1200 mm
• Custom welded rack: 24+ batteries, modular design

Design factors: Number of batteries, battery size, ventilation space, maintenance access`,
          hasImage: true,
          imageSrc: "/faq-images/image19.jpg",
          imageAlt: "Battery Rack Configuration Diagram",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to UPS systems, AMC services, and battery
            solutions. Find answers to all your power backup questions.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {faqSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-8 text-left bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {section.title}
                  </h2>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  {activeSection === section.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>

              {activeSection === section.id && (
                <div className="divide-y divide-gray-100">
                  {section.questions.map((q, index) => (
                    <div key={q.id} className="border-l-4 border-cyan-400">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                      >
                        <div className="flex items-start space-x-4">
                          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold min-w-fit">
                            Q{index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800 text-left group-hover:text-cyan-600 transition-colors">
                            {q.question}
                          </h3>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {activeQuestion === q.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </button>

                      {activeQuestion === q.id && (
                        <div className="px-6 pb-6 ml-16">
                          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 border-l-4 border-cyan-400">
                            {q.hasImage && (
                              <div className="mb-6">
                                <img
                                  src={q.imageSrc}
                                  alt={q.imageAlt}
                                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg border border-gray-200"
                                  style={{
                                    maxHeight: "600px",
                                    objectFit: "contain",
                                  }}
                                />
                                <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                                  {q.imageAlt}
                                </p>
                              </div>
                            )}
                            <div className="prose prose-lg max-w-none">
                              {q.answer.split("\n").map((paragraph, idx) => (
                                <p
                                  key={idx}
                                  className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Our technical experts are here to help you find the perfect power
              solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  window.location.href = "contact?tab=quote";
                }}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                Get a Quote
              </button>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-cyan-500" />
                  <span className="font-medium">7439031293</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  <span className="font-medium">smartline.ecom@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 24x7 Support Badge */}
        
      </div>
    </div>
  );
};

export default FAQ;
