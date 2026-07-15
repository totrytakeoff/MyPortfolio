import { ArrowRight } from 'lucide-react'
import type { ProjectArchitecture } from '../../types'
import { ProjectMediaFigure } from './ProjectMediaFigure'

interface ProjectArchitecturePanelProps {
  architecture: ProjectArchitecture
}

export function ProjectArchitecturePanel({ architecture }: ProjectArchitecturePanelProps) {
  return (
    <div>
      <p className="leading-8 text-text-muted">{architecture.summary}</p>

      <ol className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {architecture.flow.map((step, index) => (
          <li
            key={step.label}
            className="group relative min-h-44 border-b border-r border-border bg-surface/20 px-5 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {step.label}
              </span>
              {index < architecture.flow.length - 1 ? (
                <ArrowRight
                  className="text-text-dim transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  size={15}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <h3 className="mt-6 text-base font-semibold tracking-[-0.015em] text-text-primary">
              {step.title}
            </h3>
            <p className="mt-3 text-xs leading-6 text-text-dim">{step.description}</p>
          </li>
        ))}
      </ol>

      {architecture.media ? (
        <ProjectMediaFigure
            media={architecture.media}
            figureClassName="mt-8"
            visualClassName="aspect-[16/10] border border-border sm:aspect-[16/9]"
            sizes="(max-width: 1024px) 100vw, 760px"
          />
      ) : null}

      <div className="mt-10 border-t border-border">
        {architecture.decisions.map((item, index) => (
          <article
            key={item.title}
            className="grid gap-5 border-b border-border py-7 sm:grid-cols-[44px_1fr]"
          >
            <span className="font-display text-2xl italic text-accent/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                {item.title}
              </h3>
              <dl className="mt-5 grid gap-px bg-border sm:grid-cols-3">
                <div className="bg-bg px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    Problem
                  </dt>
                  <dd className="mt-2 text-xs leading-6 text-text-muted">{item.context}</dd>
                </div>
                <div className="bg-bg px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    Decision
                  </dt>
                  <dd className="mt-2 text-xs leading-6 text-text-muted">{item.decision}</dd>
                </div>
                <div className="bg-bg px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-status-green">
                    Outcome
                  </dt>
                  <dd className="mt-2 text-xs leading-6 text-text-muted">{item.outcome}</dd>
                </div>
              </dl>
              {item.tradeoff ? (
                <p className="mt-4 border-l border-status-amber/60 pl-4 text-xs leading-6 text-text-dim">
                  <span className="text-status-amber">取舍：</span>
                  {item.tradeoff}
                </p>
              ) : null}
              {item.evidence ? (
                <p className="mt-3 font-mono text-[10px] leading-5 text-text-dim">
                  CODE / {item.evidence}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
