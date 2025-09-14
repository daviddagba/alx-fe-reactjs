import React, { useState } from 'react'
import { useRecipeStore } from '../store/recipeStore'


const AddRecipeForm = () => {
const addRecipe = useRecipeStore((state) => state.addRecipe)
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')


const handleSubmit = (e) => {
e.preventDefault()
const trimmedTitle = title.trim()
const trimmedDesc = description.trim()
if (!trimmedTitle) return


const newRecipe = {
id: Date.now(),
title: trimmedTitle,
description: trimmedDesc,
}


addRecipe(newRecipe)
setTitle('')
setDescription('')
}


return (
<form onSubmit={handleSubmit} className="add-recipe-form">
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Title"
required
/>


<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description"
/>


<button type="submit">Add Recipe</button>
</form>
)
}


export default AddRecipeForm