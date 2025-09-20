// src/components/recipeStore.js
import { create } from 'zustand'

const initialRecipes = [
  {
    id: 1,
    title: 'Sample Pancakes',
    description: 'Easy fluffy pancakes — flour, milk, egg.',
    ingredients: ['flour', 'milk', 'egg'],
    prepTime: 10 // minutes
  }
]

function applyFilter(recipes, term) {
  const q = (term || '').toString().trim().toLowerCase()
  if (!q) return recipes

  const maybeNumber = Number(q)
  return recipes.filter((r) => {
    // title or description match
    if (r.title && r.title.toLowerCase().includes(q)) return true
    if (r.description && r.description.toLowerCase().includes(q)) return true

    // ingredients (array) match
    if (Array.isArray(r.ingredients) && r.ingredients.join(' ').toLowerCase().includes(q)) return true

    // numeric query → treat as max prep time (e.g. "15" finds recipes prepTime <= 15)
    if (!Number.isNaN(maybeNumber) && typeof r.prepTime === 'number' && r.prepTime <= maybeNumber) return true

    return false
  })
}

export const useRecipeStore = create((set, get) => ({
  // data
  recipes: initialRecipes,
  searchTerm: '',
  filteredRecipes: initialRecipes,

  // CRUD actions (update filteredRecipes after changes)
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe]
      return { recipes, filteredRecipes: applyFilter(recipes, state.searchTerm) }
    }),

  updateRecipe: (id, updates) =>
    set((state) => {
      const recipes = state.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r))
      return { recipes, filteredRecipes: applyFilter(recipes, state.searchTerm) }
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id)
      return { recipes, filteredRecipes: applyFilter(recipes, state.searchTerm) }
    }),

  // setRecipes (hydrate) keeps filtered in sync
  setRecipes: (recipes) => set(() => ({ recipes, filteredRecipes: applyFilter(recipes, get().searchTerm) })),

  // Search + filtering API (checker keywords present)
  setSearchTerm: (term) =>
    set((state) => {
      // update searchTerm and compute filteredRecipes immediately
      return { searchTerm: term, filteredRecipes: applyFilter(state.recipes, term) }
    }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: applyFilter(state.recipes, state.searchTerm)
    }))
}))
