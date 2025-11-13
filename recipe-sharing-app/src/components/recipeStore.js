import { create } from 'zustand';

 const useRecipeStore = create((set, get) => ({
  // ✅ Existing data
  recipes: [],
  // ✅ Search term user types into the SearchBar
  searchTerm: '',
  // ✅ Filtered results based on search
  filteredRecipes: [],

  // --- Actions ---
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.recipes, newRecipe], // keep filtered list updated
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
      filteredRecipes: state.filteredRecipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // ✅ Store the search term in state
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // immediately run filtering whenever search term updates
  },

  // ✅ Filter recipes based on search term
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));

export default useRecipeStore;
