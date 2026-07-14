import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  lineRevealVariants,
  sectionItemVariants,
  sectionRevealVariants,
} from '../../utils/motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <motion.div
      className="relative mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[190px_1fr_auto] lg:items-end"
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-72px' }}
    >
      <motion.p className="eyebrow lg:self-start" variants={sectionItemVariants}>
        {eyebrow}
      </motion.p>
      <motion.div className="max-w-3xl" variants={sectionItemVariants}>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </motion.div>
      {action ? (
        <motion.div className="lg:justify-self-end" variants={sectionItemVariants}>
          {action}
        </motion.div>
      ) : null}
      <motion.span
        className="absolute -bottom-6 left-0 h-px w-24 origin-left bg-accent/35 lg:left-[190px]"
        variants={lineRevealVariants}
        aria-hidden="true"
      />
    </motion.div>
  )
}
