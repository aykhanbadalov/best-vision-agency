import { useRef, useState, useEffect } from 'react'
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const containerRef = useRef(null)
  const [activeWord, setActiveWord] = useState(0)
  const [hovered, setHovered] = useState(false)
  const { dark } = useTheme()
  const { t } = useLang()

  const words = t.hero.words
  const headlineWords = t.hero.headline.split(' ')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    setActiveWord(0)
  }, [t])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  const headlineBaseColor = dark ? '#ffffff' : '#0f172a'
  const headlineAccentColor = dark ? '#60a5fa' : '#040571'

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-100 dark:bg-black"
    >
      {/* Background */}
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
        <m.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
        />
        <m.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ willChange: 'transform' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <m.div
        style={{ y, opacity, willChange: 'transform, opacity' }}
        className="relative z-10 section-container w-full pt-32 pb-24"
      >
        <div className="max-w-5xl">
          {/* Headline */}
          <div
            className="mb-10 cursor-default"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex flex-wrap overflow-visible pb-3">
              {headlineWords.map((word, i) => (
                <m.span
                  key={`${word}-${i}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-4 mb-2 overflow-visible"
                  style={{ overflow: 'visible' }}
                >
                  <m.span
                    animate={
                      hovered
                        ? { color: i % 2 === 0 ? headlineBaseColor : headlineAccentColor }
                        : { color: headlineBaseColor }
                    }
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="font-display font-black tracking-tight block text-slate-900 dark:text-white"
                    style={{
                      fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                      lineHeight: 1.25,
                      paddingBlock: '0.1em',
                      overflow: 'visible',
                    }}
                  >
                    {word}
                  </m.span>
                </m.span>
              ))}
            </div>
          </div>

          {/* Cycling sub-headline */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-12 h-12 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={`${activeWord}-${t.hero.wordsSuffix}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
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
              </m.div>
            </AnimatePresence>
          </m.div>

          {/* Subtext + CTA */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed max-w-sm font-light">
              {t.hero.subtext}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/islerimiz">
                <button className="btn-primary">
                  {t.hero.ctaPrimary}
                </button>
              </Link>
              <Link to="/elaqe">
                <button className="inline-flex items-center gap-2 border border-slate-400 dark:border-white/30 text-slate-900 dark:text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black">
                  {t.hero.ctaSecondary}
                </button>
              </Link>
            </div>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 right-0 flex flex-col items-center gap-3"
        >
          <m.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ willChange: 'transform' }}
            className="w-px h-12 bg-gradient-to-b from-slate-400 dark:from-white/40 to-transparent"
          />
        </m.div>
      </m.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-100 dark:from-black to-transparent" />
    </section>
  )
}
