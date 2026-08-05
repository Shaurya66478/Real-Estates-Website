import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

// Helper component to wrap social icons with consistent styling
const Icon = ({ children }) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    className='h-5 w-5'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {children}
  </svg>
)

// Social links data – each includes a label, href, and the SVG icon
const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <Icon>
        <rect x='3' y='3' width='18' height='18' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <path d='M17.5 6.5h.01' />
      </Icon>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <Icon>
        <path d='M22 12s0-3.4-.44-5a2.8 2.8 0 0 0-2-2C17.8 4.5 12 4.5 12 4.5s-5.8 0-7.56.5a2.8 2.8 0 0 0-2 2C2 8.6 2 12 2 12s0 3.4.44 5a2.8 2.8 0 0 0 2 2c1.76.5 7.56.5 7.56.5s5.8 0 7.56-.5a2.8 2.8 0 0 0 2-2c.44-1.6.44-5 .44-5Z' />
        <path d='m10 9 5 3-5 3Z' />
      </Icon>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg aria-hidden='true' viewBox='0 0 24 24' className='h-5 w-5' fill='currentColor'>
        <path d='M17.7 3h3.1l-6.8 7.8L22 21h-6.4l-5-6.5L4.9 21H1.8l7.3-8.3L1.5 3h6.5l4.5 5.9L17.7 3Zm-1.1 16.2h1.7L7.1 4.7H5.3l11.3 14.5Z' />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@shauryaestates.in',
    icon: (
      <Icon>
        <path d='M4 5h16v14H4z' />
        <path d='m4 7 8 6 8-6' />
      </Icon>
    ),
  },
  {
    label: 'Phone',
    href: 'tel:+91 9876543210',
    icon: (
      <Icon>
        <path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z' />
      </Icon>
    ),
  },
  {
    label: 'Location',
    href: 'https://www.google.com/maps/search/?api=1&query=Saharanpur%2C%20India',
    icon: (
      <Icon>
        <path d='M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z' />
        <circle cx='12' cy='10' r='3' />
      </Icon>
    ),
  },
]

const Footer = () => {
  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer}
      className='bg-gray-900 px-6 py-8 text-gray-400 md:px-20 lg:px-32'
    >
      <div className='container mx-auto flex flex-col justify-between gap-6 md:flex-row md:items-center'>
        {/* Brand and description */}
        <motion.div variants={fadeUp}>
          <a href='#Header' className='text-xl font-bold text-white outline-none hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300'>
            Shaurya Real-Estates
          </a>
          <p className='mt-2 max-w-md text-sm'>
            Premium property guidance for buyers looking for modern homes in
            strong locations.
          </p>
        </motion.div>

        {/* Social links – each opens in a new tab if it's an external link */}
        <motion.div variants={fadeUp} className='flex flex-wrap gap-3'>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className='grid h-10 w-10 place-items-center rounded-full border border-gray-700 text-gray-300 outline-none hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300'
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Copyright notice */}
      <motion.p variants={fadeUp} className='container mx-auto mt-8 border-t border-gray-800 pt-5 text-center text-sm'>
        Copyright 2026 (c) Shaurya Real-Estates. All rights reserved.
      </motion.p>
    </motion.footer>
  )
}

export default Footer