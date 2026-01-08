import React from "react";
import { askChefGPT } from "./api/huggingface";

export default function Recipe({ recipe }) {
  const [chefResponse, setChefResponse] = React.useState("");

  async function askChef() {
    const prompt = `
You are a professional chef.
Explain this recipe in a friendly way.

Recipe: ${recipe.title}
Ingredients: ${recipe.extendedIngredients.map((i) => i.name).join(", ")}
    `;

    const response = await askChefGPT(prompt);
    setChefResponse(response);
  }

  return (
    <section>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} width="300" />

      <h3>Ingredients</h3>
      <ul>
        {recipe.extendedIngredients.map((i) => (
          <li key={i.id}>{i.original}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

      <button onClick={askChef}>Ask Chef GPT 🤖🍳</button>

      {chefResponse && <p>{chefResponse}</p>}
    </section>
  );
}
