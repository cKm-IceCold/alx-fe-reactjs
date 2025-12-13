import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const recipeId = parseInt(id);
        const foundRecipe = recipeData.find((r) => r.id === recipeId);
        if (foundRecipe) {
            setRecipe(foundRecipe);
        } else {
            // Handle recipe not found, maybe redirect or show message
        }
    }, [id]);

    if (!recipe) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 mb-8">
            <button
                onClick={() => navigate('/')}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
                &larr; Back to Home
            </button>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 md:h-96 object-cover" />
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{recipe.summary}</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Ingredients</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Instructions</h2>
                            <ol className="list-decimal list-inside space-y-3 text-gray-700">
                                {recipe.instructions && recipe.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;