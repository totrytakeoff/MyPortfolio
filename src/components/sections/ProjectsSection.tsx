import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getProjectsByCategory } from '../../data/projects'
import type { ProjectCategory } from '../../types'
import { ProjectCard } from '../project/ProjectCard'
import { ProjectFilter, type ProjectFilterValue } from '../project/ProjectFilter'

interface ProjectsSectionProps {
  initialCategory?: ProjectCategory | 'all'
}

export function ProjectsSection({ initialCategory = 'all' }: ProjectsSectionProps) {
  const [category, setCategory] = useState<ProjectFilterValue>(initialCategory)
  const filteredProjects = getProjectsByCategory(category)

  useEffect(() => {
    setCategory(initialCategory)
  }, [initialCategory])

  return (
    <section id="projects" className="border-b border-border">
      <div className="site-frame frame-pad pb-24 sm:pb-32">
        <ProjectFilter
          value={category}
          resultCount={filteredProjects.length}
          onChange={setCategory}
        />

        <motion.div layout className="grid gap-px bg-border md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{
                  opacity: { duration: 0.22, delay: Math.min(index, 3) * 0.035 },
                  y: { duration: 0.26, delay: Math.min(index, 3) * 0.035, ease: 'easeOut' },
                  layout: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 },
                }}
                className="bg-bg"
              >
                <ProjectCard project={project} index={index} archiveCategory={category} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
