export default async function handler(req, res) {
  const { from, to } = req.body
  const [lat1, lon1] = from.split(',').map(Number)
  const [lat2, lon2] = to.split(',').map(Number)

  try {
    const orsRes = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Authorization': process.env.ORS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [[lon1, lat1], [lon2, lat2]]
      })
    })
    const geojson = await orsRes.json()
    const coords = geojson.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon])

    res.status(200).json({ coordinates: coords })
  } catch (e) {
    res.status(500).json({ error: "Erreur OpenRouteService", message: e.message })
  }
}
