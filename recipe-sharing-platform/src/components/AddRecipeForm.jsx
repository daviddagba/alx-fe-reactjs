import React, { useState, useEffect } from "react";

/**
 * AddRecipeForm
 *
 * Props:
 * - onAdd(recipeObject)  (optional) : callback called with the new recipe object after successful submit.
 *
 * Behavior:
 * - Validates: title non-empty, ingredients textarea contains at least 2 non-empty lines, instructions contains at least 1 non-empty line.
 * - Parses ingredients & instructions by newlines (also accepts comma-separated if you want).
 * - If onAdd isn't provided, it shows a success message and clears the form.
 */
export default function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // optional URL
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation logic
  useEffect(() => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    // Ingredients: split by newline, filter non-empty
    const ingredients = ingredientsText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingredients.length < 2) newErrors.ingredients = "Enter at least 2 ingredients (one per line).";

    const instructions = instructionsText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (instructions.length < 1) newErrors.instructions = "Enter at least one preparation step (one per line).";

    setErrors(newErrors);
  }, [title, ingredientsText, instructionsText]);

  const isValid = Object.keys(errors).length === 0;

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function parseList(text) {
    // prefer newline-separated; also support comma-separated if only commas present
    const lines = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (lines.length > 0) return lines;
    // fallback: split by comma
    return text.split(",").map((s) => s.trim()).filter(Boolean);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ title: true, ingredients: true, instructions: true });
    if (!isValid) return;

    setSubmitting(true);
    // build new recipe object
    const newRecipe = {
      id: Date.now(), // temporary id; parent can replace with better id scheme
      title: title.trim(),
      summary: instructionsText.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 2).join(" "),
      image: image.trim() || `https://via.placeholder.com/800x600?text=${encodeURIComponent(title.trim())}`,
      ingredients: parseList(ingredientsText),
      instructions: parseList(instructionsText),
    };

    try {
      // simulate async (e.g., API) — if caller expects a promise, they can await onAdd
      if (onAdd) {
        await onAdd(newRecipe);
      } else {
        // local success UX
        setSuccessMessage("Recipe added (local). You can wire onAdd to persist it.");
      }
      // clear form
      setTitle("");
      setImage("");
      setIngredientsText("");
      setInstructionsText("");
      setTouched({});
      // clear errors (will be recalculated by effect)
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      // If onAdd throws, show a generic error
      setSuccessMessage("Failed to add recipe. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
      noValidate
    >
      <h2 className="text-2xl font-extrabold mb-4">Add a new recipe</h2>

      {successMessage && (
        <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="md:col-span-1">
          <span className="block text-sm font-medium text-gray-700 mb-1">Title *</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              touched.title && errors.title ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="e.g., Spaghetti Carbonara"
            aria-invalid={!!(touched.title && errors.title)}
            aria-describedby={touched.title && errors.title ? "title-error" : undefined}
          />
          {touched.title && errors.title && (
            <p id="title-error" className="mt-1 text-xs text-red-600">
              {errors.title}
            </p>
          )}
        </label>

        <label className="md:col-span-2">
          <span className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</span>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="https://example.com/image.jpg"
          />
        </label>
      </div>

      <div className="mt-4">
        <label>
          <span className="block text-sm font-medium text-gray-700 mb-1">Ingredients *</span>
          <textarea
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            onBlur={() => handleBlur("ingredients")}
            rows={5}
            placeholder={"Enter one ingredient per line\nE.g.\n200g flour\n2 eggs\nSalt"}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              touched.ingredients && errors.ingredients ? "border-red-300" : "border-gray-200"
            }`}
            aria-invalid={!!(touched.ingredients && errors.ingredients)}
            aria-describedby={touched.ingredients && errors.ingredients ? "ingredients-error" : undefined}
          />
          {touched.ingredients && errors.ingredients && (
            <p id="ingredients-error" className="mt-1 text-xs text-red-600">
              {errors.ingredients}
            </p>
          )}
        </label>
      </div>

      <div className="mt-4">
        <label>
          <span className="block text-sm font-medium text-gray-700 mb-1">Preparation Steps *</span>
          <textarea
            value={instructionsText}
            onChange={(e) => setInstructionsText(e.target.value)}
            onBlur={() => handleBlur("instructions")}
            rows={6}
            placeholder={"Enter one step per line\nE.g.\nBoil water\nAdd pasta and cook 8-10 minutes"}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              touched.instructions && errors.instructions ? "border-red-300" : "border-gray-200"
            }`}
            aria-invalid={!!(touched.instructions && errors.instructions)}
            aria-describedby={touched.instructions && errors.instructions ? "instructions-error" : undefined}
          />
          {touched.instructions && errors.instructions && (
            <p id="instructions-error" className="mt-1 text-xs text-red-600">
              {errors.instructions}
            </p>
          )}
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Fields marked with <span className="font-medium">*</span> are required.
        </p>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className={`inline-flex items-center px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${
            !isValid || submitting ? "bg-blue-200 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Adding..." : "Add Recipe"}
        </button>
      </div>
    </form>
  );
}
