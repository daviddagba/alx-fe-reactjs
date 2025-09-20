import React from 'react'
import { useRecipeStore } from './recipeStore'

export default function FavoriteButton({ id }) {
  const favorites = useRecipeStore((s) => s.favorites)
  const addFavorite = useRecipeStore((s) => s.addFavorite)
  const removeFavorite = useRecipeStore((s) => s.removeFavorite)
  const isFav = favorites.includes(id)

  const handleClick = () => {
    if (isFav) removeFavorite(id)
    else addFavorite(id)
  }

  return (
    <button aria-pressed={isFav} onClick={handleClick}>
      {isFav ? '★ Unfavorite' : '☆ Favorite'}
    </button>
  )
}
