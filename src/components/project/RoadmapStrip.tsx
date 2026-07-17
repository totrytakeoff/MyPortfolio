import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import type { RoadmapItem } from '../../types'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'

interface RoadmapStripProps {
  items: RoadmapItem[]
}

const roadmapClassNames: Record<RoadmapItem['status'], string> = {
  done: 'border-accent/45 bg-accent-dim/40 text-accent',
  current: 'border-accent bg-surface text-accent',
  planned: 'border-border bg-surface/45 text-text-dim',
}

export function RoadmapStrip({ items }: RoadmapStripProps) {
  const { motionEnabled } = useMotionPreference()

  return (
    <motion.ol
      className="flex flex-col gap-2 lg:flex-row lg:items-center"
      aria-label="项目路线进展"
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-72px' }}
    >
      {items.map((item, index) => (
        <li key={item.label} className="contents">
          <motion.div
            className={`relative flex min-h-12 flex-1 items-center justify-center gap-2 overflow-hidden border px-3 py-2 text-center text-xs ${roadmapClassNames[item.status]}`}
            variants={sectionItemVariants}
          >
            {item.status === 'current' && motionEnabled ? (
              <motion.span
                data-current-roadmap-pulse
                className="pointer-events-none absolute inset-[-1px] border border-accent"
                animate={{ opacity: [0.14, 0.52, 0.14] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                aria-hidden="true"
              />
            ) : null}
            {item.status === 'done' ? <Check aria-hidden="true" size={14} /> : null}
            {item.status === 'current' ? <ArrowRight aria-hidden="true" size={14} /> : null}
            <span>{item.label}</span>
            <span className="sr-only">
              {item.status === 'done' ? '已完成' : item.status === 'current' ? '当前阶段' : '后续规划'}
            </span>
          </motion.div>
          {index < items.length - 1 ? (
            <motion.span
              className="flex justify-center text-text-dim"
              variants={sectionItemVariants}
              aria-hidden="true"
            >
              <ArrowDown className="lg:hidden" size={14} />
              <ArrowRight className="hidden lg:block" size={14} />
            </motion.span>
          ) : null}
        </li>
      ))}
    </motion.ol>
  )
}
