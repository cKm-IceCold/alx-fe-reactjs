import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <button
      onClick={() => deleteRecipe(recipeId)}
      className="text-red-500 mt-2"
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
