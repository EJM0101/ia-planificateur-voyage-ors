import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map({ from, to, route }) {
  const [lat1, lon1] = from.split(',').map(Number)
  const [lat2, lon2] = to.split(',').map(Number)

  return (
    <MapContainer center={[lat1, lon1]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat1, lon1]} />
      <Marker position={[lat2, lon2]} />
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  )
}
