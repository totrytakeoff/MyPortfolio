import { useContext } from 'react'
import { MotionPreferenceContext, type MotionPreferenceContextValue } from '../context/motionPreference'

export function useMotionPreference(): MotionPreferenceContextValue {
  const context = useContext(MotionPreferenceContext)

  if (!context) {
    throw new Error('useMotionPreference must be used within MotionProvider')
  }

  return context
}
