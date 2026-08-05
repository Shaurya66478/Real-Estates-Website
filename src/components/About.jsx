import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { fadeUp, staggerContainer, subtleScale, viewportOnce } from '../utils/motion'

// Stats displayed in the About section
const stats = [
  { number: '8+', label: 'Years of trust' },
  { number: '18+', label: 'Projects listed' },
  { number: '120+', label: 'Families guided' },
  { number: '5', label: 'Prime locations' },
]

const About = () => {
  return (
    <motion.section
      id='About'
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer}
      className='container mx-auto px-6 py-20 md:px-20 lg:px-32'
    >
      {/* Section heading – animated with fadeUp */}
      <motion.div variants={fadeUp} className='mx-auto mb-12 max-w-2xl text-center'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700'>
          About us
        </p>
        <h2 className='text-3xl font-bold text-gray-950 sm:text-4xl'>
          Helping people choose homes with confidence
        </h2>
        <p className='mt-4 text-gray-600'>
          Shaurya Real-Estates brings carefully selected properties, transparent
          information, and personal support for buyers who want a better home
          search.
        </p>
      </motion.div>

      {/* Two-column layout: image + text & stats */}
      <div className='grid items-center gap-12 lg:grid-cols-2'>
        <motion.img
          variants={fadeUp}
          src={assets.brand_img}
          alt='Modern real estate building'
          loading='lazy'
          decoding='async'
          className='h-full w-full rounded-lg object-cover shadow-xl'
        />

        <motion.div variants={fadeUp}>
          {/* Stats grid – each stat appears with subtleScale */}
          <motion.div variants={staggerContainer} className='grid grid-cols-2 gap-4'>
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={subtleScale} className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
                <p className='text-2xl font-bold text-gray-950'>{stat.number}</p>
                <p className='mt-1 text-sm text-gray-500'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Description and a CTA link to the projects section */}
          <p className='mt-8 leading-7 text-gray-600'>
            We focus on properties that offer good design, strong locations,
            practical layouts, and long-term value. Our team helps buyers
            compare options clearly before booking a site visit.
          </p>

          <a href='#Projects' className='mt-8 inline-block rounded bg-gray-950 px-7 py-3 font-semibold text-white hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700'>
            Explore Properties
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About