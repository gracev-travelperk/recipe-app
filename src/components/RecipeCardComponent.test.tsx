import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { EditRecipeProps } from "../types/types";
import RecipeCard from "./RecipeCardComponent";

describe("RecipeCard Component", () => {
    const mockRecipe = {
        id: 1,
        name: "Spaghetti Bolognese",
        ingredients: ["spaghetti", "tomato sauce", "ground beef"],
        instructions: ["Cook spaghetti.", "Cook beef, mix in sauce.", "Serve."],
        image: "https://www.example.com/spaghetti.jpg",
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        servings: 4,
        cuisine: "Italian",
        difficulty: "Easy",
        notes: "",
        tags: ["pasta", "main course"],
        author: "Chef John",
        dateAdded: new Date().toISOString(),
        caloriesPerServing: 500,
        userId: 1,
        rating: 4.5,
        reviewCount: 10,
        mealType: ["Dinner"]
    };
    const mockDeleteRecipe = jest.fn();
    const mockUpdateRecipe = jest.fn();

    const setup = (editMode: boolean = false) => {
        const props: EditRecipeProps = {
            recipe: mockRecipe,
            deleteRecipe: mockDeleteRecipe,
            updateRecipe: mockUpdateRecipe,
            id: 1
        };

        render(<RecipeCard {...props} />);
        if (editMode) {
            userEvent.click(screen.getByRole("button", {name: /edit recipe/i}));
        };
    };

    it("should render the recipe card details correctly", () => {
        setup();
        expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
        expect(screen.getByRole("img", { name: mockRecipe.name })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /show Ingredients/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /show Instructions/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    });

    it("should toggle the ingredients when the button is clicked", async () => {
        setup();
        const user = userEvent.setup();
        const ingredientsButton = screen.getByRole("button", { name: /show Ingredients/i });

        await user.click(ingredientsButton);
        expect(screen.getByText("spaghetti, tomato sauce, ground beef")).toBeInTheDocument();

        await user.click(ingredientsButton);
        expect(screen.queryByText("spaghetti, tomato sauce, ground beef")).not.toBeInTheDocument();
    });

    it("should toggle the instructions when the button is clicked", async () => {
        setup();
        const user = userEvent.setup();
        const instructionsButton = screen.getByRole("button", { name: /show Instructions/i });

        await user.click(instructionsButton);
        expect(screen.getByText(/cook spaghetti\.cook beef, mix in sauce\.serve\./i)).toBeInTheDocument(); // need to use regex due to extra whitespace, commas

        await user.click(instructionsButton);
        expect(screen.queryByText(/cook spaghetti\.cook beef, mix in sauce\.serve\./i)).not.toBeInTheDocument();
    });

    it("should call deleteRecipe when the delete button is clicked", async () => {
        setup();
        const user = userEvent.setup();
        const deleteButton = screen.getByRole("button", { name: /delete/i });

        await user.click(deleteButton);
        expect(mockDeleteRecipe).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})