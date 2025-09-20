import React from 'react'
import { useRecipeStore } from './recipeStore'

export default function DeleteRecipeButton({ id, afterDelete }) {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return
    deleteRecipe(id)
    if (afterDelete) afterDelete()
  }

  return <button onClick={handleDelete}>Delete</button>
}
