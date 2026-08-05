import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollExperience from './components/ScrollExperience'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// The root component – all sections are arranged in a single column
// ScrollExperience adds the progress bar and back-to-top button globally
const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <ToastContainer position='top-right' />
      <ScrollExperience />
      <Header />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App