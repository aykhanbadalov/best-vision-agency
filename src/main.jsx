// Inter — latin-ext subset, weights 300-800
import '@fontsource/inter/latin-ext-300.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-ext-600.css'
import '@fontsource/inter/latin-ext-700.css'
import '@fontsource/inter/latin-ext-800.css'

// Playfair Display — latin-ext subset, weights + italics needed
import '@fontsource/playfair-display/latin-ext-400.css'
import '@fontsource/playfair-display/latin-ext-400-italic.css'
import '@fontsource/playfair-display/latin-ext-600.css'
import '@fontsource/playfair-display/latin-ext-600-italic.css'
import '@fontsource/playfair-display/latin-ext-700.css'
import '@fontsource/playfair-display/latin-ext-700-italic.css'
import '@fontsource/playfair-display/latin-ext-900.css'
import '@fontsource/playfair-display/latin-ext-900-italic.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
