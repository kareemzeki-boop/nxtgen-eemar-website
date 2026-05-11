// ================================================================
//  NXTGEN — Site Content
//  Edit THIS FILE to update any text, image, link, or number
//  on the website. No need to touch any other file.
// ================================================================

// ----------------------------------------------------------------
// COMPANY INFO
// Used in: Navbar, Footer, Contact
// ----------------------------------------------------------------
export const company = {
  name: "NXTGEN",
  taglineBy: "by Eemar Al Madina",
  email: "kareem@cladwise.ae",
  phone: "+971 6 XXX XXXX",
  phoneHours: "Sun-Thu, 8am-6pm GST",
  address: "Sharjah Industrial District 17, UAE",
  certification: "ISO 9001 Certified",
  copyright: "© 2025 Eemar Al Madina LLC. All rights reserved. · Sharjah, UAE",
};

// ----------------------------------------------------------------
// NAVIGATION LINKS
// Used in: Navbar (desktop + mobile), Footer
// ----------------------------------------------------------------
export const navLinks = [
  { label: "Services",    href: "#services" },
  { label: "Innovations", href: "#innovations" },
  { label: "Process",     href: "#process" },
  { label: "Pricing",     href: "#pricing" },
  { label: "Contact",     href: "#contact" },
];

// ----------------------------------------------------------------
// HERO SECTION
// Used in: Hero.tsx
// backgroundImage: swap URL for a different facade photo
// ----------------------------------------------------------------
export const hero = {
  badge: "Trusted across the GCC · 80+ Projects Delivered",
  headlinePart1: "We Engineer",
  headlinePart2: "Living Facades",
  headlinePart3: "For The Middle East",
  subheadline:
    "Precision-manufactured architectural cladding systems built for extreme climates, iconic structures, and generational durability. From Sharjah to the entire GCC.",
  materials: ["GFRC", "GFRP", "UHPC", "LTGRC", "GFRG"],
  ctaPrimary:   { label: "Start Your Project",  href: "#contact" },
  ctaSecondary: { label: "Explore Materials",   href: "#services" },
  stats: [
    { num: "80+",  label: "Projects Delivered" },
    { num: "15+",  label: "Years Experience"   },
    { num: "6",    label: "GCC Countries"      },
    { num: "100%", label: "Custom Engineered"  },
  ],
  // Full-bleed background photo (Unsplash — geometric facade, Osaka)
  backgroundImage:
    "https://images.unsplash.com/photo-1772232141617-a19025ad997e?auto=format&fit=crop&w=1920&q=85",
};

