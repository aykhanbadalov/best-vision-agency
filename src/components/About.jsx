import { useReveal, anim } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'

function TimelineItem({ event, index }) {
  const [ref, visible] = useReveal()
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16 relative`}
      style={anim(visible, 0, isLeft ? 'left' : 'right', 0.7)}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="glass-card p-6 inline-block max-w-xs">
          <span className="section-label block mb-1">{event.year}</span>
          <h4 className="text-slate-900 dark:text-white font-display font-bold text-xl mt-1 mb-2" style={{ overflow: 'visible' }}>
            {event.title}
          </h4>
          <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{event.desc}</p>
        </div>
      </div>

      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full bg-primary dark:bg-blue-500 border-4 border-white dark:border-black ring-2 ring-primary/40 dark:ring-blue-500/40 z-10"
          style={{ transform: visible ? 'scale(1)' : 'scale(0)', transition: 'transform 0.4s ease 0.2s' }}
        />
      </div>

      <div className="flex-1" />
    </div>
  )
}

export default function About() {
  const [sectionRef, inView] = useReveal()
  const { t } = useLang()

  return (
    <section id="about" ref={sectionRef} className="block w-full py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-end">
          <div>
            <span className="section-label block mb-6" style={anim(inView, 0)}>{t.about.label}</span>
            <h2 className="section-title" style={anim(inView, 0.1, 'bottom', 0.8)}>
              {t.about.heading1}<br /><span className="text-accent italic">{t.about.heading2}</span>
            </h2>
          </div>

          <div style={anim(inView, 0.3, 'bottom', 0.8)}>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {t.about.body1}{' '}<strong className="text-slate-900 dark:text-white">{t.about.bodyStrong}</strong> {t.about.body2}
            </p>
            <p className="text-slate-400 dark:text-white/40 text-base leading-relaxed">{t.about.body3}</p>
            <div className="flex gap-12 mt-10">
              {t.about.stats.map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-4xl font-black text-slate-900 dark:text-white" style={{ overflow: 'visible' }}>{num}</div>
                  <div className="text-xs text-slate-400 dark:text-white/40 tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={anim(inView, 0.4, 'bottom', 0.8)} className="relative mb-32 overflow-hidden">
          <div className="bg-primary/10 border border-primary/30 p-12 lg:p-20 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary dark:bg-blue-500" />
            <span className="section-label block mb-4">{t.about.quoteLabel}</span>
            <blockquote className="font-display text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-snug max-w-4xl" style={{ overflow: 'visible' }}>
              "{t.about.quotePre}{' '}<span className="text-accent italic">{t.about.quoteAccent}</span>{' '}{t.about.quoteMid}"
            </blockquote>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-16" style={anim(inView, 0)}>
            <span className="section-label">{t.about.timelineLabel}</span>
            <span className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2" />
            {t.about.timeline.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
