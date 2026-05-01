import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061l-1.591 1.59z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { dark, toggle } = useTheme()
  const { lang, t, toggleLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <m.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10'
            : 'bg-white/0 dark:bg-black/0'
        }`}
      >
        <div className="section-container relative flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="cursor-pointer flex items-center gap-2 md:gap-3 min-w-0 flex-shrink-0">
            <img src="/logo-dark.png" alt="Best Vision" className="h-7 sm:h-8 w-auto object-contain block dark:hidden flex-shrink-0" />
            <img src="/logo-light.png" alt="Best Vision" className="h-7 sm:h-8 w-auto object-contain hidden dark:block flex-shrink-0" />
            <span className="font-display text-base sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate">
              Best Vision <span className="hidden sm:inline">Agency</span>
            </span>
          </Link>

          {/* Desktop Links — absolutely centered */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {t.nav.links.map((link) => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs font-semibold tracking-widest uppercase cursor-pointer transition-colors duration-300 relative group whitespace-nowrap ${
                    active
                      ? 'text-primary dark:text-white'
                      : 'text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Right: lang toggle + theme toggle + CTA — always pinned to far right */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <button
              onClick={toggleLang}
              className="text-xs font-bold tracking-widest text-slate-500 dark:text-white/50 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Switch language"
            >
              <span className={lang === 'az' ? 'text-primary dark:text-blue-400' : ''}>AZ</span>
              <span className="mx-1 text-slate-300 dark:text-white/20">|</span>
              <span className={lang === 'en' ? 'text-primary dark:text-blue-400' : ''}>EN</span>
            </button>

            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white/70 hover:text-primary dark:hover:text-blue-400 hover:border-primary dark:hover:border-blue-400 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <m.span
                  key={dark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <SunIcon /> : <MoonIcon />}
                </m.span>
              </AnimatePresence>
            </button>

            <Link to="/elaqe">
              <button className="btn-primary text-xs py-3 px-6">
                {t.nav.cta}
              </button>
            </Link>
          </div>

          {/* Mobile: lang + theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={toggleLang}
              className="text-xs font-bold tracking-widest text-slate-500 dark:text-white/50"
              aria-label="Switch language"
            >
              <span className={lang === 'az' ? 'text-primary dark:text-blue-400' : ''}>AZ</span>
              <span className="mx-0.5 text-slate-300 dark:text-white/20">|</span>
              <span className={lang === 'en' ? 'text-primary dark:text-blue-400' : ''}>EN</span>
            </button>

            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center text-slate-700 dark:text-white/70"
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <m.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-slate-900 dark:bg-white block"
              />
              <m.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-px bg-slate-900 dark:bg-white block"
              />
              <m.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-slate-900 dark:bg-white block"
              />
            </button>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-10"
          >
            {t.nav.links.map((link, i) => (
              <m.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.to}
                  className="font-display text-4xl font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-blue-400 cursor-pointer transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <Link to="/elaqe">
                <button className="btn-primary">{t.nav.cta}</button>
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
