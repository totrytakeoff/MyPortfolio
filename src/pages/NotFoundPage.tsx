import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <section className="border-b border-border pt-16">
      <div className="site-frame flex min-h-[70vh] items-center">
        <div className="frame-pad w-full py-24">
          <p className="font-display text-8xl italic leading-none text-accent/75 sm:text-[150px]">404</p>
          <p className="eyebrow mt-7">Route not found</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">这个页面不在当前项目档案中。</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-text-muted">
            项目 slug 可能已经变更，或链接不属于当前作品集。可以回到首页，也可以直接浏览完整项目列表。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="button-secondary"><ArrowLeft size={15} aria-hidden="true" /> 返回首页</Link>
            <Link to="/projects" className="button-primary">项目档案 <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
