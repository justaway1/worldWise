import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
// import PageNav from './components/PageNav'

export default function App () {
  return (
    <div>
      <BrowserRouter>
        {/* <PageNav /> */}
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='products' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<p>List</p>} />
            <Route path='cities' element={<p>List of Cities</p>} />
            <Route path='countries' element={<p>Countries</p>} />
            <Route path='form' element={<p>Form</p>} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
