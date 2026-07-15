import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import type { ProjectMedia } from '../../types'
import { ProjectMediaFigure } from './ProjectMediaFigure'
import { ProjectVisual } from './ProjectVisual'

export interface ProjectHeroMediaRailProps {
  items: ProjectMedia[]
  label?: string
  className?: string
  sizes?: string
}

type SlidePosition = -1 | 0 | 1

interface VisibleSlide {
  index: number
  position: SlidePosition
}

const AUTOPLAY_DELAY_MS = 6500
const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 220,
  damping: 28,
  mass: 0.9,
} as const

function getVisibleSlides(
  itemCount: number,
  selectedIndex: number,
  direction: number,
): VisibleSlide[] {
  if (itemCount <= 0) return []
  if (itemCount === 1) return [{ index: 0, position: 0 }]

  if (itemCount === 2) {
    return [
      { index: selectedIndex, position: 0 },
      {
        index: (selectedIndex + 1) % itemCount,
        position: direction < 0 ? -1 : 1,
      },
    ]
  }

  return [
    { index: (selectedIndex - 1 + itemCount) % itemCount, position: -1 },
    { index: selectedIndex, position: 0 },
    { index: (selectedIndex + 1) % itemCount, position: 1 },
  ]
}

function getSlideMotion(position: SlidePosition) {
  if (position === 0) {
    return {
      x: '0%',
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
    }
  }

  return {
    x: position < 0
      ? 'calc(var(--rail-side-offset) * -1)'
      : 'var(--rail-side-offset)',
    y: 22,
    scale: 0.86,
    opacity: 0.62,
    zIndex: 10,
  }
}

