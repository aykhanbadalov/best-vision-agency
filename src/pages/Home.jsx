import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Partners from '../components/Partners'
import SEO from '../components/SEO'
import { useLang } from '../context/LanguageContext'

const serviceStatic = [
  { number: '01', icon: '◈' },
  { number: '02', icon: '◉' },
  { number: '03', icon: '◫' },
  { number: '04', icon: '◎' },
]

const portfolioStatic = [
  { id: 1, color: '#040571', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
  { id: 2, color: '#1a0a6b', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { id: 3, color: '#0a1f5c', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
]

/* ── About Summary ─────────────────────────────────────── */
function HomeAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { t } = useLang()
  return (
    <section ref={ref} className="block w-full py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <m.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label block mb-6">
              {t.homeAbout.label}
            </m.span>
            <m.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="section-title mb-8">
              {t.homeAbout.heading1}<br /><span className="text-accent italic">{t.homeAbout.heading2}</span>
            </m.h2>
            <m.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-slate-600 dark:text-gray-300 text-base leading-relaxed mb-6">
              {t.homeAbout.body} <strong className="text-slate-900 dark:text-white">{t.homeAbout.bodyStrong}</strong> {t.homeAbout.bodyEnd}
            </m.p>
            <m.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-10 mb-10">
              {t.homeAbout.stats.map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-4xl font-black text-slate-900 dark:text-white" style={{ overflow: 'visible' }}>{num}</div>
                  <div className="text-xs text-slate-400 dark:text-white/40 tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </m.div>
            <m.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
              <Link to="/haqqimizda">
                <button className="btn-outline">{t.homeAbout.cta}</button>
              </Link>
            </m.div>
          </div>

          <m.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="bg-primary/10 border border-primary/30 p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary dark:bg-blue-500" />
            <blockquote className="font-display text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-snug" style={{ overflow: 'visible' }}>
              "{t.homeAbout.quotePre} <span className="text-accent italic">{t.homeAbout.quoteAccent}</span> {t.homeAbout.quotePost}"
            </blockquote>
          </m.div>
        </div>
      </div>
    </section>
  )
}

/* ── Services Summary ───────────────────────────────────── */
function HomeServices() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { t } = useLang()
  const serviceItems = serviceStatic.map((s, i) => ({ ...s, ...t.services.cards[i] }))

  return (
    <section ref={ref} className="block w-full py-24 bg-slate-50 dark:bg-[#050505] relative">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <m.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label block mb-4">
              {t.homeServices.label}
            </m.span>
            <m.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl lg:text-6xl font-black text-slate-900 dark:text-white" style={{ lineHeight: 1.25, overflow: 'visible' }}>
              {t.homeServices.heading1} <span className="text-accent italic">{t.homeServices.heading2}</span>
            </m.h2>
          </div>
          <m.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <Link to="/xidmetler"><button className="btn-outline text-sm">{t.homeServices.cta}</button></Link>
          </m.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceItems.map((s, i) => (
            <m.div key={s.number} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="border border-slate-200 dark:border-white/10 p-7 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group bg-white dark:bg-transparent">
              <div className="flex justify-between items-start mb-6">
                <span className="text-slate-300 dark:text-white/20 group-hover:text-slate-900 dark:group-hover:text-white font-display font-black text-5xl leading-none transition-colors duration-300">{s.number}</span>
                <span className="text-slate-300 dark:text-white/30 group-hover:text-primary dark:group-hover:text-blue-400 text-2xl transition-colors duration-300">{s.icon}</span>
              </div>
              <h3 className="text-slate-800 dark:text-white font-bold text-base mb-2" style={{ overflow: 'visible' }}>{s.title}</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Portfolio Summary ──────────────────────────────────── */
function HomePortfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { t } = useLang()
  const projects = portfolioStatic.map((s, i) => ({ ...s, ...t.homePortfolio.projects[i] }))

  return (
    <section ref={ref} className="block w-full py-24 bg-white dark:bg-black relative">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <m.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label block mb-4">
              {t.homePortfolio.label}
            </m.span>
            <m.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl lg:text-6xl font-black text-slate-900 dark:text-white" style={{ lineHeight: 1.25, overflow: 'visible' }}>
              {t.homePortfolio.heading1} <span className="text-accent italic">{t.homePortfolio.heading2}</span>
            </m.h2>
          </div>
          <m.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <Link to="/islerimiz"><button className="btn-outline text-sm">{t.homePortfolio.cta}</button></Link>
          </m.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <m.div key={p.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group cursor-pointer overflow-hidden border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: p.color }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs tracking-widest font-semibold uppercase">{t.homePortfolio.hoverCta}</span>
                </div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-900">
                <span className="section-label block mb-1">{p.category}</span>
                <h3 className="text-slate-800 dark:text-white font-bold text-base mt-1 mb-2" style={{ overflow: 'visible' }}>{p.title}</h3>
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold">{p.result}</span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact CTA ────────────────────────────────────────── */
function HomeContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { t } = useLang()
  return (
    <section ref={ref} className="block w-full py-24 bg-white dark:bg-black relative">
      <div className="section-container">
        <m.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="bg-primary/10 border border-primary/30 p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary dark:bg-blue-500" />
          <span className="section-label block mb-6">{t.homeCta.label}</span>
          <h2 className="font-display text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6" style={{ lineHeight: 1.25, overflow: 'visible' }}>
            {t.homeCta.heading1} <span className="text-accent italic">{t.homeCta.heading2}</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed max-w-lg mx-auto mb-10">
            {t.homeCta.body}
          </p>
          <Link to="/elaqe">
            <button className="btn-primary text-base px-10 py-5">
              {t.homeCta.cta}
            </button>
          </Link>
        </m.div>
      </div>
    </section>
  )
}

/* ── Home Page Assembly ─────────────────────────────────── */
export default function Home() {
  return (
    <>
      <SEO url="https://bestvisionagency.com" />
      <Hero />
      <HomeAbout />
      <HomeServices />
      <HomePortfolio />
      <Partners />
      <HomeContactCTA />
    </>
  )
}
