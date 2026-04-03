import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Header'
import Inside from './Inside'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Inside />
  </StrictMode>
)
