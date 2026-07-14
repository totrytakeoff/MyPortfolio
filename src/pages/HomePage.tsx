import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeroSection } from '../components/sections/HeroSection'
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection'
import { OpenSourceSection } from '../components/sections/OpenSourceSection'
import { ResumesSection } from '../components/sections/ResumesSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { useMotionPreference } from '../hooks/useMotionPreference'

interface HomeNavigationState {
  scrollTo?: string
}

export function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { motionEnabled } = useMotionPreference()

  useEffect(() => {
    const state = location.state as HomeNavigationState | null
    if (!state?.scrollTo) return

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(state.scrollTo ?? '')?.scrollIntoView({
        behavior: motionEnabled ? 'smooth' : 'auto',
      })
      navigate('/', { replace: true, state: null })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [location.state, motionEnabled, navigate])

  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <OpenSourceSection />
      <ResumesSection />
    </>
  )
}
