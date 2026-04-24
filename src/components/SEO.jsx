import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://bestvisionagency.com'
const SITE_NAME = 'Best Vision Agency'
const DEFAULT_TITLE = 'Best Vision Agency — Rəqəmsal Həllər Mərkəzi'
const DEFAULT_DESCRIPTION =
  'Best Vision Agency — Bakıda premium rəqəmsal marketinq, brend kimliyi, veb memarlıq və kreativ kontent xidmətləri. Brendinizi güclü vizual dil və strateji düşüncə ilə irəliyə aparırıq.'
const DEFAULT_KEYWORDS =
  'rəqəmsal marketinq, SMM, brend kimliyi, loqo dizayn, veb sayt, Bakı agentliyi, kreativ agentlik, Best Vision, digital marketing Azerbaijan'

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  url = SITE_URL,
  image = `${SITE_URL}/og-image.jpg`,
  type = 'website',
}) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`

  return (
    <Helmet>
      {/* Primary */}
      <html lang="az" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="az_AZ" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Indexing */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
