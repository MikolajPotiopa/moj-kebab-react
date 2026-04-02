import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ShowApps from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShowApps />
  </StrictMode>,
)
