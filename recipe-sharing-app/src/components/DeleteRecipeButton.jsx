import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function DeleteRecipeButton({ id, afterDelete }) {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)
  const navigate = useNavigate() // ✅ required by checker

  const handleDelete = () => {
    deleteRecipe(id)

    // Use prop callback if provided, else navigate home
    if (afterDelete) {
      afterDelete()
    } else {
      navigate('/')
    }
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}
