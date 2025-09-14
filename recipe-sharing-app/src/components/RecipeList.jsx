import React from 'react'
import { useRecipeStore } from '../components/recipeStore'


const RecipeList = () => {
const recipes = useRecipeStore((state) => state.recipes)


if (!recipes || recipes.length === 0) {
return <div>No recipes yet — add one above!</div>
}


return (
<div className="recipe-list">
{recipes.map((recipe) => (
<article key={recipe.id} className="recipe-card">
<h3>{recipe.title}</h3>
<p>{recipe.description}</p>
</article>
))}
</div>
)
}


export default RecipeList