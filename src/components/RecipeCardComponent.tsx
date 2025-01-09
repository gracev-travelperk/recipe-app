import { useState, useEffect } from "react";
import { EditRecipeProps, Recipe } from "../types/types";

export default function RecipeCard({
  recipe,
  deleteRecipe,
  id,
  updateRecipe,
}: EditRecipeProps) {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(recipe);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showIngredients, setShowIngredients] = useState<boolean>(false);

  useEffect(() => {
    setCurrentRecipe(recipe);
    setEditedRecipe(recipe);
  }, [recipe]);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "ingredients" || name === "instructions") {
      setEditedRecipe({
        ...editedRecipe,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setEditedRecipe({
        ...editedRecipe,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRecipe(id, editedRecipe);
    setCurrentRecipe(editedRecipe);
    setEditMode(false);
  };

  return (
    <div key={id} className="recipe-card">
      <h3>{currentRecipe.name}</h3>
      <img src={currentRecipe.image} alt={currentRecipe.name} />
      <button onClick={() => setShowIngredients(!showIngredients)}>
        {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
      </button>
      {showIngredients && <p>{currentRecipe.ingredients.join(", ")}</p>}
      <button onClick={() => setShowInstructions(!showInstructions)}>
        {showInstructions ? "Hide Instructions" : "Show Instructions"}
      </button>
      {showInstructions && <p>{currentRecipe.instructions}</p>}
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Edit Recipe"}
      </button>
      <button onClick={() => deleteRecipe(id)} className="delete-btn">
        Delete
      </button>

      {editMode && (
        <div className="edit-form-container">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h4>Edit Recipe</h4>
            <input
              type="text"
              name="name"
              value={editedRecipe.name}
              onChange={handleEdit}
              placeholder="Recipe Name"
              required
            />
            <textarea
              name="ingredients"
              value={editedRecipe.ingredients.join(", ")}
              onChange={handleEdit}
              placeholder="Ingredients"
              required
            />
            <textarea
              name="instructions"
              value={editedRecipe.instructions.join(", ")}
              onChange={handleEdit}
              placeholder="Instructions"
              required
            />
            <input
              type="text"
              name="image"
              value={editedRecipe.image}
              onChange={handleEdit}
              placeholder="Image URL"
              required
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}
