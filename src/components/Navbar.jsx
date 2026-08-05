import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

// Navigation links – id matches the section id in the page
const navLinks = [
  { name: 'Home', path: '#Header', id: 'Header' },
  { name: 'About', path: '#About', id: 'About' },
  { name: 'Projects', path: '#Projects', id: 'Projects' },
  { name: 'Reviews', path: '#Testimonials', id: 'Testimonials' },
]

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('Header')
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect when the user scrolls past 48px – to change navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48)

    handleScroll() // set initial state
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use IntersectionObserver to detect which section is currently in view
  // and update activeSection accordingly.
  useEffect(() => {
    // Collect all section IDs from navLinks plus Contact (which is not in nav)
    const sectionIds = [...navLinks.map((link) => link.id), 'Contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio (most visible)
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px', // adjust when section is considered "active"
        threshold: [0.18, 0.35, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Prevent scrolling on the body when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showMobileMenu])

  // Allow Escape key to close the mobile menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowMobileMenu(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Smooth scroll to the target and close mobile menu
  const handleNavClick = (event, path) => {
    event.preventDefault()
    document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' })
    setShowMobileMenu(false)
  }

  // Build class names for desktop nav links based on active section and scroll state
  const desktopLinkClasses = (id) => {
    const isActive = activeSection === id
    const activeColor = isScrolled ? 'text-emerald-700' : 'text-amber-300'
    const inactiveColor = isScrolled ? 'text-gray-800 hover:text-emerald-700' : 'text-white/90 hover:text-amber-300'

    return `relative py-2 outline-none transition ${isActive ? activeColor : inactiveColor} focus-visible:text-amber-300`
  }

  return (
    <div
      className={`fixed left-0 top-0 z-40 w-full transition duration-300 ${
        isScrolled ? 'bg-white/85 shadow-lg shadow-gray-950/10 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-6 transition-all duration-300 md:px-20 lg:px-32 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Brand / Logo – also scrolls to top */}
        <a
          href='#Header'
          onClick={(event) => handleNavClick(event, '#Header')}
          className={`text-2xl font-bold tracking-wide outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 ${
            isScrolled ? 'text-gray-950' : 'text-white'
          }`}
        >
          Shaurya Real-Estates
        </a>

        {/* Desktop navigation */}
        <ul className='hidden items-center gap-8 text-sm font-medium md:flex'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                onClick={(event) => handleNavClick(event, link.path)}
                className={desktopLinkClasses(link.id)}
              >
                {link.name}
                {/* Animated underline for active section */}
                {activeSection === link.id ? (
                  <motion.span
                    layoutId='active-nav-underline'
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full ${
                      isScrolled ? 'bg-emerald-700' : 'bg-amber-300'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        {/* "Hire Me" button (desktop) – scrolls to Contact */}
        <a
          href='#Contact'
          onClick={(event) => handleNavClick(event, '#Contact')}
          className={`hidden rounded px-6 py-2 text-sm font-semibold shadow-sm outline-none transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 md:block ${
            isScrolled ? 'bg-gray-950 text-white hover:bg-emerald-700' : 'bg-white text-gray-900 hover:bg-amber-300'
          }`}
        >
          Hire Me
        </a>

        {/* Mobile menu toggle button */}
        <button
          type='button'
          onClick={() => setShowMobileMenu(true)}
          className='rounded p-1 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 md:hidden'
          aria-label='Open menu'
          aria-expanded={showMobileMenu}
        >
          <img src={assets.menu_icon} className='w-7' alt='' />
        </button>
      </div>

      {/* Overlay behind mobile menu (closes on click) */}
      <div
        className={`fixed inset-0 z-30 bg-gray-950/40 backdrop-blur-sm transition duration-300 md:hidden ${
          showMobileMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setShowMobileMenu(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed bottom-0 right-0 top-0 z-40 w-80 max-w-full bg-white shadow-2xl transition duration-300 md:hidden ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end p-6'>
          <button
            type='button'
            onClick={() => setShowMobileMenu(false)}
            className='rounded p-1 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700'
            aria-label='Close menu'
          >
            <img src={assets.cross_icon} className='w-6' alt='' />
          </button>
        </div>

        <ul className='mt-8 flex flex-col items-center gap-4 text-lg font-medium text-gray-800'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                onClick={(event) => handleNavClick(event, link.path)}
                href={link.path}
                className={`rounded px-5 py-2 outline-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${
                  activeSection === link.id ? 'bg-emerald-50 text-emerald-700' : ''
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={(event) => handleNavClick(event, '#Contact')}
              href='#Contact'
              className='rounded bg-gray-900 px-6 py-3 text-white outline-none hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700'
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar