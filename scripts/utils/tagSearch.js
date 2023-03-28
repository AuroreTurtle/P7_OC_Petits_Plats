import { displayRecipe, updatedOption } from "../utils/mainSearch.js";

let setTagIng = new Set();
let setTagApp = new Set();
let setTagUst = new Set();

/**
 * When the user clicks on an ingredient, the recipes that contain that ingredient are filtered and
 * displayed.
 * @param recipes - an array of objects
 */
function filterByIngredient(recipes) {
    const ingredient = document.querySelector("#choice_ingredient");
    ingredient.addEventListener("click", (e) => {
        result.innerHTML = "";
        setTagIng.add(e.target.dataset.value);
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
        setTagApp.add(e.target.dataset.value);
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
        setTagUst.add(e.target.dataset.value);
        const filteredRecipe = recipe.filter((element) => element.ustensils.includes(e.target.dataset.value));
        updatedOption(filteredRecipe);
        displayRecipe(filteredRecipe);
        tagSearch(filteredRecipe);
    });
}

/* When the user deletes on the tag element, the all recipes and options are updated. */
const tag = document.querySelector("#option_selected");
tag.addEventListener("click", (e) => {
    if (e.target.dataset.name == "icone") {
        setTagIng.delete(e.target.parentNode.textContent);
        setTagApp.delete(e.target.parentNode.textContent);
        setTagUst.delete(e.target.parentNode.textContent);

        if (setTagIng.size > 0 && setTagApp.size > 0 && setTagUst.size > 0) {
            for (let i = 0; i < Array.from(setTagUst).length; i++) {
                const filteredRecipe = recipes.filter(
                    (element) =>
                        element.ingredients.some((el) => el.ingredient.includes(Array.from(setTagIng))) &&
                        element.appliance.includes(Array.from(setTagApp)) &&
                        element.ustensils.includes(Array.from(setTagUst)[i])
                );
                result.innerHTML = "";
                updatedOption(filteredRecipe);
                displayRecipe(filteredRecipe);
                tagSearch(filteredRecipe);
            }

        } else if (setTagIng.size == 0 && setTagApp.size > 0 && setTagUst.size > 0) {
            for (let i = 0; i < Array.from(setTagUst).length; i++) {
                const filteredRecipe = recipes.filter(
                    (element) =>
                        element.appliance.includes(Array.from(setTagApp)) &&
                        element.ustensils.includes(Array.from(setTagUst)[i])
                );
                result.innerHTML = "";
                updatedOption(filteredRecipe);
                displayRecipe(filteredRecipe);
                tagSearch(filteredRecipe);
            }

        } else if (setTagIng.size > 0 && setTagApp.size == 0 && setTagUst.size > 0) {
            for (let i = 0; i < Array.from(setTagUst).length; i++) {
                const filteredRecipe = recipes.filter(
                    (element) =>
                        element.ingredients.some((el) => el.ingredient.includes(Array.from(setTagIng))) &&
                        element.ustensils.includes(Array.from(setTagUst)[i])
                );
                result.innerHTML = "";
                updatedOption(filteredRecipe);
                displayRecipe(filteredRecipe);
                tagSearch(filteredRecipe);
            }

        } else if (setTagIng.size > 0 && setTagApp.size > 0 && setTagUst.size == 0) {
            const filteredRecipe = recipes.filter(
                (element) =>
                    element.ingredients.some((el) => el.ingredient.includes(Array.from(setTagIng))) &&
                    element.appliance.includes(Array.from(setTagApp))
            );
            result.innerHTML = "";
            updatedOption(filteredRecipe);
            displayRecipe(filteredRecipe);
            tagSearch(filteredRecipe);

        } else if (setTagIng.size > 0 && setTagApp.size == 0 && setTagUst.size == 0) {
            const filteredRecipe = recipes.filter((element) =>
                element.ingredients.some((el) => el.ingredient.includes(Array.from(setTagIng)))
            );
            result.innerHTML = "";
            updatedOption(filteredRecipe);
            displayRecipe(filteredRecipe);
            tagSearch(filteredRecipe);

        } else if (setTagIng.size == 0 && setTagApp.size > 0 && setTagUst.size == 0) {
            const filteredRecipe = recipes.filter((element) => element.appliance.includes(Array.from(setTagApp)));
            result.innerHTML = "";
            updatedOption(filteredRecipe);
            displayRecipe(filteredRecipe);
            tagSearch(filteredRecipe);

        } else if (setTagIng.size == 0 && setTagApp.size == 0 && setTagUst.size > 0) {
            for (let i = 0; i < Array.from(setTagUst).length; i++) {
                const filteredRecipe = recipes.filter((element) =>
                    element.ustensils.includes(Array.from(setTagUst)[i])
                );
                result.innerHTML = "";
                updatedOption(filteredRecipe);
                displayRecipe(filteredRecipe);
                tagSearch(filteredRecipe);
            }

        } else {
            result.innerHTML = "";
            updatedOption(recipes);
            displayRecipe(recipes);
            tagSearch(recipes);
        }
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
