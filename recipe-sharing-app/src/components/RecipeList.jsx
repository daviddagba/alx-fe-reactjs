import React from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes)
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  if (!recipes || recipes.length === 0) return <p>No recipes yet — add one above.</p>

  return (
    <div>
      {recipes.map((r) => (
        <article key={r.id} style={{ border: '1px solid #eee', padding: 12, marginBottom: 12, borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 6px' }}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </h3>
          <p style={{ margin: '0 0 8px' }}>{r.description}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
            <button
              onClick={() => {
                if (confirm('Delete this recipe?')) deleteRecipe(r.id)
              }}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}