// ----------------------------------------------------------------
// SERVICES / MATERIALS
// Used in: Services.tsx
// accentColor controls the highlight colour for each material card.
// image: replace the URL with any other facade photo.
// ----------------------------------------------------------------
export const services = [
  {
    id: "gfrc",
    number: "01",
    title: "GFRC",
    full: "Glass Fibre Reinforced Concrete",
    tagline: "Lightweight concrete cladding with infinite form freedom",
    description:
      "GFRC delivers the aesthetic gravitas of concrete at a fraction of the weight, enabling complex curves, textures, and large-format panels impossible with traditional precast. Ideal for decorative facades, column covers, and architectural feature elements.",
    features: [
      "Custom mix designs for GCC climates",
      "Panel sizes up to 8m x 3m",
      "Weight: 16-22 kg/m2 (vs 400+ kg for precast)",
      "Integral color or painted finishes",
      "ASTM C1658 / EN 14649 compliant",
    ],
    quote:
      "NXTGEN's GFRC panels transformed our tower facade — the texture consistency across 4,200 units was flawless.",
    quoteBy: "Lead Architect, Dubai Iconic Tower Project",
    accentColor: "#6366f1",
    image:    "https://images.unsplash.com/photo-1774023451593-22c266c72fa7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Concrete building facade with rows of windows — GFRC architectural cladding",
  },
  {
    id: "gfrp",
    number: "02",
    title: "GFRP",
    full: "Glass Fibre Reinforced Polymer",
    tagline: "Corrosion-free cladding engineered for coastal environments",
    description:
      "Where salt-laden air and extreme humidity demand zero-compromise durability, GFRP delivers structural cladding panels with no corrosion risk, negligible maintenance cycles, and exceptional strength-to-weight ratios.",
    features: [
      "Saltwater & UV resistant by design",
      "Tensile strength >250 MPa",
      "Gel-coat or painted surface systems",
      "Fire rated options available (Class A)",
      "Ideal for marine, coastal & industrial facades",
    ],
    quote:
      "Six years on a waterfront development in Abu Dhabi — zero degradation, zero maintenance calls.",
    quoteBy: "Project Manager, Abu Dhabi Waterfront Development",
    accentColor: "#8b5cf6",
    image:    "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern building with undulating composite facade panels — GFRP cladding system",
  },
  {
    id: "uhpc",
    number: "03",
    title: "UHPC",
    full: "Ultra High Performance Concrete",
    tagline: "Structural-grade cladding with ultra-thin profiles",
    description:
      "UHPC pushes the boundaries of what concrete can be. With compressive strength exceeding 150 MPa, panels as thin as 15mm carry structural loads, span wide bays, and project the refined precision architects demand for landmark projects.",
    features: [
      "Compressive strength: 150-200 MPa",
      "Panel thickness: 15-30 mm",
      "Self-compacting, self-curing mixes",
      "Smooth, architectural-grade surface",
      "Structural facade engineering support included",
    ],
    quote:
      "We specified UHPC for the cantilevered brise-soleil blades — NXTGEN delivered tolerances we didn't think possible in the region.",
    quoteBy: "Structural Engineer, Riyadh Cultural Centre",
    accentColor: "#06b6d4",
    image:    "https://images.unsplash.com/photo-1522743791393-522312deeebf?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Monolithic grey concrete architecture — representative of UHPC ultra-dense cladding",
  },
  {
    id: "ltgrc",
    number: "04",
    title: "Veloce LTGRC",
    full: "Light-Transmitting Glass Reinforced Concrete",
    tagline: "Where concrete becomes a luminous canvas",
    description:
      "Veloce LTGRC is our proprietary innovation: a translucent concrete system embedding optical-grade fibres that carry natural or artificial light through solid panels. Perfect for statement facades, lobby walls, and illuminated signage elements.",
    features: [
      "Up to 4% light transmittance",
      "Optical fibre density: 3-15 fibres/cm2",
      "Backlit or front-lit configurations",
      "Available in 6 base aggregates",
      "Proprietary Veloce fibre-lay process",
    ],
    quote:
      "The Veloce LTGRC entrance wall is the most photographed element in our entire campus — it glows at dusk like nothing else.",
    quoteBy: "Design Director, Sharjah Innovation Hub",
    accentColor: "#f59e0b",
    image:    "https://images.unsplash.com/photo-1762689267018-013bf117a1a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern building facade with precise horizontal panel lines — LTGRC light-transmitting system",
  },
  {
    id: "gfrg",
    number: "05",
    title: "GFRG",
    full: "Glass Fibre Reinforced Gypsum",
    tagline: "Precision interior architectural elements at scale",
    description:
      "GFRG is the material of choice for intricate interior cladding, ornamental detailing, column casings, and domed ceilings where fire resistance, crisp detail, and fast installation are paramount.",
    features: [
      "Fire resistance: Class A non-combustible",
      "Dimensional accuracy +/-1mm",
      "Complex profiles & ornamental detail possible",
      "Light: 8-14 kg/m2",
      "Fast-track installation systems available",
    ],
    quote:
      "1,200 GFRG column casings across our hotel — all installed in 14 days. Extraordinary.",
    quoteBy: "Interior Fit-Out Manager, Luxury Hotel, Qatar",
    accentColor: "#10b981",
    image:    "https://images.unsplash.com/photo-1774617780468-2901c66e0dac?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Geometric diamond pattern on architectural facade — GFRG precision cladding detail",
  },
];

