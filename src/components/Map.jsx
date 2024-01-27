import styles from './Map.module.css'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
function Map () {
  const [mapPosition, setMapPosition] = useState([40, 30])
  const { cities } = useCities()
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <spam>{city.cityName}</spam>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
