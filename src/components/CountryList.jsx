import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
function CountryList () {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message
        message={'Please Add your favorite Cities by clicking on the map!'}
      />
    )

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])

  return (
    <div>
      <ul className={styles.countryList}>
        {countries.map(country => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  )
}

export default CountryList
