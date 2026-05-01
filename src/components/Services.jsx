import { useRef, useState } from 'react'
import { m, useInView, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

const serviceStatic = [
  { id: 'digital', number: '01', icon: '◈' },
  { id: 'identity', number: '02', icon: '◉' },
  { id: 'web', number: '03', icon: '◫' },
  { id: 'content', number: '04', icon: '◎' },
]

function ServiceCard({ service, isActive, onClick, index, isInView, collapsed, expanded }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group cursor-pointer border transition-all duration-500 relative overflow-hidden ${
        isActive
          ? 'border-primary bg-primary/10'
          : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-white/20'
      }`}
    >
      <div className="relative p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-slate-300 dark:text-white/20 group-hover:text-slate-900 dark:group-hover:text-white font-display font-black text-6xl leading-none transition-colors duration-300">{service.number}</span>
          <m.span
            animate={isActive ? { rotate: 90 } : { rotate: 0 }}
            className={`text-3xl transition-all duration-300 group-hover:text-primary dark:group-hover:text-blue-400 ${isActive ? 'text-primary dark:text-blue-400' : 'text-slate-300 dark:text-white/40'}`}
          >
            {service.icon}
          </m.span>
        </div>

        <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white mb-1" style={{ overflow: 'visible' }}>
          {service.title}
        </h3>
        <p className="section-label mb-4">{service.subtitle}</p>
        <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">{service.desc}</p>

        <AnimatePresence>
          {isActive && (
            <m.div
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
              exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'clip-path, opacity' }}
            >
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{service.detail}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div className={`mt-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
          isActive
            ? 'text-slate-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
            : 'text-slate-400 dark:text-white/30 group-hover:text-primary dark:group-hover:text-blue-400'
        }`}>
          <span>{isActive ? expanded : collapsed}</span>
          <m.span animate={isActive ? { rotate: 90 } : { rotate: 0 }}>→</m.span>
        </div>
      </div>
    </m.div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeService, setActiveService] = useState(null)
  const { t } = useLang()

  const services = serviceStatic.map((s, i) => ({ ...s, ...t.services.cards[i] }))

  return (
    <section id="services" ref={sectionRef} className="block w-full py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 mb-24 items-end">
          <div>
            <m.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label block mb-6"
            >
              {t.services.label}
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-title"
            >
              {t.services.heading1}
              <br />
              <span className="text-accent italic">{t.services.heading2}</span>
            </m.h2>
          </div>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-500 dark:text-white/50 text-base leading-relaxed"
          >
            {t.services.subtext}
          </m.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              index={i}
              isInView={isInView}
              collapsed={t.services.collapsed}
              expanded={t.services.expanded}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
