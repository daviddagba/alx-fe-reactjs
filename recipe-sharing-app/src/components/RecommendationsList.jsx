import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations)
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations)
  const favorites = useRecipeStore((s) => s.favorites)

  // Regenerate whenever favorites change
  useEffect(() => {
    generateRecommendations()
  }, [favorites, generateRecommendations])

  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations yet — favorite some recipes to get suggestions.</p>
  }

  return (
    <div>
      <h2>Recommended for you</h2>
      {recommendations.map((r) => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
          <h3>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </h3>
          <p style={{ margin: 0 }}>{r.description}</p>
        </div>
      ))}
    </div>
  )
}
