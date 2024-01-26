import { createContext, useState, useEffect, useContext } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:5000'

function CitiesProvider ({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

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

  async function getCity (id) {
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities () {
  const context = useContext(CitiesContext)
  return context
}

export { CitiesProvider, useCities }
