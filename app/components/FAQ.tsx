"use client";
import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Battery,
  Zap,
  Settings,
  Search,
  BookOpen,
  Phone,
  Mail,
  Filter,
  Star,
  Clock,
  Tag,
  Grid,
  List,
  Download,
  Share2,
  X,
} from "lucide-react";

const FAQ = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("sections");

  // Enhanced markdown-style content parser
  interface MarkdownSectionProps {
    content: string;
  }

  interface TableRow {
    [key: string]: string;
  }

  const parseMarkdown = (content: string): React.ReactNode[] => {
    // Split content into sections
    const sections: string[] = content.split("\n\n");

    return sections.map((section: string, index: number) => {
      // Headers
      if (section.startsWith("**") && section.endsWith("**")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-gray-800 mb-4 mt-6 first:mt-0 flex items-center"
          >
            <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full mr-3"></span>
            {section.slice(2, -2)}
          </h3>
        );
      }

      // Tables
      if (section.includes("|") && section.split("\n").length > 2) {
        const lines: string[] = section
          .split("\n")
          .filter((line) => line.trim());
        if (lines.some((line) => line.includes("---"))) {
          const headerIndex: number = lines.findIndex((line) =>
            line.includes("---")
          );
          const headers: string[] =
            lines[headerIndex - 1]
              ?.split("|")
              .map((h) => h.trim())
              .filter((h) => h) || [];
          const rows: string[][] = lines.slice(headerIndex + 1).map((line) =>
            line
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell)
          );

          return (
            <div
              key={index}
              className="overflow-x-auto my-6 rounded-lg shadow-lg border border-gray-200"
            >
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
                    {headers.map((header: string, i: number) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-left text-sm font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row: string[], i: number) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {row.map((cell: string, j: number) => (
                        <td key={j} className="px-6 py-4 text-sm text-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Lists
      if (section.includes("•") || section.includes("-")) {
        const items: string[] = section
          .split("\n")
          .filter((line) => line.trim());
        return (
          <div key={index} className="my-4">
            <ul className="space-y-3">
              {items.map((item: string, i: number) => {
                const cleanItem: string = item.replace(/^[•\-]\s*/, "").trim();
                if (!cleanItem) return null;

                // Check if it's a sub-item
                const isSubItem: boolean = item.startsWith("  ");

                return (
                  <li
                    key={i}
                    className={`flex items-start ${isSubItem ? "ml-6" : ""}`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                        isSubItem
                          ? "bg-gray-400"
                          : "bg-gradient-to-r from-cyan-500 to-teal-500"
                      }`}
                    ></span>
                    <span className="text-gray-700 leading-relaxed">
                      {cleanItem}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }

      // Code blocks or formulas
      if (
        section.includes("=") &&
        (section.includes("×") || section.includes("÷"))
      ) {
        return (
          <div
            key={index}
            className="bg-gray-50 border-l-4 border-cyan-500 p-4 my-4 rounded-r-lg"
          >
            <code className="text-sm font-mono text-gray-800">
              {section.split("\n").map((line: string, i: number) => (
                <div key={i} className="mb-1">
                  {line}
                </div>
              ))}
            </code>
          </div>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {section.split("\n").map((line: string, i: number) => (
            <span key={i}>
              {line}
              {i < section.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    });
  };

  const faqData = [
    {
      id: "ups-amc",
      title: "UPS AMC FAQ",
      icon: <Settings className="w-6 h-6" />,
      category: "maintenance",
      color: "from-blue-500 to-blue-600",
      description: "Annual Maintenance Contract information and guidelines",
      questions: [
        {
          id: "comprehensive-amc",
          question: "What is Comprehensive AMC of Online UPS System?",
          category: "maintenance",
          difficulty: "beginner",
          readTime: "2 min",
          content: `**Definition**
A Comprehensive Annual Maintenance Contract (AMC) for an Online UPS System is a complete service agreement between the UPS owner and service provider.

**Key Features**
• All maintenance services included
• Spare parts replacement covered  
• Battery replacements included
• 24/7 technical support
• Preventive maintenance scheduling
• Emergency response services

**What Makes It Comprehensive**
Unlike non-comprehensive AMC which only covers labor, this includes ALL costs - parts, batteries, and labor - providing complete peace of mind with predictable annual costs.`,
          tags: ["AMC", "Maintenance", "Comprehensive"],
        },
        {
          id: "comprehensive-cover",
          question: "What Does a Comprehensive AMC Cover?",
          category: "maintenance",
          difficulty: "intermediate",
          readTime: "4 min",
          content: `**UPS Maintenance Services Overview**

| Service Category | Details | Frequency |
|-----------------|---------|-----------|
| Technical Support | Consultation & Power Management | 24/7 |
| Preventive Maintenance | Inspections & Servicing | Monthly |
| Corrective Maintenance | Repairs & Malfunction Fixes | As Needed |
| Parts Replacement | Spare Parts & Batteries | Included |
| Load Testing | Battery Health Check | Quarterly |
| Software Updates | Firmware Updates | As Available |
| Emergency Support | Priority Response | 24/7 |
| Cleaning Service | Dust Removal & Ventilation | Monthly |

**Detailed Coverage**
• Performance monitoring and system optimization
• Battery health assessment without replacement costs
• Software and firmware updates for optimal functionality
• Emergency repairs with priority response times
• Complete documentation and compliance reporting`,
          tags: ["Coverage", "Services", "Support"],
        },
        {
          id: "non-comprehensive-amc",
          question: "What is Non-Comprehensive AMC?",
          category: "maintenance",
          difficulty: "beginner",
          readTime: "3 min",
          content: `**Definition**
Non-Comprehensive AMC provides maintenance services but excludes parts costs.

**What's Included vs Excluded**

| Included ✅ | Excluded ❌ |
|------------|-------------|
| Labor for maintenance | Spare parts costs |
| Technical support | Battery replacements |
| Preventive maintenance | Major components |
| System diagnostics | Emergency parts delivery |
| Service calls | Hardware upgrades |

**When to Choose Non-Comprehensive**
• UPS system is relatively new
• Low likelihood of major repairs
• You prefer pay-as-you-go for parts  
• You maintain spare parts inventory
• Want lower upfront AMC costs`,
          tags: ["Non-Comprehensive", "Cost", "Parts"],
        },
        {
          id: "comprehensive-benefits",
          question: "Benefits of Comprehensive AMC",
          category: "maintenance",
          difficulty: "intermediate",
          readTime: "3 min",
          content: `**Financial Benefits**
• Predictable annual costs with no surprise bills
• Better bulk pricing on parts through service provider
• Easy budget planning and cost control
• Reduced total cost of ownership

**Operational Benefits**  
• Minimized downtime with faster repairs
• Extended equipment life through professional maintenance
• Better system performance and efficiency
• Preventive issue detection before major failures

**Strategic Advantages**
• Complete peace of mind with full coverage
• Priority service and faster response times
• Expert technicians handle all technical issues
• Focus on core business without maintenance worries
• Professional documentation for compliance`,
          tags: ["Benefits", "ROI", "Performance"],
        },
        {
          id: "preventive-maintenance",
          question: "Preventive Maintenance Activities",
          category: "maintenance",
          difficulty: "advanced",
          readTime: "5 min",
          content: `**Key Preventive Maintenance Activities**

| Activity | Description | Frequency |
|----------|-------------|-----------|
| Visual Inspection | Check connections, dust, damage | Monthly |
| Battery Health Check | Voltage, capacity, corrosion check | Monthly |
| Load Testing | Simulate power failure scenarios | Quarterly |
| Electrical Testing | Voltage, frequency, efficiency | Quarterly |
| Firmware Updates | Software and system updates | As Available |
| Cooling System | Fan and heat sink maintenance | Monthly |
| Alarm Testing | Error alerts and notifications | Monthly |

**Benefits of Preventive Maintenance**
• Minimized downtime through regular system checks
• Extended UPS lifespan with proper care and monitoring  
• Better performance and efficiency maintenance
• Early problem detection before major failures occur

**Professional Standards**
All preventive maintenance follows manufacturer guidelines and industry best practices to ensure optimal system performance and warranty compliance.`,
          tags: ["Preventive", "Maintenance", "Schedule"],
        },
      ],
    },
    {
      id: "ups-general",
      title: "UPS Selection & Sizing",
      icon: <Zap className="w-6 h-6" />,
      category: "sizing",
      color: "from-purple-500 to-purple-600",
      description: "UPS capacity analysis and topology selection guide",
      questions: [
        {
          id: "ups-capacity-analysis",
          question: "How to Analyze Required UPS Capacity?",
          category: "sizing",
          difficulty: "intermediate",
          readTime: "6 min",
          content: `**Step-by-Step Capacity Analysis**

**Step 1: List All Equipment**
• Servers, routers, switches
• PCs, monitors, peripherals
• Medical or laboratory equipment
• CCTV and security systems
• Industrial controllers or PLCs

**Step 2: Find Power Consumption**
• Check power rating (watts or VA) on device nameplate
• Use actual wattage for accuracy, not maximum rating
• Formula: Power (VA) = Voltage (V) × Current (A)
• Example: Monitor rated 0.5A at 230V = 115 VA

**Step 3: Calculate Total Load**

| Load Type | Calculation Method |
|-----------|-------------------|
| Mixed Watts/VA | Add all VA ratings |
| Watts Only | Convert: VA = Watts ÷ Power Factor (0.8) |
| Example | 4,000W ÷ 0.8 = 5,000 VA required |

**Step 4: Add Safety Margin**
• Add 20-25% margin for future growth
• Recommended Capacity = Total Load × 1.25
• Example: 5,000 VA × 1.25 = 6,250 VA (choose 7.5 KVA)

**Step 5: Determine Backup Time**
• 5-15 minutes: Safe shutdown (standard)
• 30-60+ minutes: Extended operations
• Note: Higher runtime = more batteries, not larger UPS

**Quick Reference Guide**

| Load (Watts) | Recommended UPS (KVA) |
|--------------|----------------------|
| 500W | 1 KVA |
| 1000W (1 KW) | 1.5-2 KVA |
| 1500W (1.5 KW) | 2-3 KVA |
| 2000W (2 KW) | 3 KVA |
| 3000W (3 KW) | 4-5 KVA |
| 5000W (5 KW) | 7-8 KVA |`,
          tags: ["Capacity", "Sizing", "Calculation"],
        },
        {
          id: "ups-topology",
          question: "How to Select UPS Topology?",
          category: "sizing",
          difficulty: "intermediate",
          readTime: "4 min",
          content: `**UPS Topology Selection Guide**

**1. Basic Home/Office Electronics**
• Examples: Desktop PC, monitor, printer, Wi-Fi router
• Power sensitivity: Low
• Environment: Stable power grid
• **Recommended: Standby UPS (2-10ms switch time)**

**2. Business Equipment/Network Hardware**  
• Examples: Workstations, network switches, NAS, POS systems
• Power sensitivity: Medium
• Environment: Some voltage fluctuations
• **Recommended: Line-Interactive UPS (2-4ms switch time)**

**3. Critical Servers/Medical/Industrial**
• Examples: Servers, data centers, lab equipment, medical devices
• Power sensitivity: High  
• Environment: Zero downtime required
• **Recommended: Online UPS (Zero switch time)**

**Topology Comparison Table**

| UPS Topology | Protection Level | Use Case | Switch Time | Cost |
|-------------|------------------|----------|-------------|------|
| Offline/Standby | Low | Home PCs, basic electronics | 2-10ms | Low |
| Line-Interactive | Medium | Small business, network gear | 2-4ms | Medium |
| Online/Double-Conversion | High | Servers, critical systems | Zero | High |

**Selection Criteria**
The choice depends on your equipment's sensitivity to power interruptions and the criticality of your applications.`,
          tags: ["Topology", "Selection", "Comparison"],
        },
        {
          id: "ups-phase-dc-bus",
          question: "UPS Phase and DC Bus Selection",
          category: "sizing",
          difficulty: "advanced",
          readTime: "5 min",
          content: `**UPS Phase Selection**

**Single-Phase UPS**
• Use for: Homes, small offices, network closets
• Power range: Up to 10 KVA
• Input/Output: 230V (or 120V depending on region)
• Choose if: Load under 10 kVA, single-phase facility power

**Three-Phase UPS**
• Use for: Data centers, industrial setups, large IT environments  
• Power range: 10 KVA and above
• Input/Output: 440V 3-phase
• Choose if: Need >10 KVA, 3-phase electrical infrastructure

**DC Bus Voltage by UPS Size**

| UPS Size | Typical DC Bus Voltage | Application |
|----------|----------------------|-------------|
| 500/600 VA | 12V | Domestic UPS |
| 1 kVA | 24V | Very Small UPS |
| 2-3 kVA | 72/96V | Small UPS |
| 6-10 KVA | 192/240V | Mid-Range UPS |
| Above 10 KVA | Above 240V | Large UPS |

**Why Higher DC Voltage in Larger Systems?**
• **Improved Efficiency:** Reduces energy loss during transmission
• **Reduced Current:** Lower current allows smaller cables and reduced costs  
• **Higher Output Power:** Enables handling more power for larger applications

**Selection Guidelines**

| Scenario | UPS Phase | DC Bus Range |
|----------|-----------|--------------|
| Home/Office/Small Business | Single-Phase | 24V-96V |
| Medium Office/Server Room | Single or 3-Phase | 96V-192V |
| Data Center/Industrial | Three-Phase | 240V-600V+ |`,
          tags: ["Phase", "DC Bus", "Voltage"],
        },
      ],
    },
    {
      id: "battery-faq",
      title: "Battery Selection & Sizing",
      icon: <Battery className="w-6 h-6" />,
      category: "battery",
      color: "from-green-500 to-green-600",
      description:
        "Battery types, sizing calculations, and installation guidelines",
      questions: [
        {
          id: "battery-type-selection",
          question: "How to Choose Battery Type for UPS?",
          category: "battery",
          difficulty: "intermediate",
          readTime: "4 min",
          content: `**Battery Types Comparison**

| Battery Type | Lifespan | Cycles | Maintenance | Cost | Best For |
|-------------|----------|---------|-------------|------|----------|
| VRLA/SMF | 3-5 years | 200-400 | None | Low | Office, home, small servers |
| Tubular Lead-Acid | 5-8 years | 800-1500 | Yes | Medium | Industrial/Commercial |
| Lithium-Ion | 10-15 years | 2000-5000+ | None | High | Data centers, critical systems |
| Nickel-Cadmium | 10-20 years | 1000-2000 | Some | High | Harsh environments |

**VRLA/SMF (Sealed Maintenance-Free)**
• Most common for UPS applications
• Affordable and easy to install
• No maintenance required
• Temperature-sensitive performance
• Ideal for: Office, home, small server rooms

**Tubular Lead-Acid Batteries**  
• Higher lifespan and better deep-discharge performance
• Requires ventilation and periodic maintenance
• More rugged construction for demanding applications
• Ideal for: Industrial or semi-commercial use

**Lithium-Ion Batteries**
• Longest lifespan with excellent performance
• Lightweight, fast charging, compact design
• Higher upfront cost but better long-term value
• Excellent temperature tolerance
• Ideal for: Data centers, critical systems, space-limited installations`,
          tags: ["Battery Types", "Comparison", "Selection"],
        },
        {
          id: "battery-ah-calculation",
          question: "How to Calculate Battery AH Requirements?",
          category: "battery",
          difficulty: "advanced",
          readTime: "6 min",
          content: `**Battery AH Calculation Formula**

**Step 1: Calculate DC Current**
DC Current (Idc) = (KVA rating × Load Power factor × 1000) ÷ (Battery Bank Voltage × Inverter efficiency)

**Step 2: Calculate AH Capacity**  
AH Capacity = Idc × K-factor × Design margin (1.1) × T-factor × Aging factor (1.25)

**Example Calculation**
For 10 KVA load, 30 min backup, 16×12V SMF batteries:

| Parameter | Value | Note |
|-----------|-------|------|
| Power Factor | 0.9 | Typical for IT loads |
| K factor @ 30 Min | 1.3 | Depends on backup time |
| Inverter efficiency | 85% | Typical efficiency |
| Design Margin | 1.1 | 10% safety margin |
| Aging factor | 1.25 | 25% for battery aging |
| Battery Bank Voltage | 192V | 16 × 12V batteries |

**Calculation Steps**
DC Current = (10 × 0.8 × 1000) ÷ (192 × 0.85) = 49 Amp
Required AH = 49 × 1.3 × 1.1 × 1 × 1.25 = 87.5 AH

**Common Battery Configurations**

| System Voltage | No. of 12V Batteries | Typical Use |
|----------------|---------------------|-------------|
| 12V | 1 | Domestic UPS (500/600 VA) |
| 24V | 2 | Very Small UPS (1 kVA) |
| 48V | 4 | Typical UPS (2-3 kVA) |
| 72V/96V | 6/8 | Small UPS (2-3 kVA) |
| 192V/230V | 16/20 | Mid-Range UPS (6-10 KVA) |
| Above 192V | Above 20 | Large UPS (Above 10 KVA) |`,
          tags: ["AH Calculation", "Battery Sizing", "Formula"],
        },
        {
          id: "battery-life-expectancy",
          question: "What Affects Battery Life Expectancy?",
          category: "battery",
          difficulty: "intermediate",
          readTime: "4 min",
          content: `**Battery Life by Type and Conditions**

| Battery Type | Life Expectancy | Cycle Use | Key Notes |
|-------------|----------------|-----------|-----------|
| VRLA/SMF | 3-5 years | 200-400 | Most common, heat sensitive |
| Tubular Lead-Acid | 5-8 years | 800-1500 | Rugged, needs maintenance |
| Lithium-Ion | 10-15 years | 2000-5000+ | Premium, low degradation |
| Nickel-Cadmium | 10-20 years | 1000-2000 | Harsh environments only |

**Critical Factors Affecting Battery Life**

**1. Temperature Impact**
• Ideal operating range: 20-25°C (68-77°F)
• **Every 8°C rise above 25°C cuts battery life in half**
• Example: VRLA rated 5 years at 25°C → only 2.5 years at 35°C

**2. Depth of Discharge (DoD)**
• Frequent deep discharges significantly reduce battery life
• UPS batteries perform best when kept mostly charged
• Only discharge during actual power outages for maximum life

**3. Charge/Discharge Cycles**
• Each battery type has limited number of full cycles
• VRLA: ~200-400 full cycles
• Tubular: ~800-1500 cycles  
• Lithium-ion: 2000-5000+ cycles

**4. Charging Method Quality**
• Poor quality chargers or mismatched voltages reduce life
• Good UPS systems include intelligent battery management
• Proper float and equalization charging extends life

**5. Maintenance Requirements**

| Battery Type | Maintenance Needs |
|-------------|------------------|
| SMF/VRLA | Annual visual checks only |
| Tubular | Electrolyte level checks every few months |
| Lithium-ion | Virtually maintenance-free |

**Best Practices for Maximum Life**
• Store in cool, ventilated environment
• Use proper charging equipment
• Perform regular capacity testing
• Replace batteries in complete sets
• Follow manufacturer guidelines`,
          tags: ["Battery Life", "Temperature", "Maintenance"],
        },
        {
          id: "battery-connecting-tools",
          question: "Required Battery Connection Tools",
          category: "battery",
          difficulty: "beginner",
          readTime: "3 min",
          content: `**Essential Battery Connection Tools**

**1. Battery Interlink Cables/Jumpers**
• Material: Copper with PVC/XLPE insulation or Nyvin Cable
• Gauge: 10mm² to 50mm² (depending on current requirements)
• Length: 0.5 to 1 meter typical (custom based on layout)
• Terminal lugs: Crimped or soldered eyelet terminals (M6, M8 size)

**2. Battery Terminal Lugs**
• Types: Flat copper lugs, ring terminals with M6, M8, or M10 holes
• Material: Tin-plated copper or pure copper for corrosion resistance
• Proper sizing critical for reliable connections

**3. Crimping Tool**
• Type: Manual hydraulic or heavy-duty ratchet crimper  
• Die sizes: Must match cable gauge (10mm², 25mm², 50mm², etc.)
• Quality crimping ensures reliable, long-lasting connections

**4. Battery Torque Wrench/Spanner**
• Purpose: Tighten terminals to manufacturer specifications
• Torque range: 5-10 Nm for small batteries, higher for large systems
• Prevents over-tightening that can damage terminals

**5. Safety and Testing Equipment**

| Tool | Purpose | Specifications |
|------|---------|---------------|
| Cable Markers/Sleeves | Identify positive/negative | Red (positive), Black (negative) |
| DC Breakers/Fuses | Safety isolation | Rated for system voltage/current |
| Insulated Gloves | Personal safety | Appropriate voltage rating |
| Multimeter | Testing/troubleshooting | DC voltage and continuity |

**6. Installation Hardware**
• DC breakers or fuses for battery bank isolation
• Battery disconnects for maintenance safety
• Cable management systems for organization
• Ventilation components for battery room safety

**Safety Guidelines**
• Always wear appropriate PPE during installation
• Use insulated tools when working on live systems
• Follow proper lockout/tagout procedures
• Ensure adequate ventilation in battery areas`,
          tags: ["Tools", "Installation", "Safety"],
        },
        {
          id: "battery-rack-sizing",
          question: "Battery Rack Design and Sizing",
          category: "battery",
          difficulty: "advanced",
          readTime: "5 min",
          content: `**Battery Physical Specifications**

| Battery AH | Dimensions (L×W×H) | Weight | Typical Use |
|-----------|-------------------|---------|-------------|
| 7AH | ~150×65×95 mm | ~2.0-2.5 kg | Small UPS systems |
| 18AH | ~180×75×170 mm | ~5.0-6.0 kg | Desktop UPS |
| 26AH | ~165×175×125 mm | ~8.0-9.0 kg | Small server UPS |
| 42AH | ~197×165×170 mm | ~13-14.5 kg | Medium UPS systems |
| 65AH | ~260×170×180 mm | ~20-24 kg | Large office UPS |
| 100AH | ~330×170×220 mm | ~30-35 kg | Industrial UPS |

**Battery Rack Configuration Options**

| Rack Type | Capacity | Approximate Size | Best For |
|-----------|----------|-----------------|----------|
| 2-tier rack | 4×12V (48V string) | 700×500×500 mm | Small setups |
| 4-tier rack | 8×12V (96V string) | 800×500×1000 mm | Mid-size UPS |
| 2-row parallel | 16×12V (192V) | 1200×800×1200 mm | High runtime systems |
| Custom welded | 24+ batteries | Modular design | Data centers |

**Critical Design Factors**

**Space Requirements**
• Number of batteries and their physical dimensions
• Weight capacity of floor and rack structure
• Ventilation space (minimum 10-15 cm gap recommended)
• Maintenance access (front access essential for service)

**Safety Considerations**
• Non-conductive coating to prevent electrical hazards
• Adequate ventilation for hydrogen gas dissipation
• Seismic bracing in earthquake-prone areas
• Emergency spill containment for flooded batteries

**Installation Best Practices**

| Requirement | Specification | Purpose |
|-------------|---------------|---------|
| Air Gap | 10-15 cm around batteries | Ventilation and safety |
| Front Access | Clear access path | Maintenance and inspection |
| Non-Conductive Coating | Paint or powder coating | Prevent electrical hazards |
| Ventilation | Adequate airflow | Prevent gas accumulation |
| Load Rating | Support 150% of battery weight | Safety margin |

**Environmental Considerations**
• Temperature control for optimal battery performance
• Humidity control to prevent corrosion
• Protection from direct sunlight and heat sources
• Easy access for monitoring and maintenance
• Compliance with local electrical and building codes`,
          tags: ["Rack Design", "Installation", "Safety"],
        },
      ],
    },
  ];

  // Filter and search functionality
  const filteredData = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (section) => section.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered
        .map((section) => ({
          ...section,
          questions: section.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )
          ),
        }))
        .filter((section) => section.questions.length > 0);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const allQuestions = faqData.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      sectionTitle: section.title,
      sectionId: section.id,
    }))
  );

  const filteredQuestions = useMemo(() => {
    let filtered = allQuestions;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: "all", name: "All Topics", icon: "📚" },
    { id: "maintenance", name: "AMC & Maintenance", icon: "🔧" },
    { id: "sizing", name: "UPS Sizing", icon: "⚡" },
    { id: "battery", name: "Battery Systems", icon: "🔋" },
  ];

  type Difficulty = "beginner" | "intermediate" | "advanced" | string;

  interface DifficultyColorMap {
    [key: string]: string;
  }

  const getDifficultyColor = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  interface ToggleSectionFn {
    (id: string): void;
  }

  const toggleSection: ToggleSectionFn = (id) => {
    setActiveSection(activeSection === id ? null : id);
    setActiveQuestion(null);
  };

  interface ToggleQuestionFn {
    (id: string): void;
  }

  const toggleQuestion: ToggleQuestionFn = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              UPS & Power Solutions FAQ
            </h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technical guide covering UPS sizing, AMC contracts,
              battery selection, and maintenance best practices for reliable
              power backup solutions.
            </p>

            {/* Download PDF Button */}
            <div className="mt-8 mb-8">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/faq.pdf";
                  link.download = "UPS-Power-Solutions-FAQ.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Complete FAQ Guide (PDF)
              </button>
              <p className="text-cyan-100 text-sm mt-2">
                Get the complete technical guide as a downloadable PDF document
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">
                  {faqData.reduce(
                    (acc, section) => acc + section.questions.length,
                    0
                  )}
                </div>
                <div className="text-cyan-100">Expert Answers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{faqData.length}</div>
                <div className="text-cyan-100">Topic Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-cyan-100">Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-cyan-100">Technical Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Controls */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8">
          {/* Animated Search Section */}
          <div className="relative">
            {!searchExpanded ? (
              /* Collapsed Search - Icon Only */
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Search className="w-6 h-6 mr-3 text-cyan-600" />
                    Search Knowledge Base
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {faqData.reduce(
                        (acc, section) => acc + section.questions.length,
                        0
                      )}{" "}
                      Questions
                    </div>
                    <button
                      onClick={() => setSearchExpanded(true)}
                      className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-semibold">Search FAQ</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Expanded Search - Full Width */
              <div className="p-8 bg-gradient-to-r from-cyan-50 via-white to-teal-50 border-b border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Search className="w-6 h-6 mr-3 text-cyan-600" />
                      Search Knowledge Base
                    </h2>
                    <button
                      onClick={() => {
                        setSearchExpanded(false);
                        setSearchQuery("");
                      }}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Animated Search Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
                      <input
                        type="text"
                        placeholder="Search for UPS sizing, battery calculations, AMC details, topology selection..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-12 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 text-gray-700 text-lg shadow-lg bg-white transition-all duration-300 placeholder-gray-400"
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Search Results Info */}
                  {searchQuery && (
                    <div className="flex items-center justify-between bg-white border border-cyan-200 px-6 py-4 rounded-xl shadow-sm">
                      <div className="flex items-center text-cyan-800">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        <span className="font-semibold text-lg">
                          {viewMode === "sections"
                            ? filteredData.reduce(
                                (acc, section) =>
                                  acc + section.questions.length,
                                0
                              )
                            : filteredQuestions.length}
                        </span>
                        <span className="ml-2">results found for</span>
                        <span className="ml-2 font-bold">"{searchQuery}"</span>
                      </div>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Filters Section */}
          <div className="p-8 bg-gray-50/50">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Category Filters */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <Filter className="w-5 h-5 mr-3 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Filter by Category
                  </h3>
                  <div className="ml-auto text-sm text-gray-500">
                    {selectedCategory === "all"
                      ? "All categories"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white border-transparent shadow-xl"
                            : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 shadow-md hover:shadow-lg"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`text-2xl mb-2 ${
                              isActive
                                ? ""
                                : "group-hover:scale-110 transition-transform duration-300"
                            }`}
                          >
                            {category.icon}
                          </div>
                          <div
                            className={`font-bold text-sm ${
                              isActive ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {category.name}
                          </div>
                          {isActive && (
                            <div className="mt-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                              {category.id === "all"
                                ? faqData.reduce(
                                    (acc, section) =>
                                      acc + section.questions.length,
                                    0
                                  )
                                : faqData
                                    .filter(
                                      (section) =>
                                        section.category === category.id
                                    )
                                    .reduce(
                                      (acc, section) =>
                                        acc + section.questions.length,
                                      0
                                    )}{" "}
                              questions
                            </div>
                          )}
                        </div>
                        {isActive && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-4 h-4 text-cyan-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                <div className="flex items-center mb-6">
                  <Grid className="w-5 h-5 mr-3 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-800">View Mode</h3>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setViewMode("sections")}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                      viewMode === "sections"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <Grid className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-bold">Sections View</div>
                        <div
                          className={`text-sm ${
                            viewMode === "sections"
                              ? "text-purple-100"
                              : "text-gray-500"
                          }`}
                        >
                          Organized by topics
                        </div>
                      </div>
                    </div>
                    {viewMode === "sections" && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setViewMode("all")}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                      viewMode === "all"
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <List className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-bold">All Questions</div>
                        <div
                          className={`text-sm ${
                            viewMode === "all"
                              ? "text-indigo-100"
                              : "text-gray-500"
                          }`}
                        >
                          Flat list view
                        </div>
                      </div>
                    </div>
                    {viewMode === "all" && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === "sections" ? (
          /* Sections View */
          <div className="space-y-8">
            {filteredData.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-8 text-left bg-gradient-to-r ${section.color} text-white hover:opacity-90 transition-all duration-300 flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{section.title}</h2>
                      <p className="text-white/80 mt-2">
                        {section.description}
                      </p>
                      <div className="text-white/70 text-sm mt-2">
                        {section.questions.length} questions • Click to expand
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full">
                    {activeSection === section.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                {/* Questions */}
                {activeSection === section.id && (
                  <div className="divide-y divide-gray-100">
                    {section.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="border-l-4 border-cyan-400"
                      >
                        <button
                          onClick={() => toggleQuestion(question.id)}
                          className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold min-w-fit">
                              Q{index + 1}
                            </span>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800 text-left group-hover:text-cyan-600 transition-colors">
                                {question.question}
                              </h3>
                              {/* Question Meta */}
                              <div className="flex items-center gap-4 mt-2">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                                    question.difficulty
                                  )}`}
                                >
                                  {question.difficulty}
                                </span>
                                <span className="text-gray-500 text-sm flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {question.readTime}
                                </span>
                                <div className="flex gap-1">
                                  {question.tags.slice(0, 2).map((tag, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {activeQuestion === question.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </button>

                        {/* Answer */}
                        {activeQuestion === question.id && (
                          <div className="px-6 pb-6 ml-16">
                            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 border-l-4 border-cyan-400">
                              <div className="prose prose-lg max-w-none">
                                {parseMarkdown(question.content)}
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
        ) : (
          /* All Questions View */
          <div className="grid gap-6">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-medium rounded-full">
                          {question.sectionTitle}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {question.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {question.question}
                      </h3>
                      <div className="flex gap-2">
                        {question.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4">
                      {activeQuestion === question.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>

                {activeQuestion === question.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 mt-4">
                      <div className="prose prose-lg max-w-none">
                        {parseMarkdown(question.content)}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                        <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <div className="ml-auto text-sm text-gray-500">
                          Was this helpful?
                          <button className="ml-2 text-cyan-600 hover:text-cyan-700">
                            Yes
                          </button>
                          <button className="ml-1 text-gray-400 hover:text-gray-600">
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {((viewMode === "sections" && filteredData.length === 0) ||
          (viewMode === "all" && filteredQuestions.length === 0)) && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl shadow-xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-cyan-100 mb-8 text-lg max-w-2xl mx-auto">
              Our technical experts are here to help you find the perfect power
              solution for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  window.location.href = "contact?tab=quote";
                }}
                className="bg-white text-cyan-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                Get Expert Consultation
              </button>
              <div className="flex items-center space-x-6 text-cyan-100">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">7439031293</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">smartline.ecom@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
