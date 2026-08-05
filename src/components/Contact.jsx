import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

// Initial form values
const initialValues = {
  name: '',
  email: '',
  message: '',
}

// Max characters allowed for the message
const MESSAGE_LIMIT = 320

// Validation function – returns an object with error messages for each field
const validateForm = (values) => {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name should be at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us what kind of property you are looking for.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please add a few more details so we can help well.'
  } else if (values.message.length > MESSAGE_LIMIT) {
    errors.message = `Keep the message under ${MESSAGE_LIMIT} characters.`
  }

  return errors
}

const Contact = () => {
  // Form values, touched fields (to show errors only after blur), and UI states
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Compute errors and validity on every render (simple, no useMemo)
  const errors = validateForm(values)
  const isFormValid = Object.keys(errors).length === 0

  // Update a field and clear success message (so user can edit again)
  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setSuccessMessage('')
  }

  // Mark a field as "touched" when user leaves it (onBlur)
  const markTouched = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
  }

  // Handle form submit – validate, show spinner, simulate sending, reset on success
  const handleSubmit = (event) => {
    event.preventDefault()
    // Mark all fields as touched so errors show immediately
    setTouched({ name: true, email: true, message: true })

    if (!isFormValid) {
      return // stop if invalid
    }

    setIsSubmitting(true)

    // Simulate an async request (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false)
      setValues(initialValues)
      setTouched({})
      setSuccessMessage('Thanks! Your visit request is ready and our team will contact you soon.')
      toast.success('Thanks! I will get back to you soon.')
    }, 1200)
  }

  return (
    <motion.section
      id='Contact'
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer}
      className='bg-gray-950 px-6 py-20 text-white md:px-20 lg:px-32'
    >
      <div className='container mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
        {/* Left side: info text */}
        <motion.div variants={fadeUp}>
          <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300'>
            Book a visit
          </p>
          <h2 className='text-3xl font-bold sm:text-4xl'>
            Ready to visit your next home?
          </h2>
          <p className='mt-5 max-w-md leading-7 text-gray-300'>
            Share your preferred location, budget, and property type. Our team
            will help you shortlist the best options and plan a site visit.
          </p>

          <div className='mt-8 space-y-3 text-gray-300'>
            <p>Email: hello@shauryaestates.in</p>
            <p>Phone: +91 9876543210</p>
            <p>Location: Saharanpur, India</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          noValidate // we handle validation ourselves
          className='rounded-lg bg-white p-6 text-gray-700 shadow-2xl md:p-8'
        >
          <div className='grid gap-5 md:grid-cols-2'>
            <label className='text-sm font-medium'>
              Your Name
              <input
                className='mt-2 w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                type='text'
                name='name'
                value={values.name}
                onChange={updateField}
                onBlur={markTouched}
                placeholder='Enter your name'
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby='name-error'
                autoComplete='name'
              />
              {/* Error message appears only if touched and error exists */}
              <span id='name-error' className='mt-2 block min-h-5 text-xs text-red-600' aria-live='polite'>
                {touched.name ? errors.name : ''}
              </span>
            </label>

            <label className='text-sm font-medium'>
              Your Email
              <input
                className='mt-2 w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                type='email'
                name='email'
                value={values.email}
                onChange={updateField}
                onBlur={markTouched}
                placeholder='Enter your email'
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby='email-error'
                autoComplete='email'
              />
              <span id='email-error' className='mt-2 block min-h-5 text-xs text-red-600' aria-live='polite'>
                {touched.email ? errors.email : ''}
              </span>
            </label>
          </div>

          <label className='mt-5 block text-sm font-medium'>
            Property Requirement
            <textarea
              className='mt-2 h-40 w-full resize-none rounded border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              name='message'
              value={values.message}
              onChange={updateField}
              onBlur={markTouched}
              maxLength={MESSAGE_LIMIT + 20} // allow a little extra to show error
              placeholder='Tell us your budget, location, and property type'
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby='message-error message-counter'
            />
            <span className='mt-2 flex min-h-5 items-center justify-between gap-4 text-xs'>
              <span id='message-error' className='text-red-600' aria-live='polite'>
                {touched.message ? errors.message : ''}
              </span>
              <span id='message-counter' className={values.message.length > MESSAGE_LIMIT ? 'text-red-600' : 'text-gray-500'}>
                {values.message.length}/{MESSAGE_LIMIT}
              </span>
            </span>
          </label>

          {/* Success message after submission */}
          {successMessage && (
            <p className='mt-5 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700' role='status'>
              {successMessage}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-6 inline-flex items-center justify-center gap-2 rounded bg-emerald-700 px-8 py-3 font-semibold text-white hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {isSubmitting && (
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' aria-hidden='true' />
            )}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </motion.section>
  )
}

export default Contact