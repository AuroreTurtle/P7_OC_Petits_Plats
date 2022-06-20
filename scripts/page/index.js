import { recipeFactory } from "../factories/recipeFactory.js";

function displayRecipe(recipes) {
    recipes.forEach((recipe) => recipeFactory(recipe));
}

function init() {
    displayRecipe(recipes);
}

init();
