import { useState, useEffect } from 'react'
import { useReveal, anim } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'

const projectStatic = [
  { id: 1, size: 'large', color: '#040571', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80' },
  { id: 2, size: 'medium', color: '#1a0a6b', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80' },
  { id: 3, size: 'small', color: '#0a1f5c', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80' },
  { id: 4, size: 'large', color: '#040571', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80' },
  { id: 5, size: 'medium', color: '#0d0d70', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80' },
  { id: 6, size: 'small', color: '#060850', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80' },
]

function ProjectCard({ project, onClick, clickHint }) {
  const isLarge = project.size === 'large'
  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      onClick={() => onClick(project)}
    >
      <div
        className={`w-full overflow-hidden relative ${isLarge ? 'aspect-video' : 'aspect-square'} min-h-[280px]`}
        style={{ backgroundColor: project.color }}
      >
        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
          <div className="w-16 h-16 bg-white/10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-transparent border-l-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">{project.category}</span>
          <h3 className="text-white font-display font-bold text-xl mt-1" style={{ overflow: 'visible' }}>{project.title}</h3>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-green-400 text-sm font-semibold">{project.result}</span>
            <span className="text-white/30 text-xs">{clickHint}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <span className="bg-black/60 backdrop-blur-sm text-white/60 text-xs px-3 py-1 tracking-widest uppercase">{project.category}</span>
      </div>
    </div>
  )
}

function CaseStudyModal({ project, onClose, labels }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const close = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
      onClick={close}
    >
      <div
        className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 max-w-2xl w-full p-10 relative"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'scale(0.9) translateY(2.5rem)',
          transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-6 right-6 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors text-2xl leading-none">×</button>

        <span className="section-label block mb-4">{project.category}</span>
        <h3 className="font-display text-4xl font-black text-slate-900 dark:text-white mb-8" style={{ overflow: 'visible' }}>{project.title}</h3>

        <div className="grid gap-6">
          {[{ label: labels.modalGoal, value: project.goal }, { label: labels.modalStrategy, value: project.strategy }].map(({ label, value }) => (
            <div key={label} className="border-l-2 border-primary/40 dark:border-blue-400/50 pl-6">
              <span className="section-label block mb-1">{label}</span>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{value}</p>
            </div>
          ))}
          <div className="bg-primary/10 border border-primary/30 p-6 mt-2">
            <span className="section-label block mb-2">{labels.modalResult}</span>
            <div className="text-green-500 dark:text-green-400 font-display font-black text-3xl mb-2" style={{ overflow: 'visible' }}>{project.result}</div>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{project.resultDetail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [sectionRef, inView] = useReveal()
  const [selectedProject, setSelectedProject] = useState(null)
  const { t } = useLang()

  const projects = projectStatic.map((s, i) => ({ ...s, ...t.portfolio.projects[i] }))

  return (
    <section id="portfolio" ref={sectionRef} className="block w-full relative py-32 bg-white dark:bg-black">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label block mb-6" style={anim(inView, 0)}>{t.portfolio.label}</span>
            <h2 className="section-title" style={anim(inView, 0.1, 'bottom', 0.8)}>
              {t.portfolio.heading1}<br /><span className="text-accent italic">{t.portfolio.heading2}</span>
            </h2>
          </div>
          <p className="text-slate-400 dark:text-white/40 max-w-xs text-sm leading-relaxed lg:text-right" style={anim(inView, 0.3)}>
            {t.portfolio.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-auto">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={project.size === 'large' ? 'lg:col-span-2' : ''}
              style={anim(inView, 0.1 + i * 0.08)}
            >
              <ProjectCard project={project} onClick={setSelectedProject} clickHint={t.portfolio.clickHint} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          labels={t.portfolio}
        />
      )}
    </section>
  )
}
