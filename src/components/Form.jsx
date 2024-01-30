// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'

import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import Spinner from './Spinner'
import { useMapGeoLocation } from '../hooks/useSearchGeoLocation'
import Message from './Message'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

export function convertToEmoji (countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
function Form () {
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [emoji, setEmoji] = useState('')
  const [geoError, setGeoError] = useState(null)
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [lat, lng] = useMapGeoLocation()
  const [isGeoLoading, setIsGeoLoading] = useState(false)
  const { addNewCity, isLoading } = useCities()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCityData () {
      setIsGeoLoading(true)
      setGeoError(null)

      try {
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        )
        const data = await response.json()
        if (!data.countryCode)
          throw new Error('You are Far from the city! Click Somewhere else!')

        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setGeoError(error.message)
      } finally {
        setIsGeoLoading(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  async function formSubmit (e) {
    e.preventDefault()
    const newCity = {
      cityName,
      date,
      notes,
      emoji,
      position: {
        lat,
        lng
      }
    }
    await addNewCity(newCity)
    navigate('/app')
  }

  if (geoError) return <Message message={geoError} />
  if (isGeoLoading) return <Spinner />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={formSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={date => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
