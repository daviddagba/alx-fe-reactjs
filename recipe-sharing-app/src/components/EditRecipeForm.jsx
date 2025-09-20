import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function EditRecipeForm() {
  const { id } = useParams()
  const recipeId = Number(id)
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId))
  const updateRecipe = useRecipeStore((s) => s.updateRecipe)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title)
      setDescription(recipe.description)
    }
  }, [recipe])

  if (!recipe) return <p>Recipe not found.</p>

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    if (!trimmedTitle || !trimmedDescription) return
    updateRecipe(recipeId, { title: trimmedTitle, description: trimmedDescription })
    navigate(`/recipes/${recipeId}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 8 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  )
}
