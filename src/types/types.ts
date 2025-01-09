export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export interface RecipeFormProps {
  addRecipe: (newRecipe: Recipe) => void;
}

export interface RecipeCardProps {
  recipe: Recipe;
  deleteRecipe: (id: number) => void;
  id: number;
}

export interface EditRecipeProps extends RecipeCardProps {
  updateRecipe: (id: number, updatedRecipe: Recipe) => void;
}

export interface RecipeListProps {
  recipes: Recipe[];
  searchTerm: string;
  deleteRecipe: (id: number) => void;
  updateRecipe: (id: number, recipe: Recipe) => void;
}

export interface SearchBarProps {
  searchTerm: string;
  handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NavbarProps {
  searchTerm: string;
  handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}