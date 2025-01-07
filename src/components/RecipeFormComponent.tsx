import { useState } from "react";
import { Recipe,  RecipeFormProps } from "../types/types";

export default function RecipeForm({addRecipe}: RecipeFormProps) {
    const [recipeInfo, setRecipeInfo] = useState<Recipe>({
    id: 0,
    name: '',
    ingredients: [],
    instructions: [],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 0,
    difficulty: '',
    cuisine: '',
    caloriesPerServing: 0,
    tags: [],
    userId: 0,
    image: '',
    rating: 0,
    reviewCount: 0,
    mealType: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted recipe:', recipeInfo);
        addRecipe({...recipeInfo, id: Math.floor(Math.random() * 1000)});
        setRecipeInfo({...recipeInfo, id: 0, name: '', ingredients: [], instructions: [], prepTimeMinutes: 0, cookTimeMinutes: 0, servings: 0, difficulty: '', cuisine: '', caloriesPerServing: 0, tags: [], userId: 0, image: '', rating: 0, reviewCount: 0, mealType: []});
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // setRecipeInfo(prevRecipeInfo => ({
        //     ...prevRecipeInfo,
        //     [name]: name === 'ingredients' || name === 'instructions' ? value.split(',').map((item) => item.trim()) : value
        // }));
        if (name === 'ingredients' || name === 'instructions') {
            setRecipeInfo({
                ...recipeInfo,
                //[name]: value.split(', ').map((item) => item.trim())})
                [name]: value})
        } else {
            setRecipeInfo({
                ...recipeInfo,
                [name]: value
            });
        }
    }

    return (
        <>
        <form className="recipe-form" onSubmit={handleSubmit}>
            <h2>
                Add New Recipe
            </h2>
            <input type="text" name="name" placeholder="Recipe Name" value={recipeInfo.name} onChange={handleChange} required/>
            <textarea name="ingredients" placeholder="Ingredients" value={recipeInfo.ingredients} onChange={handleChange} required/>
            <textarea name="instructions" placeholder="Instructions" value={recipeInfo.instructions} onChange={handleChange} required/>
            <label> Prep Time (mins):
                <input type="number" name="prepTimeMinutes" placeholder="Prep Time (minutes)" value={recipeInfo.prepTimeMinutes} onChange={handleChange} required/>
            </label>
            <label> Cook Time (mins):
                <input type="number" name="cookTimeMinutes" placeholder="Cook Time (minutes)" value={recipeInfo.cookTimeMinutes} onChange={handleChange} required/>
            </label>
            <input type="text" name="difficulty" placeholder="Difficulty" value={recipeInfo.difficulty} onChange={handleChange} required/>
            <input type="text" name="image" placeholder="Image URL" value={recipeInfo.image} onChange={handleChange} required/>
            <button type="submit">Add Recipe</button>
        </form>
        </>
    )
}