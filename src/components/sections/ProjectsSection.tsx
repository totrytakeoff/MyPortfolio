import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getProjectsByCategory } from '../../data/projects'
import { ProjectCard } from '../project/ProjectCard'
import { ProjectFilter, type ProjectFilterValue } from '../project/ProjectFilter'

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectFilterValue>('all')
  const filteredProjects = getProjectsByCategory(category)

  return (
    <section id="projects" className="border-b border-border">
      <div className="site-frame frame-pad pb-24 sm:pb-32">
        <ProjectFilter value={category} onChange={setCategory} />

        <motion.div layout className="grid gap-px bg-border md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-bg"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
