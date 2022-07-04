import { recipeFactory } from "../factories/recipeFactory.js";

const searchInput = document.querySelector("#search");
const result = document.querySelector("#result");

export function displayRecipe(recipes) {
    recipes.forEach((recipe) => recipeFactory(recipe));
}

searchInput.addEventListener("input", filterRecipe());

function filterRecipe() {
    searchInput.addEventListener("keyup", () => {
        if (searchInput.value.length >= 3) {
            result.innerHTML = "";
            const searchString = searchInput.value.toLowerCase();

            const filteredArray = recipes.filter(
                (element) =>
                    element.name.toLowerCase().includes(searchString) ||
                    element.description.toLowerCase().includes(searchString) ||
                    element.ingredients.some((el) => el.ingredient.toLowerCase().includes(searchString))
            );

            if (filteredArray == 0) {
                result.innerHTML = `<p>Aucune recette ne correspond à votre critère … Vous pouvez 
                chercher « tarte aux pommes », « poisson », etc</p>`;
            } else {
                displayRecipe(filteredArray);
            }
        } else {
            result.innerHTML = "";
            displayRecipe(recipes);
        }
    });
}
