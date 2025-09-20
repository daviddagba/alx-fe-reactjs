// src/components/recipeStore.js
import { create } from 'zustand'

export const useRecipeStore = create((set) => ({
  recipes: [
    { id: 1, title: 'Sample Pancakes', description: 'Easy fluffy pancakes — flour, milk, egg.' }
  ],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (id, updates) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r))
    })),

  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  setRecipes: (recipes) => set({ recipes })
}))
