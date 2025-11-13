import React from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

const App = () => {
  return (
    <div className="max-w-lg mx-auto my-10 p-5 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6">🍳 Recipe Sharing App</h1>
      <SearchBar /> {/* ✅ New Search Component */}
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
};

export default App;
