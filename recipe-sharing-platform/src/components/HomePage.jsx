import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'
import recipesData from '../data.json' // static import from src/data.json

export default function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // load mock data on mount per task requirement
    // using static import ensures Vite bundles it; we set state in useEffect to follow the instruction
    setRecipes(recipesData)
  }, [])

  const handleView = (recipe) => {
    // placeholder: in the next tasks you can navigate to recipe details
    alert(`Open recipe: ${recipe.title}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Recipes
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Browse and discover delicious recipes contributed by our community.
          </p>
        </header>

        <section aria-labelledby="recipes-heading">
          <h2 id="recipes-heading" className="sr-only">Recipes list</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No recipes found.
              </div>
            ) : (
              recipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} onView={handleView} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
