import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
function CityList () {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message
        message={'Please Add your favorite Cities by clicking on the map!'}
      />
    )

  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map(city => (
          <CityItem city={city} key={city.cityName} />
        ))}
      </ul>
    </div>
  )
}

export default CityList
