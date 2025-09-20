import React from 'react'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'

import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <Router>
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem', fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ margin: 0 }}>Recipe Sharing App</h1>
          <nav><Link to="/">Home</Link></nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />        {/* search input */}
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
