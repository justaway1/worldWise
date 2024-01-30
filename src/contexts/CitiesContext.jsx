import { createContext, useReducer, useEffect, useContext } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:5000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null
}

function reducer (state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload]
      }

    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        isLoading: false
      }

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload }

    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}

function CitiesProvider ({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function fetchCities () {
      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'failed to load the cities.' })
      }
    }
    fetchCities()
  }, [])

  async function getCity (id) {
    dispatch({ type: 'loading' })
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      dispatch({ type: 'city/loaded', payload: data })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'failed to load the city.' })
    }
  }

  async function addNewCity (newCity) {
    dispatch({ type: 'loading' })
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'failed to create the city.' })
    }
  }

  async function deleteCity (cityId) {
    dispatch({ type: 'loading' })
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE'
      })

      dispatch({ type: 'city/deleted', payload: cityId })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'failed to delete the city.' })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addNewCity,
        deleteCity,
        error
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities () {
  const context = useContext(CitiesContext)
  return context
}

export { CitiesProvider, useCities }
