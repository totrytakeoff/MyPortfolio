import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'

interface AnimatedMetricTextProps {
  value: string
  animationKey: string
  delay?: number
}

interface CountMetric {
  kind: 'count'
  value: number
  prefix: string
  suffix: string
  fractionDigits: number
  useGrouping: boolean
}

interface RevealMetric {
  kind: 'reveal'
}

type ParsedMetric = CountMetric | RevealMetric

const seenMetricAnimations = new Set<string>()

function parseNumericValue(value: string): number {
  return Number(value.replace(/,/g, ''))
}

function decimalPlaces(value: string): number {
  return value.includes('.') ? value.split('.')[1].length : 0
}

function parseMetric(value: string): ParsedMetric {
  const ratioMatch = value.match(/^([\d,]+)\/([\d,]+)$/)
  if (ratioMatch) {
    return {
      kind: 'count',
      value: parseNumericValue(ratioMatch[1]),
      prefix: '',
      suffix: `/${ratioMatch[2]}`,
      fractionDigits: 0,
      useGrouping: ratioMatch[1].includes(','),
    }
  }

  const percentileMatch = value.match(/^(p\d+\s+)([\d,]+(?:\.\d+)?)([a-zA-Z%]+)$/)
  if (percentileMatch) {
    return {
      kind: 'count',
      value: parseNumericValue(percentileMatch[2]),
      prefix: percentileMatch[1],
      suffix: percentileMatch[3],
      fractionDigits: decimalPlaces(percentileMatch[2]),
      useGrouping: percentileMatch[2].includes(','),
    }
  }

  const numberMatch = value.match(/^([\d,]+(?:\.\d+)?)(%)?$/)
  if (numberMatch) {
    return {
      kind: 'count',
      value: parseNumericValue(numberMatch[1]),
      prefix: '',
      suffix: numberMatch[2] ?? '',
      fractionDigits: decimalPlaces(numberMatch[1]),
      useGrouping: numberMatch[1].includes(','),
    }
  }

  return { kind: 'reveal' }
}

function formatCount(metric: CountMetric, value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: metric.fractionDigits,
    maximumFractionDigits: metric.fractionDigits,
    useGrouping: metric.useGrouping,
  }).format(value)
}

export function AnimatedMetricText({
  value,
  animationKey,
  delay = 0,
}: AnimatedMetricTextProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const parsedMetricRef = useRef(parseMetric(value))
  const seenBeforeMountRef = useRef(seenMetricAnimations.has(animationKey))
  const isInView = useInView(valueRef, { once: true, amount: 0.65 })
  const { motionEnabled } = useMotionPreference()
  const parsedMetric = parsedMetricRef.current
  const initialCount = parsedMetric.kind === 'count' && motionEnabled && !seenBeforeMountRef.current
    ? 0
    : parsedMetric.kind === 'count' ? parsedMetric.value : 0
  const count = useMotionValue(initialCount)
  const displayValue = useTransform(count, (currentValue) => (
    parsedMetric.kind === 'count' ? formatCount(parsedMetric, currentValue) : value
  ))

  useEffect(() => {
    if (parsedMetric.kind !== 'count') return undefined

    if (!motionEnabled || seenBeforeMountRef.current) {
      count.set(parsedMetric.value)
      return undefined
    }

    if (!isInView) {
      count.set(0)
      return undefined
    }

    seenMetricAnimations.add(animationKey)
    const duration = Math.min(
      1.2,
      0.72 + Math.log10(Math.max(parsedMetric.value, 1) + 1) * 0.09,
    )
    const controls = animate(count, parsedMetric.value, {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => controls.stop()
  }, [animationKey, count, delay, isInView, motionEnabled, parsedMetric])

  if (parsedMetric.kind === 'reveal') {
    const shouldReveal = motionEnabled && !seenBeforeMountRef.current

    return (
      <>
        <span className="sr-only">{value}</span>
        <motion.span
          ref={valueRef}
          className="inline-block"
          aria-hidden="true"
          initial={shouldReveal ? { opacity: 0, y: '55%', clipPath: 'inset(0 0 100% 0)' } : false}
          whileInView={{ opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ delay, duration: 0.42, ease: 'easeOut' }}
          onViewportEnter={() => seenMetricAnimations.add(animationKey)}
        >
          {value}
        </motion.span>
      </>
    )
  }

  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="inline-grid" aria-hidden="true">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span ref={valueRef} className="col-start-1 row-start-1">
          {parsedMetric.prefix}
          <motion.span>{displayValue}</motion.span>
          {parsedMetric.suffix}
        </span>
      </span>
    </>
  )
}
