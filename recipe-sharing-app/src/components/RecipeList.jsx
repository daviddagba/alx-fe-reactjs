import React from 'react'
import { useRecipeStore } from './recipeStore'


export default function RecipeList() {
const recipes = useRecipeStore((state) => state.recipes)


if (!recipes || recipes.length === 0) {
return <p>No recipes yet — be the first to add one!</p>
}


return (
<div>
{recipes.map((recipe) => (
<article key={recipe.id} style={{ border: '1px solid #eee', padding: 12, marginBottom: 12, borderRadius: 8 }}>
<h3 style={{ margin: '0 0 6px' }}>{recipe.title}</h3>
<p style={{ margin: 0 }}>{recipe.description}</p>
</article>
))}
</div>
)
}