// ----------------------------------------------------------------
// INNOVATIONS
// Used in: Innovations.tsx
// Note: the icons (Cpu, Layers3, Leaf, Atom) live in the component.
// The order here must stay in sync with the icons in Innovations.tsx.
// ----------------------------------------------------------------
export const innovations = [
  {
    title: "IoT Smart Panels",
    subtitle: "Facades that sense and respond",
    description:
      "Embedded sensor arrays within GFRC panels monitor structural stress, thermal expansion, moisture ingress, and surface temperature in real time. Live dashboards alert facility managers before defects become costly.",
    tag: "Structural Intelligence",
    color: "#6366f1",
    metric: "24/7",
    metricLabel: "Live Monitoring",
  },
  {
    title: "3D Parametric Elements",
    subtitle: "Computational form, manufactured precision",
    description:
      "We take architect-authored parametric geometries directly from Rhino / Grasshopper and translate them into production-ready moulds. Complex undulating surfaces and algorithmic patterns delivered at 1mm tolerances.",
    tag: "Digital Fabrication",
    color: "#8b5cf6",
    metric: "±1mm",
    metricLabel: "Tolerance Achieved",
  },
  {
    title: "Bio-Hybrid Cladding",
    subtitle: "Panels that support living ecosystems",
    description:
      "Textured GFRC surfaces engineered with micro-retention pockets and embedded nutrient matrices support moss, lichen, and climbing plant systems. LEED credits, reduced heat-island effect, and iconic aesthetics in one system.",
    tag: "Biophilic Design",
    color: "#10b981",
    metric: "LEED",
    metricLabel: "Credit Eligible",
  },
  {
    title: "Nano-Reinforced GFRC",
    subtitle: "Material science at the molecular level",
    description:
      "Carbon nanotube and graphene-oxide admixtures increase tensile strength by up to 60% and dramatically improve crack resistance — enabling thinner, lighter, and longer-spanning GFRC panels than any standard formulation.",
    tag: "Next-Gen Materials",
    color: "#f59e0b",
    metric: "+60%",
    metricLabel: "Tensile Strength",
  },
];

// ----------------------------------------------------------------
// PROCESS
// Used in: Process.tsx
// ----------------------------------------------------------------
export const process = [
  {
    number: "01",
    title: "Diagnose",
    subtitle: "Project assessment & specification",
    duration: "1-2 Weeks",
    description:
      "We embed with your design and engineering team to understand structural loads, facade geometry, substrate conditions, and program constraints. Our engineers produce a Material Suitability Report mapping the optimal cladding system to your project's exact requirements.",
    deliverables: [
      "Material Suitability Report",
      "Facade load analysis",
      "Climate & exposure classification",
      "Preliminary budget schedule",
    ],
    color: "#6366f1",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Engineering drawings & mock-up approval",
    duration: "3-6 Weeks",
    description:
      "Our parametric design team co-creates panel shop drawings, connection details, and thermal/structural calculations. Full-scale mock-ups are produced at our Sharjah facility for architect and client sign-off before production commences.",
    deliverables: [
      "Panel shop drawings (IFC)",
      "Connection & fixing details",
      "Structural & thermal calcs",
      "Full-scale approved mock-up",
    ],
    color: "#8b5cf6",
  },
  {
    number: "03",
    title: "Manufacture",
    subtitle: "Precision production at Sharjah D17",
    duration: "4-16 Weeks",
    description:
      "Our 12,000 m2 factory operates six parallel production lines with CNC-milled moulds, automated spray systems, and inline quality control. Every panel is tagged, inspected, and documented with traceability records before leaving our facility.",
    deliverables: [
      "QC-certified panel batch records",
      "Panel marking & logistics plan",
      "Factory acceptance test report",
      "Packing & shipping schedule",
    ],
    color: "#06b6d4",
  },
  {
    number: "04",
    title: "Install",
    subtitle: "Site installation & commissioning",
    duration: "Project-specific",
    description:
      "Our certified installation crews work directly with your main contractor, following a pre-agreed sequence plan to minimise critical-path impact. All installations are surveyed on completion and supported by a comprehensive 10-year product warranty.",
    deliverables: [
      "Installation method statement",
      "Site survey & as-built record",
      "Snagging & defect resolution",
      "10-year product warranty",
    ],
    color: "#10b981",
  },
];

