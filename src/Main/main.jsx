import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './CartContext'
import Header from './Header'
import Inside from './Inside'
import Menu from './Menu'
import Rest from './Rest'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <Header />
      <Inside />
      <Menu/>
      <Rest/>
    </CartProvider>
  </StrictMode>
)
