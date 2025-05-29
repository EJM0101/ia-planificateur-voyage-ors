import dynamic from 'next/dynamic'
import { useState } from 'react'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

export default function Home() {
  const [from, setFrom] = useState('48.8566,2.3522') // Paris
  const [to, setTo] = useState('48.8584,2.2945')     // Tour Eiffel
  const [route, setRoute] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to })
    })
    const data = await res.json()
    setRoute(data.coordinates)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">🧭 IA Planificateur de Voyage</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white shadow p-4 rounded">
        <input className="w-full p-2 border rounded" placeholder="Coordonnées de départ" value={from} onChange={e => setFrom(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Coordonnées d’arrivée" value={to} onChange={e => setTo(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Calculer l’itinéraire</button>
      </form>
      <div className="mt-6 max-w-4xl mx-auto h-[500px]">
        <Map from={from} to={to} route={route} />
      </div>
    </div>
  )
}
