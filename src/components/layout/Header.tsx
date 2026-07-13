import { ArrowUpRight, Download, Github, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile } from '../../data/profile'
import { SectionLink } from '../ui/SectionLink'

const routeItems = [
  { to: '/', label: '首页', end: true },
  { to: '/projects', label: '项目档案', end: false },
] as const

function getRouteClassName(isActive: boolean): string {
  return `relative inline-flex min-h-11 items-center px-3 text-sm transition-colors ${
    isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
  }`
}

export function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/90 bg-bg/95 backdrop-blur-xl">
      <div className="site-frame flex h-full items-center justify-between">
        <Link
          to="/"
          className="group flex h-full items-center gap-3 border-r border-border/80 px-5 sm:px-6"
          aria-label="薛晓春作品集首页"
        >
          <span className="grid size-7 place-items-center border border-accent/70 font-mono text-[10px] font-medium text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
            XXC
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-text-primary sm:block">
            薛晓春
          </span>
        </Link>

        <nav className="hidden h-full items-center md:flex" aria-label="网站页面导航">
          {routeItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => getRouteClassName(isActive)}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? (
                    <span className="absolute inset-x-3 bottom-0 h-px bg-accent" aria-hidden="true" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 px-3 text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            GitHub
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </nav>

        <div className="flex h-full items-center border-l border-border/80">
          <SectionLink
            sectionId="resumes"
            className="hidden h-full items-center gap-2 px-5 text-sm font-medium text-accent transition-colors hover:bg-accent-dim/35 sm:inline-flex"
          >
            <Download size={15} aria-hidden="true" />
            简历
          </SectionLink>
          <button
            type="button"
            className="grid size-16 place-items-center text-text-muted transition-colors hover:bg-surface hover:text-text-primary md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-b border-border bg-bg shadow-2xl md:hidden"
          aria-label="移动端页面导航"
        >
          <div className="site-frame flex flex-col p-3">
            {routeItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-12 items-center border-b border-border/60 px-3 text-sm ${
                    isActive ? 'text-accent' : 'text-text-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center justify-between border-b border-border/60 px-3 text-sm text-text-muted"
            >
              <span className="inline-flex items-center gap-2"><Github size={15} aria-hidden="true" /> GitHub</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <SectionLink
              sectionId="resumes"
              className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 border border-accent/50 text-sm text-accent"
              onNavigate={() => setMenuOpen(false)}
            >
              <Download size={15} aria-hidden="true" />
              查看方向简历
            </SectionLink>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
