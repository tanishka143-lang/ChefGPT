export async function findRecipesByIngredients(ingredients) {
  const ingredientsString = ingredients.join(",");

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=5&ranking=2&ignorePantry=true&apiKey=${
    import.meta.env.VITE_SPOONACULAR_KEY
  }`;

  const res = await fetch(url);
  return await res.json();
}

export async function getFullRecipe(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${
    import.meta.env.VITE_SPOONACULAR_KEY
  }`;

  const res = await fetch(url);
  return await res.json();
}
