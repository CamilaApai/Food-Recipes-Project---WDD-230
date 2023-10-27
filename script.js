
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "967e9f7f7b064bc78101c0dd46ff250c"; 

  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const recipeList = document.getElementById("recipeList");
  let recipes = []; 

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return; 

    recipeList.innerHTML = "";

  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        recipes = data.results; 

        if (recipes.length === 0) {
          recipeList.innerHTML = "No recipes found.";
        } else {
          recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
              <h2>${recipe.title}</h2>
              <div class="image-container">
                <img src="${recipe.image}" alt="${recipe.title}">
                <button class="view-recipe" data-index="${index}">View Recipe</button>
              </div>
            `;
            recipeList.appendChild(recipeCard);
          });
        }
      })
      .catch((error) => {
        console.error("Error obtaining the recipes:", error);
      });
  });

  recipeList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("view-recipe")) {
      const index = target.getAttribute("data-index");
      const selectedRecipe = recipes[index];
      window.location.href = `./recipe.html?title=${encodeURIComponent(selectedRecipe.title)}&image=${encodeURIComponent(selectedRecipe.image)}&id=${selectedRecipe.id}`;
    }
  });
});