import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import DeleteRecipeButton from './DeleteRecipeButton'

export default function RecipeDetails() {
  const { id } = useParams()
  const recipeId = Number(id)
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId))
  const navigate = useNavigate()

  if (!recipe) return <p>Recipe not found.</p>

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
        <DeleteRecipeButton
          id={recipeId}
          afterDelete={() => {
            // navigate back to home after deletion
            navigate('/')
          }}
        />
      </div>
    </div>
  )
}
