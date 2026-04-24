import About from '../components/About'
import SEO from '../components/SEO'

function PageHeader({ label, title, accent }) {
  return (
    <div className="pt-32 pb-4 bg-black border-b border-white/5">
      <div className="section-container">
        <span className="section-label block mb-3">{label}</span>
        <h1 className="font-display text-5xl lg:text-7xl font-black text-white leading-none">
          {title} <span className="text-primary italic">{accent}</span>
        </h1>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Haqqımızda"
        description="Best Vision Agency haqqında — Bakıda kreativ brend və rəqəmsal marketinq agentliyi. Komandamız, dəyərlərimiz və inkişaf yolumuz."
        url="https://bestvisionagency.com/haqqimizda"
      />
      <About />
    </>
  )
}
