import React from 'react';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  // Grab the raw favorites IDs and recipes separately
  const favoritesIds = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);

  // Compute the favorites list in a local variable (no store setter here!)
  const favoriteRecipes = favoritesIds.map(id => recipes.find(r => r.id === id)).filter(Boolean);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">My Favorites</h2>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="border p-3 mb-2 rounded-md">
            <h3 className="font-semibold">{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
