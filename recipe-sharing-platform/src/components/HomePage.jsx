import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import recipesData from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  const handleView = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Recipes
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Browse and discover delicious recipes contributed by the community.
          </p>
        </header>

        <section aria-labelledby="recipes-heading">
          <h2 id="recipes-heading" className="sr-only">
            Recipes list
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No recipes found.
              </div>
            ) : (
              recipes.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
                >
                  <RecipeCard recipe={r} onView={handleView} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
