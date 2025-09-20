import React from 'react'
import { useRecipeStore } from './recipeStore'

export default function SearchBar() {
  const searchTerm = useRecipeStore((s) => s.searchTerm)
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm)
  const filterRecipes = useRecipeStore((s) => s.filterRecipes)

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    filterRecipes() // ensure filteredRecipes updates
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        aria-label="Search recipes"
        value={searchTerm}
        onChange={handleChange}
        placeholder='Search by name, ingredient, or max prep time (e.g. "15")...'
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
    </div>
  )
}
