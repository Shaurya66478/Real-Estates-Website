import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import Navbar from './Navbar'
import { fadeUp, staggerContainer, subtleScale, viewportOnce } from '../utils/motion'

// Stats shown in the hero section – hardcoded data for quick changes
const stats = [
  { value: '120+', label: 'Happy Families' },
  { value: '18', label: 'Curated Projects' },
  { value: '5', label: 'Prime Cities' },
]

const Header = () => {
  return (
    // Full-viewport hero with a fixed id for navigation
    <div
      id='Header'
      className='relative min-h-screen overflow-hidden text-white'
    >
      {/* Background image – using <picture> for responsive AVIF/WebP formats */}
      {/* This image loads eagerly because it's the Largest Contentful Paint (LCP) */}
      <picture className='absolute inset-0'>
        <source
          srcSet={`${assets.hero_960_avif} 960w, ${assets.hero_1600_avif} 1600w`}
          sizes='100vw'
          type='image/avif'
        />
        <source
          srcSet={`${assets.hero_960_webp} 960w, ${assets.hero_1600_webp} 1600w`}
          sizes='100vw'
          type='image/webp'
        />
        <img
          src={assets.hero_1600_webp}
          alt='' // decorative image – empty alt is fine
          width='1600'
          height='1067'
          loading='eager'
          fetchpriority='high'
          decoding='async'
          className='h-full min-h-screen w-full object-cover object-center'
        />
      </picture>
      {/* Dark overlay to make text readable */}
      <div className='absolute inset-0 bg-black/60'></div>

      {/* Navbar sits on top of the hero */}
      <Navbar />

      {/* Hero content – animations play when this section enters the viewport */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        variants={staggerContainer} // children appear one after another
        viewport={viewportOnce} // animate only once
        className='relative z-10 container mx-auto flex min-h-screen items-center px-6 pt-24 md:px-20 lg:px-32'
      >
        <div className='max-w-3xl'>
          <motion.p variants={fadeUp} className='mb-4 inline-block rounded bg-white/10 px-4 py-2 text-sm font-medium tracking-wide backdrop-blur'>
            Premium Real Estate Advisory
          </motion.p>

          <motion.h1 variants={fadeUp} className='text-4xl font-bold leading-tight sm:text-6xl md:text-7xl'>
            Find a home that fits your life beautifully
          </motion.h1>

          <motion.p variants={fadeUp} className='mt-6 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg'>
            Explore handpicked apartments, villas, and family homes with clear
            details, honest guidance, and a smooth buying experience from first
            visit to final decision.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div variants={fadeUp} className='mt-10 flex flex-col gap-4 sm:flex-row'>
            <a href='#Projects' className='rounded bg-amber-400 px-8 py-3 text-center font-semibold text-gray-950 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300'>
              View Properties
            </a>
            <a href='#Contact' className='rounded border border-white/70 px-8 py-3 text-center font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'>
              Book Visit
            </a>
          </motion.div>

          {/* Stats – each appears with a subtle scale animation */}
          <motion.div variants={staggerContainer} className='mt-12 grid max-w-xl grid-cols-3 gap-3 text-center'>
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={subtleScale} className='rounded bg-white/10 p-4 backdrop-blur'>
                <p className='text-2xl font-bold'>{stat.value}</p>
                <p className='text-xs text-gray-200'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Header