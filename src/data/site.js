// Single source of truth for personal details and links.

export const site = {
  name: 'Ravikant Soni',
  firstName: 'Ravikant',
  initials: 'RS',
  role: 'Founder & Director',
  company: 'Venturecore Solutions Private Limited',
  email: 'ravikantsoniceo@gmail.com',
  phone: '+91 99885 59796',
  location: 'Basti, Uttar Pradesh, India',
}

export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ravikant-soni-86a9b026b' },
  { id: 'website', label: 'Pirento', href: 'https://pirento.com' },
  { id: 'email', label: 'Email', href: `mailto:${site.email}` },
]

export const link = Object.fromEntries(socials.map((s) => [s.id, s.href]))
link.phone = `tel:${site.phone.replace(/\s/g, '')}`

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Experience' },
  { id: 'products', label: 'Products' },
  { id: 'skills', label: 'Expertise' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