// ----------------------------------------------------------------
// STATS SECTION
// Used in: Stats.tsx
// statsBarData: years / relative values for the bar chart (max = 100)
// ----------------------------------------------------------------
export const statsNumbers = [
  { value: 80,  suffix: "+",    label: "Projects Delivered", sub: "Across the GCC"         },
  { value: 15,  suffix: "+",    label: "Years of Excellence", sub: "In facade engineering"  },
  { value: 6,   suffix: "",     label: "Countries Served",    sub: "UAE, KSA, Qatar & more" },
  { value: 100, suffix: "K+",   label: "m2 Manufactured",    sub: "Annual capacity"        },
  { value: 98,  suffix: "%",    label: "On-Time Delivery",   sub: "Verified by clients"    },
  { value: 4,   suffix: ".9/5", label: "Client Rating",      sub: "120+ reviews"           },
];

export const statsBarData = [
  { label: "2020", value: 35,  color: "#312e81" },
  { label: "2021", value: 52,  color: "#4338ca" },
  { label: "2022", value: 68,  color: "#4f46e5" },
  { label: "2023", value: 84,  color: "#6366f1" },
  { label: "2024", value: 100, color: "#818cf8" },
];

export const statsCallout = {
  headline:    "Landmark",
  subheadline: "Projects delivered across six GCC nations",
  body:
    "From Expo 2020 pavilion cladding in Dubai to heritage restoration in Diriyah, KSA — our panels grace some of the region's most iconic structures.",
  countries: ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait", "Oman"],
};

// Background photo for the Stats section (concrete monument, Seoul)
export const statsBackgroundImage =
  "https://images.unsplash.com/photo-1569258592171-357ea26da4df?auto=format&fit=crop&w=1920&q=80";

// ----------------------------------------------------------------
// TESTIMONIALS
// Used in: Testimonials.tsx
// initials: 2 letters shown in the avatar circle
// color: avatar background colour
// ----------------------------------------------------------------
export const testimonials = [
  {
    name: "Mohammed Al Rashidi",
    role: "Lead Architect",
    company: "Dar Al-Handasah, Dubai",
    text: "NXTGEN delivered 4,200 GFRC panels for a 52-storey tower in under 14 weeks. Texture and color consistency across every single unit was extraordinary. No other regional manufacturer comes close.",
    rating: 5, initials: "MR", color: "#6366f1",
  },
  {
    name: "Sarah Thompson",
    role: "Project Director",
    company: "Arup, Abu Dhabi",
    text: "Their engineering support during the specification phase was invaluable. The thermal calculations and connection details were submitted before we even asked — and they passed our third-party review without a single comment.",
    rating: 5, initials: "ST", color: "#8b5cf6",
  },
  {
    name: "Khalid Al-Dosari",
    role: "Deputy CEO",
    company: "Gulf Contracting Co., Doha",
    text: "We have used NXTGEN on seven projects. They have never missed a delivery milestone. Their factory tracking system means our procurement team always knows exactly where each batch is in the production queue.",
    rating: 5, initials: "KD", color: "#06b6d4",
  },
  {
    name: "Priya Mehta",
    role: "Interior Design Lead",
    company: "Woods Bagot, Riyadh",
    text: "The GFRG column casings for our hospitality project were manufactured to 0.5mm tolerance. Our installation crew said it was the cleanest fit-out they had ever worked with. NXTGEN is our go-to for ornamental work.",
    rating: 5, initials: "PM", color: "#10b981",
  },
  {
    name: "Faisal Al-Muhairi",
    role: "Head of Construction",
    company: "Emaar Properties, Dubai",
    text: "The IoT smart panel system on our flagship retail development gives us real-time facade health data we had never had before. One alert already saved us from what would have been a very expensive remediation job.",
    rating: 5, initials: "FM", color: "#f59e0b",
  },
  {
    name: "Yuki Tanaka",
    role: "Associate Principal",
    company: "AECOM, Dubai",
    text: "We brought NXTGEN in on a parametric screen project that 3 other manufacturers had already declined as too complex. They solved it in 2 weeks, produced the moulds, and delivered on schedule. Genuinely impressive.",
    rating: 5, initials: "YT", color: "#ec4899",
  },
];

