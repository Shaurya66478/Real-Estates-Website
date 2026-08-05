// Icons used across the site
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'

// Hero background images – responsive formats (AVIF + WebP) for faster loading
import hero_1600_avif from './hero_1600.avif'
import hero_1600_webp from './hero_1600.webp'
import hero_960_avif from './hero_960.avif'
import hero_960_webp from './hero_960.webp'

// Brand / about section image
import brand_img from './brand_img.png'

// Property images (6 projects)
import project_img_1 from './project_img_1.jpg'
import project_img_2 from './project_img_2.jpg'
import project_img_3 from './project_img_3.jpg'
import project_img_4 from './project_img_4.jpg'
import project_img_5 from './project_img_5.jpg'
import project_img_6 from './project_img_6.jpg'

// Testimonial profile photos
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'

// All assets grouped into one object for easy import elsewhere
export const assets = {
  cross_icon,
  menu_icon,
  star_icon,
  hero_1600_avif,
  hero_1600_webp,
  hero_960_avif,
  hero_960_webp,
  brand_img,
}

// The single source of truth for all property listings
export const projectsData = [
  {
    id: 'skyline-haven',
    title: 'Skyline Haven',
    price: 'From Rs. 82 Lakh',
    priceValue: 82, // used for budget filtering and sorting
    location: 'Mohali',
    image: project_img_1,
    category: 'Apartment',
    type: 'Luxury Apartments',
    badge: 'Featured',
  },
  {
    id: 'vista-verde',
    title: 'Vista Verde',
    price: 'From Rs. 1.15 Cr',
    priceValue: 115,
    location: 'Chandigarh',
    image: project_img_2,
    category: 'Villa',
    type: 'Premium Villas',
    badge: 'Luxury',
  },
  {
    id: 'serenity-suites',
    title: 'Serenity Suites',
    price: 'From Rs. 68 Lakh',
    priceValue: 68,
    location: 'Saharanpur',
    image: project_img_3,
    category: 'Home',
    type: 'Smart Homes',
    badge: 'New',
  },
  {
    id: 'central-square',
    title: 'Central Square',
    price: 'From Rs. 95 Lakh',
    priceValue: 95,
    location: 'Zirakpur',
    image: project_img_4,
    category: 'Apartment',
    type: 'Urban Residences',
    badge: 'Featured',
  },
  {
    id: 'palm-courtyard',
    title: 'Palm Courtyard',
    price: 'From Rs. 76 Lakh',
    priceValue: 76,
    location: 'Panchkula',
    image: project_img_5,
    category: 'Home',
    type: 'Family Homes',
    badge: 'New',
  },
  {
    id: 'golden-nest',
    title: 'Golden Nest',
    price: 'From Rs. 1.35 Cr',
    priceValue: 135,
    location: 'New Delhi',
    image: project_img_6,
    category: 'Villa',
    type: 'Signature Duplexes',
    badge: 'Luxury',
  },
]

// Testimonial data – each has a name, title, photo, rating (1-5), and a review text
export const testimonialsData = [
  {
    name: 'Aarav Mehta',
    title: 'Home Buyer',
    image: profile_img_1,
    alt: 'Portrait of Aarav Mehta',
    rating: 5,
    text: 'The team made property browsing simple. Details were clear, visits were planned well, and the options matched my budget.',
  },
  {
    name: 'Riya Sharma',
    title: 'Interior Consultant',
    image: profile_img_2,
    alt: 'Portrait of Riya Sharma',
    rating: 5,
    text: 'I liked how clearly each home was explained. It saved time and made comparing different locations much easier.',
  },
  {
    name: 'Karan Malhotra',
    title: 'Property Advisor',
    image: profile_img_3,
    alt: 'Portrait of Karan Malhotra',
    rating: 4,
    text: 'The listings felt practical and genuine. I could understand the price, location, and property style without any confusion.',
  },
]