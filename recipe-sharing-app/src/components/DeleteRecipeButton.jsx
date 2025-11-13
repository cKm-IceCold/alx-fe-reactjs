import useRecipeStore  from './recipeStore';
import { useNavigate } from 'react-router-dom'; // ✅ Required import

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); // ✅ Create navigate function

  const handleDelete = () => {
    deleteRecipe(recipeId); // remove from Zustand store
    navigate('/'); // ✅ Redirect to the home or recipe list page
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