// Summary shown at the top of the Testimonials section
export const testimonialsHeader = {
  avgRating:   "4.9",
  reviewCount: "120+",
};

// ----------------------------------------------------------------
// PRICING
// Used in: Pricing.tsx
// Set highlight: true on whichever plan you want visually featured
// ----------------------------------------------------------------
export const pricing = [
  {
    name: "Specification Support",
    price: "Free",
    per: "",
    badge: "",
    description:
      "For architects and consultants in early design stages who need material guidance and outline specifications.",
    features: [
      "Material suitability consultation (1 hr)",
      "Preliminary facade specification",
      "Indicative budget schedule",
      "Sample panel dispatch",
      "Outline engineering commentary",
    ],
    cta: "Start Consultation",
    ctaHref: "#contact",
    highlight: false,
  },
  {
    name: "Design & Supply",
    price: "Project-based",
    per: "Fixed-price contract",
    badge: "Most Popular",
    description:
      "Full engineering, production, and supply of your cladding system — from mock-up approval through certified delivery.",
    features: [
      "Full shop drawing & engineering package",
      "CNC mould fabrication",
      "Quality-certified panel production",
      "Factory acceptance testing",
      "Logistics & delivery to site",
      "5-year material warranty",
    ],
    cta: "Request a Proposal",
    ctaHref: "#contact",
    highlight: true,
  },
  {
    name: "Full Facade Partnership",
    price: "Custom",
    per: "EPC & Design-Build",
    badge: "",
    description:
      "Turnkey facade solution — design, supply, and certified installation by NXTGEN teams. Single-point accountability.",
    features: [
      "Everything in Design & Supply",
      "NXTGEN installation crew",
      "On-site QC supervision",
      "As-built survey & handover",
      "10-year product warranty",
      "Dedicated project manager",
    ],
    cta: "Enquire Now",
    ctaHref: "#contact",
    highlight: false,
  },
];

// ----------------------------------------------------------------
// FAQ
// Used in: FAQ.tsx
// Add / remove categories and questions freely.
// ----------------------------------------------------------------
export const faqCategories = ["General", "Materials", "Process", "Delivery"];

