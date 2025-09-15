import React from 'react'
import { useRecipeStore } from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  if (!recipes || recipes.length === 0) {
    return <div>No recipes yet — add one above!</div>
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}

export default RecipeList
