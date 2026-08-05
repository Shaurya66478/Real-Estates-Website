import { motion } from 'framer-motion'
import { assets, testimonialsData } from '../assets/assets'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

const Testimonials = () => {
  return (
    <motion.section
      id='Testimonials'
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer}
      className='container mx-auto px-6 py-20 md:px-20 lg:px-32'
    >
      {/* Section heading */}
      <motion.div variants={fadeUp} className='mx-auto mb-12 max-w-2xl text-center'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700'>
          Reviews
        </p>
        <h2 className='text-3xl font-bold text-gray-950 sm:text-4xl'>
          Stories from our buyers
        </h2>
        <p className='mt-4 text-gray-600'>
          A few words from people who found the right property with our help.
        </p>
      </motion.div>

      {/* Grid of testimonials – each appears with fadeUp */}
      <motion.div variants={staggerContainer} className='grid gap-6 md:grid-cols-3'>
        {testimonialsData.map((testimonial) => (
          <motion.div key={testimonial.name} variants={fadeUp} className='rounded-lg border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <img className='mx-auto mb-4 h-20 w-20 rounded-full object-cover' src={testimonial.image} alt={testimonial.alt} loading='lazy' decoding='async' />
            <h3 className='text-lg font-bold text-gray-900'>{testimonial.name}</h3>
            <p className='mb-4 text-sm text-gray-500'>{testimonial.title}</p>

            {/* Star rating – dynamically generated based on the rating number */}
            <div className='mb-5 flex justify-center gap-1'>
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <img key={index} src={assets.star_icon} alt='' className='h-4 w-4' />
              ))}
            </div>

            <p className='text-sm leading-6 text-gray-600'>{testimonial.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Testimonials