export function ProjectHeroMediaRail({
  items,
  label = '项目画面',
  className = '',
  sizes = '(max-width: 640px) 86vw, (max-width: 1280px) 72vw, 900px',
}: ProjectHeroMediaRailProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [userPaused, setUserPaused] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState !== 'hidden',
  )
  const [announcement, setAnnouncement] = useState('')
  const railRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(railRef, { amount: 0.35 })
  const { motionEnabled } = useMotionPreference()
  const itemsKey = items.map((item) => item.src).join('\u0000')

  useEffect(() => {
    setSelectedIndex(0)
    setDirection(1)
    setUserPaused(false)
    setHoverPaused(railRef.current?.matches(':hover') ?? false)
    setFocusPaused(railRef.current?.contains(document.activeElement) ?? false)
    setLightboxOpen(false)
    setAnnouncement('')
  }, [itemsKey])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(document.visibilityState !== 'hidden')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const hasMultiple = items.length > 1
  const safeIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0))
  const selected = items[safeIndex]
  const autoplayRunning = hasMultiple
    && motionEnabled
    && !userPaused
    && !hoverPaused
    && !focusPaused
    && !lightboxOpen
    && documentVisible
    && isInView

  useEffect(() => {
    if (!autoplayRunning) return undefined

    const timer = window.setTimeout(() => {
      setDirection(1)
      setSelectedIndex((current) => (current + 1) % items.length)
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [autoplayRunning, items.length, safeIndex])

  if (!selected) return null

  const selectSlide = (index: number, nextDirection: number) => {
    if (index === safeIndex) return

    setDirection(nextDirection)
    setSelectedIndex(index)
    setAnnouncement(`已显示第 ${index + 1} 张图片：${items[index].caption ?? items[index].alt}`)
  }

  const selectRelative = (offset: number) => {
    const nextIndex = (safeIndex + offset + items.length) % items.length
    selectSlide(nextIndex, offset > 0 ? 1 : -1)
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      setFocusPaused(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultiple || lightboxOpen) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectRelative(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectRelative(1)
    }
  }

  const visibleSlides = getVisibleSlides(items.length, safeIndex, direction)
  const stageWidthClassName = hasMultiple
    ? 'w-[86vw] max-w-[920px] sm:w-[72%] lg:w-[70%]'
    : 'w-[calc(100vw-2rem)] max-w-[1080px] sm:w-[86%]'
  const entryX = direction > 0
    ? 'calc(var(--rail-side-offset) * 1.55)'
    : 'calc(var(--rail-side-offset) * -1.55)'
  const exitX = direction > 0
    ? 'calc(var(--rail-side-offset) * -1.55)'
    : 'calc(var(--rail-side-offset) * 1.55)'

  return (
    <div
      ref={railRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className={`overflow-hidden border border-border bg-[#0b0d12] outline-none focus-visible:border-accent/70 [--rail-side-offset:86%] sm:[--rail-side-offset:80%] ${className}`}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(145,181,255,0.1),transparent_48%)] px-0 py-4 sm:py-7">
        <div className={`relative mx-auto aspect-[16/10] sm:aspect-[16/9] ${stageWidthClassName}`}>
          <AnimatePresence initial={false} custom={direction}>
            {visibleSlides.map(({ index, position }) => {
              const media = items[index]
              const isSelected = position === 0
              const motionTarget = getSlideMotion(position)

              return (
                <motion.div
                  key={`${media.src}-${index}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${items.length}`}
                  aria-current={isSelected ? 'true' : undefined}
                  className="absolute inset-0 origin-center will-change-transform"
                  initial={motionEnabled
                    ? { x: entryX, y: 30, scale: 0.76, opacity: 0, zIndex: 0 }
                    : motionTarget}
                  animate={motionTarget}
                  exit={motionEnabled
                    ? { x: exitX, y: 30, scale: 0.76, opacity: 0, zIndex: 0 }
                    : { ...motionTarget, opacity: 0 }}
                  transition={motionEnabled ? SPRING_TRANSITION : { duration: 0 }}
                  style={{ pointerEvents: isSelected || Math.abs(position) === 1 ? 'auto' : 'none' }}
                >
                  {isSelected ? (
                    <div className="relative z-30 h-full border border-white/[0.14] bg-surface shadow-[0_28px_90px_rgba(0,0,0,0.52)]">
                      <ProjectMediaFigure
                        media={media}
                        items={items}
                        itemIndex={index}
                        figureClassName="h-full [&>button]:h-full"
                        visualClassName="h-full w-full"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        sizes={sizes}
                        fit={media.fit ?? 'contain'}
                        showCaption={false}
                        onLightboxOpenChange={setLightboxOpen}
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="group relative block h-full w-full cursor-pointer border border-white/[0.08] bg-surface-2 text-left shadow-[0_18px_60px_rgba(0,0,0,0.42)] transition-[border-color,opacity] hover:border-accent/45 hover:opacity-100 focus-visible:border-accent focus-visible:outline-none"
                      aria-label={`切换到第 ${index + 1} 张：${media.caption ?? media.alt}`}
                      onClick={() => selectSlide(index, position)}
                    >
                      <ProjectVisual
                        media={{ ...media, alt: '' }}
                        className="h-full w-full"
                        imageClassName="transition-[filter] duration-300 group-hover:brightness-110"
                        loading="lazy"
                        sizes={sizes}
                        containPadding="none"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-bg/10 transition-colors group-hover:bg-transparent" />
                    </button>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>

          <AnimatePresence>
            {autoplayRunning ? (
              <motion.span
                key={`hero-progress-${safeIndex}`}
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-40 h-px w-full origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: AUTOPLAY_DELAY_MS / 1000, ease: 'linear' }}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-4 border-t border-border px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
        <div className="min-w-0" aria-live={autoplayRunning ? 'off' : 'polite'}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Frame {String(safeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted sm:text-sm">
            {selected.caption ?? selected.alt}
          </p>
        </div>

        {hasMultiple ? (
          <div className="flex items-center gap-2">
            {motionEnabled ? (
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:border-accent focus-visible:outline-none"
                aria-label={userPaused ? '开启自动轮播' : '暂停自动轮播'}
                aria-pressed={userPaused}
                onClick={() => setUserPaused((current) => !current)}
              >
                {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
              </button>
            ) : null}
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:border-accent focus-visible:outline-none"
              aria-label="显示上一张图片"
              onClick={() => selectRelative(-1)}
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:border-accent focus-visible:outline-none"
              aria-label="显示下一张图片"
              onClick={() => selectRelative(1)}
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="border-t border-border px-3 py-2 sm:px-4">
          <div className="flex gap-1 overflow-x-auto" aria-label={`${label}分页`}>
            {items.map((item, index) => {
              const isSelected = index === safeIndex

              return (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  className={`group flex min-h-11 min-w-16 items-center gap-2 px-2 font-mono text-[9px] transition-colors focus-visible:outline-none ${
                    isSelected ? 'text-accent' : 'text-text-dim hover:text-text-muted'
                  }`}
                  aria-label={`显示第 ${index + 1} 张：${item.alt}`}
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => selectSlide(index, index >= safeIndex ? 1 : -1)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="relative h-px min-w-6 flex-1 overflow-hidden bg-border">
                    <span
                      className={`absolute inset-0 origin-left bg-accent transition-transform duration-300 ${
                        isSelected ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </span>
                </button>
              )
            })}
          </div>
          <p className="sr-only" aria-live="polite">{announcement}</p>
        </div>
      ) : null}
    </div>
  )
}
