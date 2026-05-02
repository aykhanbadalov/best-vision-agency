import { useReveal, anim } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'

export default function Partners() {
  const [sectionRef, inView] = useReveal()
  const { t } = useLang()

  return (
    <section id="partners" ref={sectionRef} className="block w-full relative py-32 bg-slate-50 dark:bg-[#050505] overflow-hidden">
      <div className="section-container mb-20">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <span className="section-label block mb-6" style={anim(inView, 0)}>{t.partners.label}</span>
            <h2 className="section-title" style={anim(inView, 0.1, 'bottom', 0.8)}>
              {t.partners.heading1}<br /><span className="text-accent italic">{t.partners.heading2}</span>
            </h2>
          </div>
          <p className="text-slate-400 dark:text-white/40 text-sm max-w-xs lg:text-right leading-relaxed" style={anim(inView, 0.4)}>
            {t.partners.subtext}
          </p>
        </div>
      </div>

      <div style={anim(inView, 0.3)} className="border-y border-slate-200 dark:border-white/5 py-16">
        <p className="text-center text-slate-300 dark:text-white/20 text-sm font-semibold tracking-[0.4em] uppercase">
          {t.partners.comingSoon}
        </p>
      </div>

      <div className="section-container mt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-white/10">
          {t.partners.stats.map(([num, label, sub], i) => (
            <div
              key={label}
              style={anim(inView, 0.5 + i * 0.1)}
              className="bg-white dark:bg-black p-10 text-center hover:bg-primary/5 transition-colors duration-500 group"
            >
              <div className="font-display text-5xl font-black text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300 mb-2" style={{ overflow: 'visible' }}>
                {num}
              </div>
              <div className="text-slate-600 dark:text-white/60 text-sm font-semibold mb-1">{label}</div>
              <div className="text-slate-400 dark:text-white/25 text-xs tracking-wider">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
