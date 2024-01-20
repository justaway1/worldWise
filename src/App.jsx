import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import { useEffect, useState } from 'react'
// import PageNav from './components/PageNav'

const BASE_URL = 'http://localhost:5000'

export default function App () {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities () {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  return (
    <div>
      <BrowserRouter>
        {/* <PageNav /> */}
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='products' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path='cities'
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
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
