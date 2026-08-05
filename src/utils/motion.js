// Shared Framer Motion settings used across multiple sections

// Only trigger animations once when the section first appears
export const viewportOnce = {
  once: true,
  amount: 0.18, // section must be at least 18% visible before animating
}

// A simple fade-up animation – element fades in and moves up slightly
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// Used on containers – children appear one after another with a delay
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11, // each child starts 0.11s after the previous
      delayChildren: 0.08, // wait 0.08s before the first child animates
    },
  },
}

// A subtle scale effect – used for cards and stat boxes
export const subtleScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}