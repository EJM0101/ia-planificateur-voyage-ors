import dynamic from 'next/dynamic'
import { useState } from 'react'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

export default function Home() {
  const [route, setRoute] = useState([])
  const [info, setInfo] = useState(null)

  const handlePlan = async (from, to, mode) => {
    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, mode })
    })
    const data = await res.json()
    setRoute(data.coordinates)
    setInfo(data.info)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4">
      <h1 className="text-3xl font-bold text-center mb-4">🧭 IA Planificateur de Voyage</h1>

      <div className="max-w-4xl mx-auto bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Fonctionnalités :</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Carte interactive avec OpenStreetMap</li>
          <li>Sélection manuelle du point de départ et d’arrivée</li>
          <li>Choix du type de transport (voiture, piéton, vélo)</li>
          <li>Affichage du chemin calculé avec OpenRouteService</li>
          <li>Visualisation des <strong>concepts d’IA</strong> : planification, heuristique, coût</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4 mb-2">Concepts pédagogiques :</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Modélisation d’un problème de planification</li>
          <li>Algorithme A* appliqué à un graphe routier</li>
          <li>Utilisation de services tiers pour la résolution IA</li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto">
        <Map route={route} onPlan={handlePlan} />
      </div>

      {info && (
        <div className="mt-6 text-center text-sm text-gray-700">
          <p>🚗 Distance : <strong>{info.distance} km</strong></p>
          <p>⏱️ Durée estimée : <strong>{info.duration} min</strong></p>
          <p>⚙️ Mode de transport : <strong>{info.mode}</strong></p>
        </div>
      )}
    </div>
  )
}