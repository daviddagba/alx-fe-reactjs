import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const rid = parseInt(id, 10);
    const found = recipesData.find((r) => r.id === rid);
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600">Recipe not found.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 underline">
            Back to recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to recipes
          </Link>
        </div>

        <article className="bg-gray-50 rounded-2xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:w-1/2">
              <h1 className="text-2xl font-extrabold mb-2">{recipe.title}</h1>
              <p className="text-gray-700 mb-4">{recipe.summary}</p>

              <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="mb-1">{ing}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">No ingredients listed.</li>
                  )}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">Instructions</h2>
                {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
                  <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                    {recipe.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500">No instructions provided.</p>
                )}
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
