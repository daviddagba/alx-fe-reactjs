import React from "react";

export default function RecipeCard({ recipe, onView }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
      <div className="h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{recipe.summary}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onView && onView(recipe)}
            className="text-sm font-medium px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            aria-label={`View ${recipe.title}`}
          >
            View
          </button>
          <span className="text-xs text-gray-400">ID: {recipe.id}</span>
        </div>
      </div>
    </article>
  );
}
