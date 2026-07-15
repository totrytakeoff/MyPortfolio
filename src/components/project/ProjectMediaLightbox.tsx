import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import type { ProjectMedia } from '../../types'
import { getAssetUrl } from '../../utils/assets'

interface ProjectMediaLightboxProps {
  items: ProjectMedia[]
  activeIndex: number | null
  onChange: (index: number) => void
  onClose: () => void
}

export function ProjectMediaLightbox({
  items,
  activeIndex,
  onChange,
  onClose,
}: ProjectMediaLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(activeIndex)
  const onChangeRef = useRef(onChange)
  const onCloseRef = useRef(onClose)
  const { motionEnabled } = useMotionPreference()
  const isOpen = activeIndex !== null && items.length > 0

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const root = document.getElementById('root')
    const rootWasInert = root?.hasAttribute('inert') ?? false
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-lightbox-close]')?.focus()
    })

    document.body.style.overflow = 'hidden'
    if (root && !rootWasInert) root.setAttribute('inert', '')

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = activeIndexRef.current
      if (currentIndex === null) return

      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (items.length > 1 && event.key === 'ArrowLeft') {
        event.preventDefault()
        onChangeRef.current((currentIndex - 1 + items.length) % items.length)
        return
      }

      if (items.length > 1 && event.key === 'ArrowRight') {
        event.preventDefault()
        onChangeRef.current((currentIndex + 1) % items.length)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (root && !rootWasInert) root.removeAttribute('inert')
      previousFocus?.focus()
    }
  }, [isOpen, items.length])

  if (typeof document === 'undefined') return null

  const safeIndex = activeIndex === null ? 0 : Math.min(Math.max(activeIndex, 0), items.length - 1)
  const media = items[safeIndex]

  const changeBy = (offset: number) => {
    onChange((safeIndex + offset + items.length) % items.length)
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && media ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`项目图片预览：${media.alt}`}
          className="fixed inset-0 z-[1000] flex min-h-0 flex-col bg-[#050608]/95 text-text-primary backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionEnabled ? 0.18 : 0, ease: 'easeOut' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-6">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Image {String(safeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <p className="mt-1 truncate text-xs text-text-muted sm:text-sm">{media.caption ?? media.alt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={getAssetUrl(media.src)}
                target="_blank"
                rel="noreferrer"
                aria-label="在新标签页打开原图"
                className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <ExternalLink size={14} aria-hidden="true" />
                <span className="hidden sm:inline">打开原图</span>
              </a>
              <button
                type="button"
                data-lightbox-close
                className="inline-flex size-11 items-center justify-center border border-white/15 text-text-muted transition-colors hover:border-accent/60 hover:text-accent"
                aria-label="关闭图片预览"
                onClick={onClose}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-16 sm:py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose()
            }}
          >
            {items.length > 1 ? (
              <button
                type="button"
                className="absolute left-3 z-10 inline-flex size-11 items-center justify-center border border-white/15 bg-bg/80 text-text-muted transition-colors hover:border-accent/60 hover:text-accent sm:left-5"
                aria-label="查看上一张图片"
                onClick={() => changeBy(-1)}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            ) : null}

            <motion.img
              key={media.src}
              src={getAssetUrl(media.src)}
              alt={media.alt}
              className="max-h-full max-w-full select-none object-contain shadow-2xl shadow-black/50"
              draggable="false"
              initial={{ opacity: 0, scale: motionEnabled ? 0.985 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: motionEnabled ? 0.2 : 0, ease: 'easeOut' }}
            />

            {items.length > 1 ? (
              <button
                type="button"
                className="absolute right-3 z-10 inline-flex size-11 items-center justify-center border border-white/15 bg-bg/80 text-text-muted transition-colors hover:border-accent/60 hover:text-accent sm:right-5"
                aria-label="查看下一张图片"
                onClick={() => changeBy(1)}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <footer className="shrink-0 border-t border-white/10 px-4 py-3 text-center font-mono text-[10px] tracking-[0.12em] text-text-dim sm:px-6">
            ESC 关闭{items.length > 1 ? ' · ← / → 切换' : ''}
          </footer>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
