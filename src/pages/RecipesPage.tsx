import { useState } from "react";
import recipes from '../api/mockData.json'
import { Recipe } from "../types/types";
import RecipeForm from "../components/RecipeFormComponent";
import RecipesList from "../components/RecipesListComponent";
import Navbar from "../components/NavbarComponent";


export default function RecipesPage() {
    const [recipeIdeas, setRecipeIdeas] = useState<Recipe[]>(recipes.recipes || []);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes.recipes || []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const query = e.target.value;
        setSearchTerm(query);
        const searchedRecipes = recipeIdeas.filter((recipe: Recipe) => recipe.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredRecipes(searchedRecipes);
    }
    const addRecipe = (newRecipe: Recipe) => {
        setRecipeIdeas((prevRecipes) => [...prevRecipes, newRecipe]);
        setFilteredRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
        setShowForm(false);
    }
    const deleteRecipe = (targetId: number) => {
        const newRecipes = recipeIdeas.filter((recipe: Recipe) => recipe.id !== targetId);
        setRecipeIdeas(newRecipes);
        setFilteredRecipes(newRecipes.filter((recipe: Recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    const updateRecipe = (id: number, updatedRecipe: Recipe) => {
        const newRecipes = recipeIdeas.map((recipe: Recipe) => (recipe.id === id ? updatedRecipe : recipe));
        setRecipeIdeas(newRecipes);
        setFilteredRecipes(newRecipes.filter((recipe: Recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    return (
        <>
        <Navbar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            showForm={showForm}
            setShowForm={setShowForm}
        />
        {showForm && <RecipeForm addRecipe={addRecipe}/>}
        <RecipesList
            recipes={filteredRecipes}
            searchTerm={searchTerm}
            deleteRecipe={deleteRecipe}
            updateRecipe={updateRecipe}
        />
        </>
    )

}