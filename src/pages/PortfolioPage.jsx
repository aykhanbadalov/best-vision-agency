import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import SEO from '../components/SEO'

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <SEO
        title="İşlərimiz"
        description="Best Vision Agency-nin seçilmiş işləri — brend kimliyi, rəqəmsal marketinq, veb saytlar və foto/video prodakşn layihələri. Hər layihə bir hekayədir."
        url="https://bestvisionagency.com/islerimiz"
      />
      <Portfolio />
      <Contact />
    </div>
  )
}
