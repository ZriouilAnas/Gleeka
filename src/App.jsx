import { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import HeroSection from './components/HeroSection/HeroSection'
import ProjectDescription from './components/ProjectDescription/ProjectDescription'
import FooterSection from './components/FooterSection/FooterSection'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-container">
      <NavBar />
      <HeroSection />
      <ProjectDescription />
      <FooterSection />
    </div>
  )
}

export default App
