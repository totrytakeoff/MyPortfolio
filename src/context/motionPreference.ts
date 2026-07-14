import { createContext } from 'react'

export interface MotionPreferenceContextValue {
  motionEnabled: boolean
  toggleMotion: () => void
}

export const MotionPreferenceContext = createContext<MotionPreferenceContextValue | null>(null)
