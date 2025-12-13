import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Simulating fetching data
        setRecipes(recipeData);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-4">Recipe Sharing Platform</h1>
            <div className="text-center mb-8">
                <Link to="/add-recipe" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Add Recipe
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 list-none gap-8">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer">
                        <Link to={`/recipe/${recipe.id}`}>
                            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                                <p className="text-gray-600">{recipe.summary}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;