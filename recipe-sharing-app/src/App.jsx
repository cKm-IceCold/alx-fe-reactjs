import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  return (
    <Router>
      <div className="max-w-lg mx-auto my-10 p-5 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">🍳 Recipe Sharing App</h1>
        <SearchBar /> {/* Search Component */}
        <AddRecipeForm />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
