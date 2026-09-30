import { lazy, Suspense, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import WorkExperience from './sections/WorkExperience'
import Education from './sections/Education'
import Certifications from './sections/Certifications'
import MotivationLetter from './sections/MotivationLetter'
import Contact from './sections/Contact'
import { tour } from './data'

const TourGuide = lazy(() => import('./tour/TourGuide'))

export default function App() {
  const [isTourActive, setIsTourActive] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        <Hero onStartTour={() => setIsTourActive(true)} />
        <About />
        <Skills />
        <Projects />
        <WorkExperience />
        <Education />
        <Certifications />
        <MotivationLetter />
        <Contact />
      </main>
      {isTourActive ? (
        <Suspense fallback={null}>
          <TourGuide
            sections={tour}
            onClose={() => setIsTourActive(false)}
          />
        </Suspense>
      ) : null}
    </>
  )
}
