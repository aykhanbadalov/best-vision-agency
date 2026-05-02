import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLang()

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      <div
        style={{
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          pointerEvents: expanded ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'bottom right',
        }}
        className="bg-black border border-white/10 p-5 min-w-[200px] shadow-2xl shadow-black/50"
      >
        <p className="text-gray-400 text-xs mb-4 tracking-wide">{t.floating.label}</p>
        <div className="space-y-3">
          <a href="tel:+994503970301" className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors">
            <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">☎</span>
            <span>+994 50 397 03 01</span>
          </a>
          <a href="mailto:bestvisionagency1@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors">
            <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">✉</span>
            <span>bestvisionagency1@gmail.com</span>
          </a>
          <Link to="/elaqe" onClick={() => setExpanded(false)} className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors cursor-pointer">
            <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">◈</span>
            <span>{t.floating.cta}</span>
          </Link>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden transition-colors duration-300"
        aria-label="Əlaqə"
      >
        <span
          className="text-xl leading-none font-light"
          style={{ display: 'inline-block', transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          {expanded ? '✕' : '✉'}
        </span>
        {!expanded && (
          <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40 pointer-events-none" />
        )}
      </button>
    </div>
  )
}
