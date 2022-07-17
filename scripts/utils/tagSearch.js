import { displayRecipe, updatedOption } from "../utils/mainSearch.js";

/**
 * When the user clicks on an ingredient, the recipes that contain that ingredient are filtered and
 * displayed.
 * @param recipes - an array of objects
 */
function filterByIngredient(recipes) {
    const ingredient = document.querySelector("#choice_ingredient");
    ingredient.addEventListener("click", (e) => {
        result.innerHTML = "";
        const filteredRecipe = recipes.filter((element) =>
            element.ingredients.some((el) => el.ingredient.includes(e.target.dataset.value))
        );
        updatedOption(filteredRecipe);
        displayRecipe(filteredRecipe);
        tagSearch(filteredRecipe);
    });
}

/**
 * When the user clicks on an appliance, the recipes that contain that appliance are filtered and
 * displayed.
 * @param recipes - an array of objects
 */
function filterByAppliance(recipes) {
    const appliance = document.querySelector("#choice_appliance");
    appliance.addEventListener("click", (e) => {
        result.innerHTML = "";
        const filteredRecipe = recipes.filter((element) => element.appliance.includes(e.target.dataset.value));
        updatedOption(filteredRecipe);
        displayRecipe(filteredRecipe);
        tagSearch(filteredRecipe);
    });
}

/**
 * When the user clicks on an ustensil, the recipes that contain that ustensil are filtered and
 * displayed.
 * @param recipe - the array of objects
 */
function filterByUstensil(recipe) {
    const ustensil = document.querySelector("#choice_ustensil");
    ustensil.addEventListener("click", (e) => {
        result.innerHTML = "";
        const filteredRecipe = recipe.filter((element) => element.ustensils.includes(e.target.dataset.value));
        updatedOption(filteredRecipe);
        displayRecipe(filteredRecipe);
        tagSearch(filteredRecipe);
    });
}

/* When the user clicks on the tag element, the result is emptied, the all recipes and options are displayed. */
const tag = document.querySelector("#option_selected");
tag.addEventListener("click", (e) => {
    if (e.target.dataset.name == "icone") {
        result.innerHTML = "";
        displayRecipe(recipes);
        addChoice();
        filterByIngredient(recipes);
        filterByAppliance(recipes);
        filterByUstensil(recipes);
    }
});

/**
 * It takes a recipe object and calls three functions that filter the recipe object based on the user's
 * input.
 * @param recipe - the recipe object
 */
export function tagSearch(recipe) {
    filterByIngredient(recipe);
    filterByAppliance(recipe);
    filterByUstensil(recipe);
}

filterByIngredient(recipes);
filterByAppliance(recipes);
filterByUstensil(recipes);
