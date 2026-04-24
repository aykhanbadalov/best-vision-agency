import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useLang } from '../context/LanguageContext'

function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center justify-between w-full mb-10">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <motion.div
              animate={{
                backgroundColor: i <= current ? '#040571' : 'rgba(0,0,0,0)',
                borderColor: i <= current ? '#040571' : 'rgba(0,0,0,0.2)',
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center"
            >
              {i < current ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-xs">✓</motion.span>
              ) : (
                <span className={`text-xs font-bold ${i === current ? 'text-white' : 'text-slate-400 dark:text-white/30'}`}>
                  {step.number}
                </span>
              )}
            </motion.div>
            <span className={`text-xs tracking-wider whitespace-nowrap ${i === current ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'}`}>
              {step.title}
            </span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              animate={{ backgroundColor: i < current ? '#040571' : undefined }}
              className={`flex-1 h-px mx-2 sm:mx-4 mb-5 ${i < current ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ service: '', budget: '', name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sendError, setSendError] = useState(false)
  const { t } = useLang()

  const validate = () => {
    const newErrors = {}
    t.contact.fields.forEach(({ name, type, required }) => {
      const val = form[name].trim()
      if (required && !val) {
        newErrors[name] = t.contact.errorRequired
      } else if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        newErrors[name] = t.contact.errorEmail
      } else if (type === 'tel' && val && !/^[\d\s+]{7,}$/.test(val)) {
        newErrors[name] = t.contact.errorPhone
      }
    })
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      user_phone: form.phone,
      service: form.service,
      budget: form.budget,
      message: form.message,
    }

    setIsSubmitting(true)
    setSendError(false)

    try {
      await emailjs.send(
        'service_s7h7brj',
        'template_hy8s696',
        templateParams,
        'aJyDowga0JKASO9k7',
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (name) =>
    `w-full bg-white dark:bg-slate-800 border ${
      errors[name]
        ? 'border-red-400 dark:border-red-500'
        : 'border-slate-300 dark:border-white/25 focus:border-primary dark:focus:border-blue-400'
    } focus:ring-2 ${
      errors[name] ? 'focus:ring-red-400/30' : 'focus:ring-primary/25 dark:focus:ring-blue-400/20'
    } text-slate-900 dark:text-white text-sm p-3.5 outline-none transition-colors duration-300 placeholder:text-slate-400 dark:placeholder:text-white/30`

  const variants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  }

  const errorVariants = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
  }

  return (
    <section id="contact" ref={sectionRef} className="block w-full py-20 sm:py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Info */}
          <div>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label block mb-6">
              {t.contact.label}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="section-title mb-8">
              {t.contact.heading1}
              <br />
              <span className="text-accent italic">{t.contact.heading2}</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-slate-600 dark:text-gray-300 text-base leading-relaxed mb-12 max-w-sm">
              {t.contact.subtext}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="space-y-5">
              {t.contact.infoItems.map(({ label, value, icon, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 dark:bg-blue-400/10 border border-primary/20 dark:border-blue-400/20 flex items-center justify-center text-primary dark:text-blue-400 text-sm flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-white/40 text-xs tracking-widest uppercase">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-gray-200 font-medium text-sm hover:text-primary dark:hover:text-blue-400 transition-colors duration-300">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} className="flex items-center gap-5 mt-10 flex-wrap">
              <a
                href="https://www.instagram.com/bestvisionagency?igsh=cnNvbno0bWN2MGs%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-white/40 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300 border-b border-transparent hover:border-primary dark:hover:border-blue-400 pb-0.5"
              >
                Instagram
              </a>
            </motion.div>
          </div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 sm:p-8 lg:p-10"
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-primary/20 dark:bg-blue-400/20 border border-primary/40 dark:border-blue-400/40 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary dark:text-blue-400 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-3" style={{ overflow: 'visible' }}>{t.contact.successTitle}</h3>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">{t.contact.successText}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="w-full">
                <StepIndicator current={step} steps={t.contact.steps} />

                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div key="step0" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                        <h3 className="text-slate-900 dark:text-white font-display text-xl sm:text-2xl font-bold mb-5" style={{ overflow: 'visible' }}>
                          {t.contact.step0Title}
                        </h3>
                        <div className="space-y-2.5">
                          {t.contact.services.map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => { setForm({ ...form, service: s }); setStep(1) }}
                              className={`w-full text-left p-3.5 sm:p-4 border transition-all duration-300 text-sm ${
                                form.service === s
                                  ? 'border-primary bg-primary/10 text-slate-900 dark:border-blue-400 dark:bg-blue-400/15 dark:text-white'
                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900 dark:bg-transparent dark:border-white/10 dark:text-gray-300 dark:hover:border-blue-400/60 dark:hover:bg-blue-400/10 dark:hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${form.service === s ? 'bg-primary dark:bg-blue-400' : 'bg-slate-400 dark:bg-white/20'}`} />
                                <span className="break-words">{s}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                        <h3 className="text-slate-900 dark:text-white font-display text-xl sm:text-2xl font-bold mb-5" style={{ overflow: 'visible' }}>
                          {t.contact.step1Title}
                        </h3>
                        <div className="space-y-2.5 mb-6">
                          {t.contact.budgets.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => { setForm({ ...form, budget: b }); setStep(2) }}
                              className={`w-full text-left p-3.5 sm:p-4 border transition-all duration-300 text-sm ${
                                form.budget === b
                                  ? 'border-primary bg-primary/10 text-slate-900 dark:border-blue-400 dark:bg-blue-400/15 dark:text-white'
                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900 dark:bg-transparent dark:border-white/10 dark:text-gray-300 dark:hover:border-blue-400/60 dark:hover:bg-blue-400/10 dark:hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${form.budget === b ? 'bg-primary dark:bg-blue-400' : 'bg-slate-400 dark:bg-white/20'}`} />
                                {b}
                              </span>
                            </button>
                          ))}
                        </div>
                        <button type="button" onClick={() => setStep(0)} className="text-slate-400 dark:text-white/40 text-xs hover:text-primary transition-colors">{t.contact.back}</button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                        <h3 className="text-slate-900 dark:text-white font-display text-xl sm:text-2xl font-bold mb-5" style={{ overflow: 'visible' }}>
                          {t.contact.step2Title}
                        </h3>
                        <div className="space-y-4 mb-6">
                          {t.contact.fields.map(({ name, label, type, required }) => (
                            <div key={name}>
                              <label className="text-slate-500 dark:text-white/50 text-xs tracking-widest uppercase block mb-2">
                                {label}
                                {required && <span className="text-red-400 ml-0.5">*</span>}
                              </label>
                              <input
                                type={type}
                                value={form[name]}
                                onChange={(e) => {
                                  const val = type === 'tel'
                                    ? e.target.value.replace(/[^\d\s+]/g, '')
                                    : e.target.value
                                  setForm({ ...form, [name]: val })
                                  if (errors[name]) setErrors({ ...errors, [name]: undefined })
                                }}
                                className={inputClass(name)}
                                placeholder={label}
                              />
                              <AnimatePresence>
                                {errors[name] && (
                                  <motion.p
                                    variants={errorVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="text-red-400 dark:text-red-400 text-xs mt-1.5"
                                  >
                                    {errors[name]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                          <div>
                            <label className="text-slate-500 dark:text-white/50 text-xs tracking-widest uppercase block mb-2">{t.contact.messageLabel}</label>
                            <textarea
                              rows={3}
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/25 focus:border-primary dark:focus:border-blue-400 focus:ring-2 focus:ring-primary/25 dark:focus:ring-blue-400/20 text-slate-900 dark:text-white text-sm p-3.5 outline-none transition-colors duration-300 resize-none placeholder:text-slate-400 dark:placeholder:text-white/30"
                              placeholder={t.contact.messagePlaceholder}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary flex-1 justify-center min-w-[120px] disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? 'Göndərilir...' : t.contact.submit}
                          </motion.button>
                          <button type="button" onClick={() => setStep(1)} className="text-slate-400 dark:text-white/40 text-xs hover:text-primary transition-colors whitespace-nowrap">
                            {t.contact.back}
                          </button>
                        </div>

                        <AnimatePresence>
                          {sendError && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="mt-3 text-red-500 dark:text-red-400 text-xs"
                            >
                              Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {(form.service || form.budget) && (
                          <div className="mt-5 p-4 bg-primary/5 border border-primary/20 text-xs text-slate-500 dark:text-gray-400 space-y-1 break-words">
                            {form.service && <p>{t.contact.serviceLabel}: <span className="text-slate-700 dark:text-gray-200">{form.service}</span></p>}
                            {form.budget && <p>{t.contact.budgetLabel}: <span className="text-slate-700 dark:text-gray-200">{form.budget}</span></p>}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
