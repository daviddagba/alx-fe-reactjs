import React, { useState } from 'react'
import { useRecipeStore } from './recipeStore'


export default function AddRecipeForm() {
const addRecipe = useRecipeStore((state) => state.addRecipe)
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')


const handleSubmit = (e) => {
e.preventDefault()
const trimmedTitle = title.trim()
const trimmedDesc = description.trim()
if (!trimmedTitle || !trimmedDesc) return


addRecipe({ id: Date.now(), title: trimmedTitle, description: trimmedDesc })


// reset form
setTitle('')
setDescription('')
}


return (
<form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
<div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
<input
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Title"
style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
/>
</div>


<div style={{ marginBottom: 8 }}>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description"
rows={3}
style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
/>
</div>


<button type="submit" style={{ padding: '8px 12px', borderRadius: 6 }}>
Add Recipe
</button>
</form>
)
}