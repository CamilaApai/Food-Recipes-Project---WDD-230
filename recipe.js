
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "967e9f7f7b064bc78101c0dd46ff250c"; 

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const image = urlParams.get("image");
    const id = urlParams.get("id");

    const recipeTitle = document.getElementById("recipe-title");
    const recipeImage = document.getElementById("recipe-image");
    const recipeIngredients = document.getElementById("recipe-ingredients");
    const recipeSteps = document.getElementById("recipe-steps");

    recipeTitle.textContent = title;
    recipeImage.src = image;

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
  
        const ingredients = data.extendedIngredients;
        const steps = data.analyzedInstructions[0] && data.analyzedInstructions[0].steps;

        if (ingredients) {
            ingredients.forEach((ingredient) => {
                const li = document.createElement("li");
                li.textContent = `${ingredient.original}`;
                recipeIngredients.appendChild(li);

                const ingredientImage = document.createElement("img");
                ingredientImage.src = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
                recipeIngredients.appendChild(ingredientImage);
            });
        }

        if (steps) {
            steps.forEach((step) => {
                const li = document.createElement("li");
                li.textContent = `${step.step}`;
                recipeSteps.appendChild(li);
            });
        }
    })
    .catch((error) => {
        console.error("Error obtaining the recipe details:", error);
    });

});
