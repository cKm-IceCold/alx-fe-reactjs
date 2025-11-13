import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Automatically filter when the search term changes
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]); // Make sure filterRecipes is included in deps

  const displayList = searchTerm ? filteredRecipes : recipes;

  return (
    <div className="space-y-3">
      {displayList.length > 0 ? (
        displayList.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-3 rounded-md bg-gray-50 shadow-sm"
          >
            <Link
              to={`/recipe/${recipe.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {recipe.title}
            </Link>
            <p className="text-gray-700">{recipe.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
