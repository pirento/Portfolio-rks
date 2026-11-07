import { link } from './site'

// Main roles, from the resume and company records. `link` only where a real public site exists.
export const experience = [
  {
    id: 'venturecore',
    name: 'Venturecore Solutions · Pirento',
    role: 'Founder & Director',
    period: 'August 2023 – Present',
    visual: 'orbit',
    description:
      'Incorporated on 25 August 2023 in Basti. I am building Pirento, a multi-business ecosystem spanning compliance services, fintech, sustainability and AI, recognised by DPIIT under Startup India in January 2025.',
    highlights: [
      'Became a Vakilsearch (Zolvit) business partner in October 2024 and onboarded 10+ corporate clients.',
      'Delivered 100+ GST registration and compliance engagements, contributing more than ₹10 lakh in early revenue.',
      'Managed a 10+ person cross-functional team across product, operations and strategy.',
      'Built Pirento INV, the invoicing and accounting system used across Venturecore and partner ventures.',
      'Led product design evaluation across UI/UX, usability and functionality, and used AI to speed up content, design and research.',
      'Managed trademark classification and brand and legal campaign work for Pirento and GIFTOX.',
    ],
    tags: ['Startup scaling', 'Partnerships', 'GST & compliance', 'Team leadership', 'Product evaluation', 'AI workflows'],
    link: link.website,
    linkLabel: 'Visit pirento.com',
  },
  {
    id: 'shrisarraf',
    name: 'Shri Sarraf',
    role: 'Co-Founder',
    period: 'Launching at shrisarraf.com',
    visual: 'web',
    description:
      'An online jewellery and fashion brand I am building with my brother, under the line “Crafting Timeless Elegance”. The store is being prepared for launch at shrisarraf.com.',
    highlights: [
      'Co-founded the brand with my brother.',
      'Defined the store policies, including 7-day replacement and prepaid-only orders.',
      'Invoices and payments run on Pirento INV under the Shri Sarraf brand.',
      'Brief and review the website build with our development partner ahead of launch.',
    ],
    tags: ['E-commerce', 'Brand building', 'Jewellery retail', 'Store operations'],
    link: 'https://shrisarraf.com',
    linkLabel: 'Visit shrisarraf.com',
  },
  {
    id: 'jewellers',
    name: 'Shri Sanjay Jewellers',
    role: 'Co-Owner & Retail Manager',
    period: '2023 – Present',
    visual: 'gem',
    description:
      'Our family jewellery business in Basti. I run day-to-day retail alongside my other ventures and helped prepare it to become a formally registered company.',
    highlights: [
      'Co-manage daily retail operations, inventory and customer relationships.',
      'Drive local sales and keep customer service standards high.',
      'Supported business restructuring, documentation and operational planning for formal company registration.',
    ],
    tags: ['Retail operations', 'Inventory', 'Customer relationships', 'Business restructuring'],
    link: null,
  },
  {
    id: 'traders',
    name: 'Pirento Traders',
    role: 'Founder & Partner',
    period: '2023 – Present',
    visual: 'tender',
    description:
      'A partnership firm I co-founded in 2023 for government tender work: finding the right tenders, preparing complete bids and tracking every deadline, on clear and compliant processes.',
    highlights: [
      'Bid on government tenders through the GeM portal, state e-tender portals and direct department tenders.',
      'Cover supply contracts, civil and construction works, and service and manpower contracts.',
      'Handle tender search, eligibility checks, bid documentation, compliance and deadlines end to end.',
    ],
    tags: ['Government tenders', 'GeM portal', 'e-Tendering', 'Bid documentation', 'Compliance', 'Contract management'],
    link: null,
  },
  {
    id: 'pwd',
    name: 'PWD Road Construction Project',
    role: 'Site Coordinator',
    period: 'February 2023 – March 2024',
    visual: 'road',
    description:
      'A government tender-based road construction project valued at ₹12 lakh, coordinated from tender award to completion.',
    highlights: [
      'Coordinated execution of the full project.',
      'Managed site operations, resource allocation, timelines and quality.',
      'Monitored milestones and coordinated with project stakeholders throughout the project.',
    ],
    tags: ['Tender & contract management', 'Project coordination', 'Site operations', 'Quality control'],
    link: null,
  },
]

// Public company record (from incorporation, GST, Udyam and DPIIT certificates).
export const companyFacts = [
  { label: 'Incorporated', value: '25 August 2023', note: 'Private limited company, Uttar Pradesh' },
  { label: 'CIN', value: 'U63121UP2023PTC188021', note: 'Ministry of Corporate Affairs' },
  { label: 'GST', value: 'Registered', note: 'Since October 2023' },
  { label: 'MSME', value: 'Udyam registered', note: 'Micro enterprise, September 2024' },
  { label: 'Partnership', value: 'Vakilsearch (Zolvit)', note: 'Business partner since October 2024' },
  { label: 'Startup India', value: 'DPIIT recognised', note: 'DIPP190348, January 2025' },
]

