import RecipeCard from "./RecipeCardComponent";
import { Recipe, RecipeListProps } from "../types/types";

export default function RecipesList({
  recipes,
  searchTerm,
  deleteRecipe,
  updateRecipe,
}: RecipeListProps) {
  return (
    <>
      {recipes.length > 0 ? (
        <div className="search-results-container">
          {recipes.map((recipe: Recipe, id: number) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              deleteRecipe={() => deleteRecipe(recipe.id)}
              updateRecipe={() => updateRecipe(id, recipe)}
              id={id}
            />
          ))}
        </div>
      ) : (
        <div className="no-recipes-msg">
          <p>Sorry, no recipes match your search "{searchTerm}".</p>
        </div>
      )}
    </>
  );
}
