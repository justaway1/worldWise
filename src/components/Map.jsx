import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

import Button from './Button'
import { useGeolocation } from '../hooks/useGeoLocation'
import { useMapGeoLocation } from '../hooks/useSearchGeoLocation'

function Map () {
  const [mapPosition, setMapPosition] = useState([40, 50])
  const { position: geoPosition, getPosition } = useGeolocation()
  const [mapLat, mapLng] = useMapGeoLocation()
  const { cities } = useCities()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng])
  }, [geoPosition])

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        USE YOUR LOCATION
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <spam>{city.cityName}</spam>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectMap />
      </MapContainer>
    </div>
  )
}

function ChangeCenter ({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectMap () {
  const navigate = useNavigate()
  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map
