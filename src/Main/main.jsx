import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './CartContext'
import Header from './Header'
import Inside from './Inside'
import Menu from './Menu'
import Rest from './Rest'
import Kitchen from './Kitchen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EndPoint from './EndPoint'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
        {
          <>
            <Header />
            <Inside />
            <Menu/>
            <Rest/>
          </>
         
        }/>
        <Route path="/kitchen" element={<Kitchen/>}/>
        <Route path='/succes' element={<EndPoint/>}/>
      </Routes>
    </BrowserRouter>
     </CartProvider>
  </StrictMode>
)