export const faq: Record<string, { q: string; a: string }[]> = {
  General: [
    {
      q: "What makes NXTGEN different from other cladding manufacturers in the region?",
      a: "We are one of very few regional manufacturers that design, engineer, and produce all five major advanced cladding systems (GFRC, GFRP, UHPC, LTGRC, GFRG) under one roof. Our in-house engineering team, CNC mould shop, and 12,000 m2 Sharjah factory allow us to control quality at every stage.",
    },
    {
      q: "Do you work with international architects and consultants?",
      a: "Absolutely. A large portion of our projects are specified by international practices including firms based in the UK, US, Europe, and Southeast Asia. We are comfortable working within international standards (ASTM, EN, BS) and submitting documentation in formats required by global QA processes.",
    },
    {
      q: "What project scale is your minimum threshold?",
      a: "We work on projects from small bespoke feature elements (50-200 m2) right through to large-scale tower cladding exceeding 20,000 m2. Our modular production lines give us the flexibility to prioritise and parallel-schedule orders of varying sizes without compromising lead times.",
    },
  ],
  Materials: [
    {
      q: "Which material system is best suited for coastal UAE environments?",
      a: "For highly corrosive coastal exposures, GFRP is our primary recommendation - it contains zero metallic reinforcement and is inherently immune to chloride-induced corrosion. GFRC with a marine-grade admixture package is also viable for decorative applications where weight is not a concern.",
    },
    {
      q: "Can GFRC panels achieve fire rating compliance for UAE civil defense?",
      a: "Yes. Our standard GFRC formulations achieve a Class A2-s1-d0 fire classification under EN 13501, and can be tested to UAE FM Global standards where required. We provide third-party fire test certificates for each product formulation.",
    },
    {
      q: "What is the lifespan of your cladding systems in GCC climates?",
      a: "Properly specified and installed, our GFRC, UHPC, and GFRP systems carry a 30+ year design life in GCC climatic conditions. Our standard product warranty is 5 years (Design & Supply) or 10 years (Full Facade Partnership).",
    },
    {
      q: "Can you match an existing texture or aggregate specification?",
      a: "Yes - we maintain a library of over 200 surface matrix types and can reverse-engineer existing finishes from approved samples. We always recommend a full-size mock-up panel be approved before committing to full production.",
    },
  ],
  Process: [
    {
      q: "Do you produce shop drawings, or does that rest with the consultant team?",
      a: "Our in-house engineering team produces complete panel shop drawings, fixing/connection details, and relevant structural calculations as part of our standard Design & Supply scope. All drawing packages are submitted for consultant review and approval before moulds are committed.",
    },
    {
      q: "How are parametric or algorithmically-generated facades handled?",
      a: "We work directly with Rhino/Grasshopper geometry files. Our CNC mould shop translates parametric surface data into milled EPS or timber moulds. Complex geometries that previously required expensive GRP or aluminium tooling can often be delivered in CNC foam at a fraction of the cost.",
    },
    {
      q: "Do you offer factory visits during production?",
      a: "Yes - client and consultant factory visits are actively encouraged, particularly at mock-up approval stage and during batch acceptance testing. Our Sharjah D17 facility is accessible with advance booking. We can also arrange live video factory inspections for international clients.",
    },
  ],
  Delivery: [
    {
      q: "What are your standard lead times for production?",
      a: "Lead times depend on material type, panel complexity, and current production loading. Indicative ranges: GFRC 4-10 weeks, GFRP 6-12 weeks, UHPC 8-14 weeks, GFRG 3-8 weeks. We provide a binding production schedule as part of our contract documentation.",
    },
    {
      q: "Can you deliver outside the UAE?",
      a: "Yes. We regularly deliver to Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman, and have shipped to Egypt and Jordan. We manage all export documentation, material certification, and freight logistics as part of our delivery scope.",
    },
    {
      q: "What happens if panels are damaged in transit or on site?",
      a: "All shipments are covered by marine cargo insurance. In the rare event of transit damage, we prioritise replacement production in our scheduling. Panels damaged on site due to installation errors may be reproduced at cost - this is why we recommend our Full Facade Partnership scope for complex projects.",
    },
  ],
};

// ----------------------------------------------------------------
// FOOTER
// Used in: Footer.tsx
// footerMaterials / footerInnovations: quick-link lists in the footer
// ----------------------------------------------------------------
export const footerNavLinks = [
  { label: "Services",    href: "#services"    },
  { label: "Innovations", href: "#innovations" },
  { label: "Process",     href: "#process"     },
  { label: "Pricing",     href: "#pricing"     },
  { label: "FAQ",         href: "#faq"         },
  { label: "Contact",     href: "#contact"     },
];

export const footerMaterials    = ["GFRC", "GFRP", "UHPC", "Veloce LTGRC", "GFRG"];
export const footerInnovations  = ["IoT Smart Panels", "3D Parametric", "Bio-Hybrid Cladding", "Nano-Reinforced GFRC"];
