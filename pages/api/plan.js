export default async function handler(req, res) {
  const { from, to, mode = "driving-car" } = req.body;

  const [lat1, lon1] = from.split(',').map(Number);
  const [lat2, lon2] = to.split(',').map(Number);

  try {
    const orsRes = await fetch(`https://api.openrouteservice.org/v2/directions/${mode}/geojson`, {
      method: 'POST',
      headers: {
        'Authorization': process.env.ORS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [[lon1, lat1], [lon2, lat2]]
      })
    });

    const geojson = await orsRes.json();

    const coordinates = geojson.features[0].geometry.coordinates.map(
      ([lon, lat]) => [lat, lon]
    );

    const summary = geojson.features[0].properties.summary;

    return res.status(200).json({
      coordinates,
      info: {
        distance: (summary.distance / 1000).toFixed(2), // km
        duration: (summary.duration / 60).toFixed(1),   // min
        mode,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Erreur API OpenRouteService',
      message: err.message,
    });
  }
}