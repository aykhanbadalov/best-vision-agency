import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const containerRef = useRef(null)
  const [activeWord, setActiveWord] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { dark } = useTheme()
  const { t } = useLang()

  const words = t.hero.words
  const headlineWords = t.hero.headline.split(' ')

  useEffect(() => {
    setActiveWord(0)
    setWordVisible(true)
  }, [t])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setActiveWord(prev => (prev + 1) % words.length)
        setWordVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  useEffect(() => {
    const container = containerRef.current
    const onScroll = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      setScrollProgress(Math.max(0, Math.min(1, -rect.top / rect.height)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-100 dark:bg-black"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-30 -z-10"
        />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(#040571 1px, transparent 1px), linear-gradient(90deg, #040571 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
          style={{ animation: 'blob-1 12s ease-in-out infinite', willChange: 'transform' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(4,5,113,0.08)', animation: 'blob-2 15s ease-in-out 2s infinite', willChange: 'transform' }}
        />
      </div>

      <div
        className="relative z-10 section-container w-full pt-32 pb-24"
        style={{
          transform: `translateY(${scrollProgress * 30}%)`,
          opacity: Math.max(0, 1 - scrollProgress / 0.7),
          willChange: 'transform, opacity',
        }}
      >
        <div className="max-w-5xl">
          {/* Headline */}
          <div className="mb-10 cursor-default group">
            <div className="flex flex-wrap overflow-visible pb-3">
              {headlineWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block mr-4 mb-2 overflow-visible"
                  style={{ animation: `word-enter 0.9s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.1}s both` }}
                >
                  <span
                    className={`font-display font-black tracking-tight block text-slate-900 dark:text-white transition-colors duration-300 ${i % 2 !== 0 ? 'group-hover:text-primary dark:group-hover:text-blue-400' : ''}`}
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1.25, paddingBlock: '0.1em', overflow: 'visible' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Cycling sub-headline */}
          <div
            className="mb-12 h-12 overflow-hidden"
            style={{ animation: 'fade-in-anim 0.6s ease 1.2s both' }}
          >
            <div
              className="flex items-center gap-3 transition-all duration-300"
              style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? 'translateY(0)' : 'translateY(-1rem)' }}
            >
              <span
                className="font-display font-light text-primary dark:text-blue-400 italic"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
              >
                {words[activeWord]}
              </span>
              <span
                className="font-display font-light text-slate-500 dark:text-white/50"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
              >
                {t.hero.wordsSuffix}
              </span>
            </div>
          </div>

          {/* Subtext + CTA */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
            style={{ animation: 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 1.0s both' }}
          >
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed max-w-sm font-light">
              {t.hero.subtext}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/islerimiz">
                <button className="btn-primary">{t.hero.ctaPrimary}</button>
              </Link>
              <Link to="/elaqe">
                <button className="inline-flex items-center gap-2 border border-slate-400 dark:border-white/30 text-slate-900 dark:text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black">
                  {t.hero.ctaSecondary}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-0 flex flex-col items-center gap-3"
          style={{ animation: 'fade-in-anim 0.6s ease 2s both' }}
        >
          <div
            className="w-px h-12 bg-gradient-to-b from-slate-400 dark:from-white/40 to-transparent"
            style={{ animation: 'bounce-line 1.5s ease-in-out infinite', willChange: 'transform' }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-100 dark:from-black to-transparent" />
    </section>
  )
}
