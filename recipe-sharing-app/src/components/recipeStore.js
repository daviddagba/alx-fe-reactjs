import { create } from 'zustand'


export const useRecipeStore = create((set) => ({
// seed with an example so the UI shows something initially
recipes: [
{
id: 1,
title: 'Sample Pancakes',
description: 'Easy fluffy pancakes — 3 ingredients: flour, milk, egg.'
}
],


// Add a recipe
addRecipe: (newRecipe) =>
set((state) => ({ recipes: [...state.recipes, newRecipe] })),


// Replace the recipe list (useful if you want to hydrate from an API)
setRecipes: (recipes) => set({ recipes })
}))