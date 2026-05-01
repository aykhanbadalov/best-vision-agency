import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domMax } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import ScrollToTop from './utils/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="relative flex-1 w-full flex flex-col">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  )
}

export default function App() {
  return (
    <LazyMotion features={domMax}>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/haqqimizda" element={<AboutPage />} />
                <Route path="/xidmetler" element={<ServicesPage />} />
                <Route path="/islerimiz" element={<PortfolioPage />} />
                <Route path="/elaqe" element={<ContactPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </LazyMotion>
  )
}
