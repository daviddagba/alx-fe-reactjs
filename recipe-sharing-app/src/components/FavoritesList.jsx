import React from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function FavoritesList() {
  // Build favorite recipe objects from IDs
  const favorites = useRecipeStore((s) => s.favorites)
  const recipes = useRecipeStore((s) => s.recipes)

  const favoriteRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean)

  if (favoriteRecipes.length === 0) return <p>No favorites yet — add some!</p>

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p style={{ margin: 0 }}>{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}
