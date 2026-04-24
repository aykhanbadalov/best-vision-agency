import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLang()

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-black border border-white/10 p-5 min-w-[200px] shadow-2xl shadow-black/50"
          >
            <p className="text-gray-400 text-xs mb-4 tracking-wide">{t.floating.label}</p>
            <div className="space-y-3">
              <a
                href="tel:+994503970301"
                className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors group"
              >
                <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">☎</span>
                <span>+994 50 397 03 01</span>
              </a>
              <a
                href="mailto:bestvisionagency1@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors"
              >
                <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">✉</span>
                <span>bestvisionagency1@gmail.com</span>
              </a>
              <Link
                to="/elaqe"
                onClick={() => setExpanded(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white text-xs transition-colors cursor-pointer"
              >
                <span className="w-6 h-6 bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs rounded-sm flex-shrink-0">◈</span>
                <span>{t.floating.cta}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden transition-colors duration-300"
        aria-label="Əlaqə"
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl leading-none font-light"
        >
          {expanded ? '✕' : '✉'}
        </motion.div>

        {!expanded && (
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary rounded-full pointer-events-none"
          />
        )}
      </button>
    </div>
  )
}
