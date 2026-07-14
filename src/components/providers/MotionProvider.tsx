import { MotionConfig } from 'framer-motion'
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { MotionPreferenceContext } from '../../context/motionPreference'

type MotionSetting = 'system' | 'on' | 'off'

const STORAGE_KEY = 'portfolio-motion'

function readStoredSetting(): MotionSetting {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'on' || stored === 'off' ? stored : 'system'
}

function getSystemReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MotionProvider({ children }: PropsWithChildren) {
  const [setting, setSetting] = useState<MotionSetting>(readStoredSetting)
  const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemReducedMotion)

  const motionEnabled = setting === 'on' || (setting === 'system' && !systemReducedMotion)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off'
  }, [motionEnabled])

  const toggleMotion = useCallback(() => {
    setSetting((currentSetting) => {
      const currentlyEnabled = currentSetting === 'on'
        || (currentSetting === 'system' && !systemReducedMotion)
      const nextSetting = currentlyEnabled ? 'off' : 'on'

      window.localStorage.setItem(STORAGE_KEY, nextSetting)
      return nextSetting
    })
  }, [systemReducedMotion])

  const contextValue = useMemo(
    () => ({ motionEnabled, toggleMotion }),
    [motionEnabled, toggleMotion],
  )

  return (
    <MotionPreferenceContext.Provider value={contextValue}>
      <MotionConfig reducedMotion={motionEnabled ? 'never' : 'always'}>
        {children}
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  )
}
