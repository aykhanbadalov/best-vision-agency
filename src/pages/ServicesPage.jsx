import Services from '../components/Services'
import Contact from '../components/Contact'
import SEO from '../components/SEO'

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Xidmətlər"
        description="Best Vision Agency xidmətləri: rəqəmsal marketinq (SMM, Google Ads), brend kimliyi, veb memarlıq, foto/video prodakşn — hamısı bir dam altında."
        url="https://bestvisionagency.com/xidmetler"
      />
      <div className="pt-20">
        <Services />
        <Contact />
      </div>
    </>
  )
}
