import { displayRecipe, updatedOption } from "../utils/mainSearch.js";

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

const tag = document.querySelector("#option_selected");
tag.addEventListener("click", () => {
    result.innerHTML = "";
    displayRecipe(recipes);
    addChoice();
    filterByIngredient(recipes);
    filterByAppliance(recipes);
    filterByUstensil(recipes);
});

export function tagSearch(recipe) {
    filterByIngredient(recipe);
    filterByAppliance(recipe);
    filterByUstensil(recipe);
}

filterByIngredient(recipes);
filterByAppliance(recipes);
filterByUstensil(recipes);