// The products planned under the Pirento ecosystem.
export const pirentoProducts = [
  { name: 'Pirento Legal', text: 'Registration, IP and compliance', live: true },
  { name: 'Pirento Intern', text: 'Education and internships' },
  { name: 'Pirento Green', text: 'Sustainability' },
  { name: 'Pirento Capital', text: 'Financial facilitation' },
  { name: 'Pirento Vault', text: 'Financial platform' },
  { name: 'Pirento Black', text: 'CA services' },
  { name: 'Pirento One', text: 'One integrated platform' },
  { name: 'Bharat ID', text: 'Digital identity' },
  { name: 'Giftox', text: 'Gifting marketplace' },
  { name: 'Pirento AI', text: 'Artificial intelligence' },
]

// Software I built (from the product guides).
export const products = [
  {
    id: 'inv',
    name: 'Pirento INV',
    kind: 'Venturecore Billing · invoicing, GST & finance',
    visual: 'invoice',
    description:
      'One web app where every business in the group runs its quotations, invoices, payments, GST and finance, each with its own data, branding, email and payment gateway.',
    users: 'A T Elevator, Inzario Space, Shri Sarraf, Pirento Legal, Pirento Ecosystem and AT Facility',
    features: [
      'Quotations, tax invoices, proforma invoices and delivery challans',
      'Online payments via Razorpay or Cashfree, EMI plans and automatic reminders',
      'GSTR-1 export, GSTR-2B matching, e-invoice and e-way bill files',
      'Group finance dashboard with bank-statement matching and AI suggestions',
      'Role-based logins for staff, owners and finance, with two-step security',
    ],
    tags: ['GST', 'Razorpay', 'Cashfree', 'MongoDB', 'OpenAI'],
  },
  {
    id: 'blank',
    name: 'Pirento Blank',
    kind: 'Trading journal & planning tool',
    visual: 'journal',
    description:
      'A private trading journal and planning tool for NSE and BSE traders. It works out real P&L after charges and helps traders plan, control risk and learn from every trade. It does not give investment advice.',
    users: 'Equity, futures and options traders, in English and Hindi',
    features: [
      'Journal, trade book and net P&L after charges',
      'Position-size calculator with risk limits and a daily loss stop',
      'Broker connections: Zerodha, Dhan, Upstox, Fyers and Angel One',
      'AI coach, stock shortlist and pre-market plan',
      'Tax report, backtesting, paper trading and a Telegram bot',
      'Premium at ₹499 a month with a 14-day free trial',
    ],
    tags: ['Broker APIs', 'Razorpay', 'OpenAI', 'Telegram bot', 'Two-step security'],
  },
  {
    id: 'jbc',
    name: 'JBC Seva Trust website',
    kind: 'Donation & seva platform',
    visual: 'seva',
    description:
      'A Hindi and English website for JBC Seva Trust that takes online donations and memberships, sends receipts automatically, and collects medical-help requests and volunteers, with one admin view of every rupee.',
    users: 'Donors, members, patients and families, volunteers and trustees',
    features: [
      'Five programmes: Green Earth, Anand Dham, Kanyadaan, Vidya & Poshan and Community Temple',
      'PayU payments with automatic receipts, certificates and donor accounts',
      '1-year and lifetime membership with renewal reminders',
      'Medical help requests, volunteer sign-up and event registration',
      'Admin dashboard, nightly report PDF and encrypted daily backups',
    ],
    tags: ['PayU', 'MongoDB', 'Hindi & English', 'Encrypted records'],
  },
]

// Other ventures and roles.
export const ventures = [
  {
    name: 'JBC Seva Trust',
    kind: 'Second Trustee',
    text: 'A charitable trust, separate from Venturecore, working on Green Earth, Anand Dham for elders, Kanyadaan, Vidya & Poshan for children, a community temple and medical help. I am the second of its four trustees.',
  },
  {
    name: 'Pirento Foundation',
    kind: 'Social impact',
    text: 'A charitable foundation under Venturecore Solutions, run by its directors, starting with small, documented community activities.',
  },
  {
    name: 'Group collaborations',
    kind: 'A T Elevator · Inzario Space · AT Facility',
    text: 'Businesses in our group that run their quotations, invoices and finance on Pirento INV alongside Venturecore.',
  },
]
