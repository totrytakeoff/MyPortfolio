import { ArrowUpRight, Github, Mail, Phone } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-[#0b0d12]">
      <div className="site-frame">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="frame-pad border-b border-border py-14 sm:py-20 lg:border-b-0 lg:border-r">
            <p className="eyebrow">Contact / Open to internship</p>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              如果你正在寻找能把工程事实讲清楚、也愿意把问题做到底的实习生。
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
              欢迎交流 C++ 系统、嵌入式控制与机器人软件岗位。邮件和 GitHub 都会直接到达我。
            </p>
          </div>

          <div className="flex flex-col justify-center divide-y divide-border/80">
            <a
              href={`mailto:${profile.email}`}
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
            >
              <span className="inline-flex items-center gap-3"><Mail size={16} /> {profile.email}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
            >
              <span className="inline-flex items-center gap-3"><Phone size={16} /> {profile.phone}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
            >
              <span className="inline-flex items-center gap-3"><Github size={16} /> github.com/{profile.github}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border px-5 py-6 font-mono text-[11px] text-text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} {profile.name} / {profile.nameEn}</span>
          <span>Code · tests · metrics · upstream records</span>
        </div>
      </div>
    </footer>
  )
}
