import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Corriger les icônes manquants dans certains contextes Next.js/Vercel
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon.src || icon,
  shadowUrl: iconShadow.src || iconShadow,
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

export default function Map({ route, onPlan }) {
  const [position, setPosition] = useState(null)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [mode, setMode] = useState('driving-car')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setPosition([latitude, longitude])
          setFrom([latitude, longitude])
        },
        (err) => console.error("Erreur position:", err)
      )
    }
  }, [])

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        if (!from) {
          setFrom([lat, lng])
        } else if (!to) {
          setTo([lat, lng])
        }
      }
    })
    return null
  }

  useEffect(() => {
    if (from && to) {
      onPlan(from.join(','), to.join(','), mode)
    }
  }, [from, to, mode])

  return (
    <>
      <div className="mb-2 text-center">
        <select value={mode} onChange={e => setMode(e.target.value)} className="p-2 border rounded">
          <option value="driving-car">🚗 Voiture</option>
          <option value="foot-walking">🚶 Piéton</option>
          <option value="cycling-regular">🚴 Vélo</option>
        </select>
        <p className="text-xs text-gray-600">Cliquez sur la carte pour définir les points</p>
      </div>
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <ClickHandler />
          {from && <Marker position={from} />}
          {to && <Marker position={to} />}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
      )}
    </>
  )
}