import {
  Briefcase,
  ShieldCheck,
  Lightbulb,
  Languages,
  GraduationCap,
  Target,
  Mic,
  Scale,
  BookOpen,
  HeartHandshake,
  Landmark,
  Plane,
} from 'lucide-react'

export const stats = [
  { value: '100+', label: 'GST registration and compliance engagements delivered' },
  { value: '₹10L+', label: 'early revenue through corporate partnerships' },
  { value: '10+', label: 'corporate clients onboarded with Vakilsearch' },
  { value: '10+', label: 'team members across product, operations and strategy' },
]

export const skills = [
  {
    title: 'Business & Strategy',
    icon: Briefcase,
    items: ['Strategic planning', 'Business development', 'Market analysis', 'Startup scaling', 'Partnership development', 'Brand development'],
  },
  {
    title: 'Operations & Compliance',
    icon: ShieldCheck,
    items: ['Legal & regulatory compliance', 'GST registration & filing', 'Retail operations', 'Project coordination', 'Tender & contract management'],
  },
  {
    title: 'Product & Technology',
    icon: Lightbulb,
    items: ['Product design evaluation & UX', 'AI prompt engineering', 'AI-assisted development', 'Fintech strategy', 'Legal-tech ecosystems', 'Innovation management'],
  },
  { title: 'Languages', icon: Languages, items: ['Hindi — native', 'English — working proficiency'] },
]

// status: done | now | next — future plans are never shown as completed.
export const journey = [
  {
    year: 'Feb 2023',
    status: 'done',
    title: 'Site Coordinator, PWD road project',
    text: 'Coordinated a ₹12 lakh government tender-based road construction project through to March 2024.',
  },
  {
    year: 'Aug 2023',
    status: 'done',
    title: 'Founded Venturecore Solutions',
    text: 'Incorporated Venturecore Solutions Private Limited on 25 August 2023, joined the family jewellery business and began my B.Com at Siddharth University.',
  },
  {
    year: 'Oct 2024',
    status: 'done',
    title: 'Vakilsearch business partner',
    text: 'Partnered with Vakilsearch (Zolvit) to onboard corporate clients for GST registration and compliance services.',
  },
  {
    year: 'Jan 2025',
    status: 'done',
    title: 'Startup India recognition',
    text: 'Venturecore Solutions received the DPIIT Startup Recognition Certificate.',
  },
  {
    year: '2026',
    status: 'now',
    title: 'B.Com completed, MBA underway',
    text: 'Completed my B.Com in July 2026 and started an MBA at Chandigarh University in August 2026, while running Venturecore, building Pirento INV, Pirento Blank and the JBC Seva Trust website, and preparing Shri Sarraf for launch.',
  },
  { year: 'Next', status: 'next', title: 'Law degree', text: 'The next education stage, once the MBA and Venturecore operations can support it.' },
  { year: 'Later', status: 'next', title: 'PhD in Canada', text: 'A longer-term academic goal, built on strong academics and an international-ready profile.' },
]

// The priority order I follow. A real sequence: each step comes before the next.
export const priorities = [
  { title: 'Personal base', tag: 'Non-negotiable', text: 'MBA progress, health, daily English and public-speaking practice, weekly planning and disciplined routines.' },
  { title: 'Company foundation', tag: 'Build once', text: 'Venturecore records, roles, finance visibility, policies, documents, priorities and a clear decision process.' },
  { title: 'One product win', tag: 'Prove value', text: 'Choose the strongest Pirento product or service booking flow, finish it and validate it with real users.' },
  { title: 'Repeatable income', tag: 'Reduce pressure', text: 'Clear, compliant tender processes through Pirento Traders, and every income stream documented in Pirento INV and kept separate.' },
  { title: 'Portfolio expansion', tag: 'Only after proof', text: 'Move the next Pirento products forward one by one, using the same operating system.' },
  { title: 'Social and public work', tag: 'Build trust over time', text: 'Strengthen Pirento Foundation and community service through small, documented activities.' },
]

export const scoreboard = [
  { title: 'Education', text: 'MBA progress against the monthly plan' },
  { title: 'Execution', text: 'One key Pirento milestone completed' },
  { title: 'Revenue', text: 'Documented income and cash flow' },
  { title: 'Communication', text: 'English and speaking practice sessions' },
  { title: 'Impact', text: 'One useful action for people' },
]

export const focus = [
  { icon: GraduationCap, title: 'MBA', text: 'My current priority: complete it while building discipline and a strong business foundation.' },
  { icon: Target, title: 'One Pirento product win', text: 'Finish and validate the strongest Pirento product or service flow with real users.' },
  { icon: Mic, title: 'Communication', text: 'Daily English conversation and public-speaking practice for confident leadership.' },
  { icon: Scale, title: 'Law degree', text: 'The next education stage, when the MBA and Venturecore operations can support it.' },
  { icon: BookOpen, title: 'PhD in Canada', text: 'A later academic ambition, prepared through academics, research interest and savings.' },
  { icon: HeartHandshake, title: 'Pirento Foundation', text: 'A social legacy that starts with small, documented community activities.' },
  { icon: Landmark, title: 'Public service', text: 'Serving people through credible public leadership, earned through ethical business and community work.' },
  { icon: Plane, title: 'World travel', text: 'Learning from different places and bringing that perspective back to business and service.' },
]

export const interests = ['Entrepreneurship', 'Legal-tech & compliance', 'Fintech', 'Sustainability', 'AI in business', 'Public service']
