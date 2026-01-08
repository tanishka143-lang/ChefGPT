export default function IngredientsList({ ingredients, getRecipes }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>

      <ul>
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {ingredients.length > 3 && (
        <button onClick={getRecipes}>Get Recipes 🍳</button>
      )}
    </section>
  );
}
