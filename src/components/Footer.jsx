import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-slate-100 dark:bg-[#030303] border-t border-slate-200 dark:border-white/10 pt-20 pb-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#040571 1px, transparent 1px), linear-gradient(90deg, #040571 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="cursor-pointer inline-flex items-center gap-3 mb-6">
              <img src="/logo-dark.png" alt="Best Vision" className="h-8 w-auto object-contain block dark:hidden" />
              <img src="/logo-light.png" alt="Best Vision" className="h-8 w-auto object-contain hidden dark:block" />
              <span className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Best Vision Agency</span>
            </Link>
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="https://www.instagram.com/bestvisionagency?igsh=cnNvbno0bWN2MGs%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-white/30 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-slate-400 dark:text-white/40 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.footer.navLabel}</h4>
            <ul className="space-y-3">
              {t.nav.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-500 dark:text-gray-400 text-sm hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors duration-300 group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-400 dark:text-white/40 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.footer.contactLabel}</h4>
            <ul className="space-y-4">
              {t.footer.contactItems.map(([val, label, href]) => (
                <li key={label}>
                  <p className="text-slate-400 dark:text-white/30 text-xs tracking-wider uppercase mb-1">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-gray-300 text-sm hover:text-primary dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                      {val}
                    </a>
                  ) : (
                    <p className="text-slate-600 dark:text-gray-300 text-sm hover:text-primary transition-colors cursor-pointer">{val}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex items-center justify-center">
          <p className="text-slate-400 dark:text-white/30 text-xs tracking-wider">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
