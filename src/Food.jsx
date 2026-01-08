import React from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import { findRecipesByIngredients, getFullRecipe } from "./api/spoonacular";

export default function Food() {
  const [ingredients, setIngredients] = React.useState([
    "pasta",
    "tomato",
    "cheese",
    "onion",
  ]);

  const [recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
    setRecipes([]);
    setSelectedRecipe(null);
  }

  async function getRecipes() {
    setLoading(true);
    const data = await findRecipesByIngredients(ingredients);
    setRecipes(data);
    setLoading(false);
  }

  async function viewFullRecipe(id) {
    setLoading(true);
    const fullRecipe = await getFullRecipe(id);
    setSelectedRecipe(fullRecipe);
    setLoading(false);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input type="text" placeholder="e.g. oregano" name="ingredient" />
        <button>Add ingredient</button>
      </form>

      <IngredientsList ingredients={ingredients} getRecipes={getRecipes} />

      {loading && <p>Loading...</p>}

      {recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} width="200" />
              <button onClick={() => viewFullRecipe(recipe.id)}>
                View Full Recipe
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && <Recipe recipe={selectedRecipe} />}
    </main>
  );
}
