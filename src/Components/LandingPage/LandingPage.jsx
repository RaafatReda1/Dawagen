import LandingHeader from './Components/Layout/LandingHeader/LandingHeader'
import HeroSection from './Components/HeroSection/HeroSection'
import Features from './Components/Features/Features'
import LandingFooter from './Components/Layout/LandingFooter/LandingFooter'

const LandingPage = () => {
  return (
    <main>
      <LandingHeader />
      <HeroSection />
      <Features />
      <LandingFooter />
    </main>
  )
}

export default LandingPage