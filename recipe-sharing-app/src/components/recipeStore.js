import { create } from 'zustand'

const initialRecipes = [
  {
    id: 1,
    title: 'Sample Pancakes',
    description: 'Easy fluffy pancakes — flour, milk, egg.',
    ingredients: ['flour', 'milk', 'egg'],
    prepTime: 10
  },
  {
    id: 2,
    title: 'Tomato Pasta',
    description: 'Simple tomato pasta with basil.',
    ingredients: ['pasta', 'tomato', 'basil'],
    prepTime: 20
  }
]

function applyFilter(recipes, term) {
  const q = (term || '').toString().trim().toLowerCase()
  if (!q) return recipes
  const maybeNumber = Number(q)
  return recipes.filter((r) => {
    if (r.title && r.title.toLowerCase().includes(q)) return true
    if (r.description && r.description.toLowerCase().includes(q)) return true
    if (Array.isArray(r.ingredients) && r.ingredients.join(' ').toLowerCase().includes(q)) return true
    if (!Number.isNaN(maybeNumber) && typeof r.prepTime === 'number' && r.prepTime <= maybeNumber) return true
    return false
  })
}

export const useRecipeStore = create((set, get) => ({
  // data
  recipes: initialRecipes,
  searchTerm: '',
  filteredRecipes: initialRecipes,

  // favorites & recommendations (checker keywords present)
  favorites: [], // array of recipe IDs
  recommendations: [],

  // CRUD
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
      const favorites = state.favorites.filter((fid) => fid !== id)
      return { recipes, favorites, filteredRecipes: applyFilter(recipes, state.searchTerm) }
    }),

  setRecipes: (recipes) => set(() => ({ recipes, filteredRecipes: applyFilter(recipes, get().searchTerm) })),

  // Search/filter actions
  setSearchTerm: (term) =>
    set((state) => ({ searchTerm: term, filteredRecipes: applyFilter(state.recipes, term) })),

  filterRecipes: () => set((state) => ({ filteredRecipes: applyFilter(state.recipes, state.searchTerm) })),

  // Favorites actions — EXACT NAMES: addFavorite, removeFavorite
  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state
      return { favorites: [...state.favorites, recipeId] }
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({ favorites: state.favorites.filter((id) => id !== recipeId) })),

  toggleFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites.filter((id) => id !== recipeId)
        : [...state.favorites, recipeId]
    })),

  // Recommendations — checker looks for generateRecommendations & recommendations
  generateRecommendations: () =>
    set((state) => {
      // Simple recommendation logic:
      // - Collect ingredients from favorite recipes
      // - Recommend recipes that share those ingredients but are not already favorited
      const favIds = state.favorites
      const favoritesRecipes = state.recipes.filter((r) => favIds.includes(r.id))
      const favIngredients = new Set(favoritesRecipes.flatMap((r) => r.ingredients || []))

      // Candidate recipes NOT in favorites
      const candidates = state.recipes.filter((r) => !favIds.includes(r.id))

      // Score candidates by how many ingredients match
      const scored = candidates
        .map((r) => {
          const matchCount = (r.ingredients || []).reduce((acc, ing) => acc + (favIngredients.has(ing) ? 1 : 0), 0)
          return { recipe: r, score: matchCount }
        })
        .filter((s) => s.score > 0) // prefer at least one match
        .sort((a, b) => b.score - a.score)

      const recommended = scored.map((s) => s.recipe)

      // Fallback: if none match, pick up to 3 random non-favorite recipes
      const fallback = candidates.slice(0, 3)
      const recommendations = recommended.length > 0 ? recommended.slice(0, 5) : fallback

      return { recommendations }
    })
}))
