import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../assets/assets'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

// Key used to store favorites in the browser's localStorage
const FAVORITES_KEY = 'shaurya-estates-favorites'

// Options for the budget dropdown
const budgetOptions = [
  { label: 'Any budget', value: 'all' },
  { label: 'Under Rs. 80 Lakh', value: 'under-80' },
  { label: 'Rs. 80 Lakh - Rs. 1 Cr', value: '80-100' },
  { label: 'Above Rs. 1 Cr', value: 'above-100' },
]

// Options for the sort dropdown
const sortOptions = [
  { label: 'Default order', value: 'default' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
]

// Helper to read saved favorites from localStorage, with error handling
const getStoredFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? []
  } catch {
    return []
  }
}

// Helper to check if a property's price matches the selected budget range
const matchesBudget = (priceValue, budget) => {
  if (budget === 'under-80') return priceValue < 80
  if (budget === '80-100') return priceValue >= 80 && priceValue <= 100
  if (budget === 'above-100') return priceValue > 100
  return true // 'all' budget
}

// Simple heart icon component (filled or outline)
const HeartIcon = ({ filled }) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    className='h-5 w-5'
    fill={filled ? 'currentColor' : 'none'}
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z' />
  </svg>
)

// Individual property card – now a simple function component (no memo)
const PropertyCard = ({ project, isFavorite, onToggleFavorite }) => (
  <motion.article
    initial={false}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    className='group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10'
  >
    <div className='relative h-64 overflow-hidden'>
      <img
        src={project.image}
        alt={project.title}
        loading='lazy'
        decoding='async'
        className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
      />
      {/* Badge (e.g., "Featured", "New") */}
      <div className='absolute left-4 top-4 rounded bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur'>
        {project.badge}
      </div>
      {/* Favourite button – toggles the saved state */}
      <button
        type='button'
        onClick={() => onToggleFavorite(project.id)}
        aria-label={isFavorite ? `Remove ${project.title} from favorites` : `Save ${project.title} to favorites`}
        aria-pressed={isFavorite}
        className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
          isFavorite ? 'text-amber-500' : 'text-gray-700 hover:text-amber-500'
        }`}
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </div>

    <div className='p-5'>
      <div className='mb-4 flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-xl font-bold text-gray-950'>{project.title}</h3>
          <p className='mt-1 text-sm text-gray-500'>{project.location}</p>
        </div>
        <p className='rounded bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'>
          {project.type}
        </p>
      </div>

      <div className='flex items-center justify-between border-t border-gray-100 pt-4'>
        <p className='font-semibold text-gray-900'>{project.price}</p>
        <a
          href='#Contact'
          className='inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:translate-x-1 hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700'
        >
          View Details <span aria-hidden='true'>&rarr;</span>
        </a>
      </div>
    </div>
  </motion.article>
)

// Small wrapper to label each filter field consistently
const FilterField = ({ label, children }) => (
  <label className='text-sm font-medium text-gray-700'>
    {label}
    {children}
  </label>
)

const Projects = () => {
  // State for all filter values
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    category: 'all',
    budget: 'all',
    sort: 'default',
  })
  // State for list of favorite project IDs (loaded from localStorage initially)
  const [favorites, setFavorites] = useState(getStoredFavorites)

  // Whenever favorites change, save them to localStorage so they persist
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  // Get unique categories from the projects data to populate the dropdown
  const propertyCategories = ['all', ...new Set(projectsData.map((p) => p.category))]

  // Filter and sort the projects based on current filters.
  // This is computed every render (no useMemo) – it's simple enough.
  const filteredProjects = (() => {
    const nameQuery = filters.name.trim().toLowerCase()
    const locationQuery = filters.location.trim().toLowerCase()

    let result = projectsData.filter((project) => {
      const matchesName = project.title.toLowerCase().includes(nameQuery)
      const matchesLocation = project.location.toLowerCase().includes(locationQuery)
      const matchesCategory = filters.category === 'all' || project.category === filters.category
      const matchesBudgetFilter = matchesBudget(project.priceValue, filters.budget)
      return matchesName && matchesLocation && matchesCategory && matchesBudgetFilter
    })

    // Sort if needed
    if (filters.sort === 'price-asc') {
      result = [...result].sort((a, b) => a.priceValue - b.priceValue)
    } else if (filters.sort === 'price-desc') {
      result = [...result].sort((a, b) => b.priceValue - a.priceValue)
    }

    return result
  })()

  // Update a single filter field
  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  // Toggle a property in/out of favorites
  const toggleFavorite = (projectId) => {
    setFavorites((current) =>
      current.includes(projectId)
        ? current.filter((favoriteId) => favoriteId !== projectId)
        : [...current, projectId],
    )
  }

  return (
    <motion.section
      id='Projects'
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer}
      className='bg-white px-6 py-20 md:px-20 lg:px-32'
    >
      <div className='container mx-auto'>
        <motion.div variants={fadeUp} className='mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end'>
          <div>
            <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700'>
              Featured properties
            </p>
            <h2 className='text-3xl font-bold text-gray-950 sm:text-4xl'>
              Homes selected for comfort and value
            </h2>
          </div>
          <p className='max-w-md text-gray-600'>
            Browse a balanced collection of apartments, villas, and family
            residences across growing neighborhoods.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          variants={fadeUp}
          className='mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm'
          aria-label='Property filters'
        >
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
            <FilterField label='Property name'>
              <input
                type='search'
                value={filters.name}
                onChange={(event) => updateFilter('name', event.target.value)}
                placeholder='Search homes'
                className='mt-2 w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              />
            </FilterField>

            <FilterField label='Location'>
              <input
                type='search'
                value={filters.location}
                onChange={(event) => updateFilter('location', event.target.value)}
                placeholder='Search city'
                className='mt-2 w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              />
            </FilterField>

            <FilterField label='Property type'>
              <select
                value={filters.category}
                onChange={(event) => updateFilter('category', event.target.value)}
                className='mt-2 w-full rounded border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              >
                {propertyCategories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All types' : `${category}s`}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label='Budget'>
              <select
                value={filters.budget}
                onChange={(event) => updateFilter('budget', event.target.value)}
                className='mt-2 w-full rounded border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label='Sort by price'>
              <select
                value={filters.sort}
                onChange={(event) => updateFilter('sort', event.target.value)}
                className='mt-2 w-full rounded border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>

          {/* Live count of visible properties */}
          <p className='mt-4 text-sm text-gray-500' aria-live='polite'>
            Showing {filteredProjects.length} of {projectsData.length} properties
            {favorites.length ? ` - ${favorites.length} saved` : ''}
          </p>
        </motion.div>

        {/* Grid of property cards */}
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {filteredProjects.map((project) => (
            <PropertyCard
              key={project.id}
              project={project}
              isFavorite={favorites.includes(project.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Fallback when no properties match */}
        {filteredProjects.length === 0 && (
          <motion.div variants={fadeUp} className='rounded-lg border border-dashed border-gray-300 p-10 text-center'>
            <p className='font-semibold text-gray-900'>No properties match those filters.</p>
            <p className='mt-2 text-sm text-gray-500'>Try a wider budget or a different location.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default Projects