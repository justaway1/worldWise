import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import Pricing from './pages/Pricing'
import NotFound from './pages/NotFound'
import AppLayout from './pages/AppLayout'
// import PageNav from './components/PageNav'

export default function App () {
  return (
    <div>
      <BrowserRouter>
        {/* <PageNav /> */}
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='products' element={<Products />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
