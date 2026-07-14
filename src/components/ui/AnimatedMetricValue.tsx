import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'

interface AnimatedMetricValueProps {
  value: number
  fractionDigits?: number
  delay?: number
}

export function AnimatedMetricValue({
  value,
  fractionDigits = 0,
  delay = 0,
}: AnimatedMetricValueProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(valueRef, { once: true, amount: 0.75 })
  const { motionEnabled } = useMotionPreference()
  const count = useMotionValue(motionEnabled ? 0 : value)
  const displayValue = useTransform(count, (currentValue) => (
    currentValue.toFixed(fractionDigits)
  ))
  const finalValue = value.toFixed(fractionDigits)

  useEffect(() => {
    if (!motionEnabled) {
      count.set(value)
      return
    }

    if (!isInView) {
      count.set(0)
      return
    }

    count.set(0)
    const controls = animate(count, value, {
      delay,
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => controls.stop()
  }, [count, delay, isInView, motionEnabled, value])

  return (
    <>
      <span className="sr-only">{finalValue}</span>
      <span className="inline-grid" aria-hidden="true">
        <span className="invisible col-start-1 row-start-1">{finalValue}</span>
        <motion.span ref={valueRef} className="col-start-1 row-start-1">
          {displayValue}
        </motion.span>
      </span>
    </>
  )
}
