import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  // Generate recommendations on component mount
  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Recommended for You</h2>
      {recommendations.length === 0 && <p>No recommendations available.</p>}
      {recommendations.map((recipe) => (
        <div key={recipe.id} className="border p-3 rounded mb-2 bg-green-50">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
