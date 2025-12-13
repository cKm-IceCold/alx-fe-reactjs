import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!summary) newErrors.summary = 'Summary is required';
        if (!ingredients) {
            newErrors.ingredients = 'Ingredients are required';
        } else if (ingredients.split('\n').filter(item => item.trim() !== '').length < 2) {
            newErrors.ingredients = 'Please include at least 2 ingredients';
        }
        if (!steps) newErrors.steps = 'Steps are required';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Mock submission
        const newRecipe = {
            title,
            summary,
            ingredients: ingredients.split('\n'),
            steps: steps.split('\n'),
            image: image || 'https://via.placeholder.com/150'
        };
        console.log('Submitted Recipe:', newRecipe);

        // Reset form and errors
        setTitle('');
        setSummary('');
        setIngredients('');
        setSteps('');
        setImage('');
        setErrors({});

        alert('Recipe added successfully!');
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Recipe</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 md:p-8 space-y-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Recipe Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Spaghetti Bolognese"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Summary</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Brief description of the dish"
                    />
                    {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Ingredients (one per line)</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="200g Pasta&#10;100g Cheese"
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Preparation Steps</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="1. Boil water&#10;2. Cook pasta"
                    />
                    {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Image URL (Optional)</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 duration-300 focus:outline-none focus:shadow-outline"
                    >
                        Add Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipeForm;