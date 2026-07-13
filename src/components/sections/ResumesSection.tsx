import { Download } from 'lucide-react'
import { resumes } from '../../data/resumes'
import { getAssetUrl } from '../../utils/assets'
import { SectionHeading } from '../ui/SectionHeading'

export function ResumesSection() {
  return (
    <section id="resumes" className="border-b border-border bg-accent-dim/10">
      <div className="site-frame section-pad frame-pad">
        <SectionHeading
          eyebrow="04 / Resume routes"
          title="按岗位方向，快速进入最相关的经历与项目证据。"
          description="系统后端、嵌入式与机器人软件分别整理阅读重点，可直接下载对应版本。"
        />

        <div className="grid border-y border-border lg:grid-cols-3">
          {resumes.map((resume, index) => (
            <article
              key={resume.slug}
              className={`flex min-h-[380px] flex-col px-1 py-8 sm:px-7 lg:px-8 ${index < resumes.length - 1 ? 'border-b border-border lg:border-b-0 lg:border-r' : ''}`}
            >
              <span className="font-display text-4xl italic text-accent/75">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{resume.direction}</h3>
              <p className="mt-4 text-sm leading-7 text-text-muted">{resume.description}</p>
              <ul className="mt-6 space-y-2 border-t border-border/70 pt-5">
                {resume.highlights.map((highlight) => (
                  <li key={highlight} className="text-xs leading-5 text-text-dim">{highlight}</li>
                ))}
              </ul>

              <a
                href={getAssetUrl(`assets/resumes/${encodeURI(resume.filename)}`)}
                download={resume.filename}
                className="button-quiet mt-8 w-full lg:mt-auto"
              >
                <Download size={16} aria-hidden="true" />
                下载 PDF
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
