import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
function CityList ({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message
        message={'Please Add your favorite Cities by clicking on the map!'}
      />
    )

  return (
    <div className={styles.cityList}>
      <ul>
        {cities.map(city => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </div>
  )
}

export default CityList
