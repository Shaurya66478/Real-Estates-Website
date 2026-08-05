import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollExperience = () => {
  // Framer Motion's useScroll gives a value between 0 and 1 as user scrolls
  const { scrollYProgress } = useScroll()
  // Apply spring physics to make the progress bar smooth
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  // Show the back-to-top button only after scrolling past the hero section
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress bar at the top of the page */}
      <motion.div
        className='fixed left-0 top-0 z-50 h-1 w-full origin-left bg-amber-400'
        style={{ scaleX }}
      />

      {/* Back-to-top button */}
      <button
        type='button'
        onClick={scrollToTop}
        aria-label='Back to top'
        className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-gray-950 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <span aria-hidden='true'>&uarr;</span>
      </button>
    </>
  )
}

export default ScrollExperience