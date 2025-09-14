import React from 'react'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import './index.css'


const App = () => {
return (
<div className="app-container">
<header>
<h1>Recipe Sharing App</h1>
</header>


<main>
<AddRecipeForm />
<RecipeList />
</main>
</div>
)
}


export default App