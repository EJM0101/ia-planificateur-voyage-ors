# 🧭 IA Planificateur de Voyage (avec OpenRouteService)

Cette application propose un itinéraire optimal entre deux points GPS en s’appuyant sur l’API OpenRouteService et les principes de la planification IA.

## ✨ Fonctionnalités

- Carte interactive (OpenStreetMap + Leaflet)
- Saisie manuelle des coordonnées GPS
- Appel à l’API OpenRouteService pour calculer l’itinéraire routier réel
- Tracé du chemin calculé sur la carte
- Interface pro (TailwindCSS) et responsive

## 🧠 Concepts IA intégrés

### 🔹 Problème de planification

- **États** : positions GPS
- **Actions** : routes valides entre les points
- **Coût** : distance routière réelle
- **Heuristique** : OpenRouteService intègre un graphe optimisé

### 🔹 Application du modèle A* (via OpenRouteService)

L’API applique un A* amélioré basé sur des graphes routiers, selon le mode choisi (voiture, piéton, vélo...)

## ⚙️ Technologies

- **React + Next.js**
- **Tailwind CSS**
- **Leaflet.js** pour l’affichage cartographique
- **API OpenRouteService** (gratuit avec clé)

## 🚀 Lancer localement

```bash
npm install
cp .env.local.example .env.local  # et mets ta clé ORS
npm run dev
```

Puis ouvrir : http://localhost:3000

## 🔐 Clé API gratuite

Crée un compte sur [https://openrouteservice.org/dev/#/signup](https://openrouteservice.org/dev/#/signup)  
Récupère ta `ORS_API_KEY` et place-la dans le fichier `.env.local`

## 📁 Structure

- `/pages/index.js` : UI + interaction utilisateur
- `/pages/api/plan.js` : Appelle OpenRouteService
- `/components/Map.js` : Affiche carte + tracé

---

Ce projet démontre comment l’IA peut exploiter des API externes pour résoudre des problèmes de planification réalistes.
