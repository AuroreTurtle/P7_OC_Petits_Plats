import { recipeFactory } from "../factories/recipeFactory.js";
import { tagSearch } from "./tagSearch.js";

const searchInput = document.querySelector("#search");
const result = document.querySelector("#result");

/**
 * It takes an array of recipes and for each recipe in the array, it calls the recipeFactory function
 * and passes the recipe as an argument.
 * @param recipes - an array of objects
 */
export function displayRecipe(recipes) {
    recipes.forEach((recipe) => recipeFactory(recipe));
}

searchInput.addEventListener("input", filterRecipe());

/**
 * It filters the recipes array based on the search input value, and displays the results
 */
function filterRecipe() {
    searchInput.addEventListener("keyup", () => {
        if (searchInput.value.length >= 3) {
            result.innerHTML = "";
            const searchString = searchInput.value.toLowerCase();
            let t0 = performance.now();
            const filteredArray = recipes.filter(
                (element) =>
                    element.name.toLowerCase().includes(searchString) ||
                    element.description.toLowerCase().includes(searchString) ||
                    element.ingredients.some((el) => el.ingredient.toLowerCase().includes(searchString))
            );
            let t1 = performance.now();
            console.log(t1 - t0, "ms");
            if (filteredArray == 0) {
                result.innerHTML = `<p>Aucune recette ne correspond à votre critère … Vous pouvez 
                chercher « tarte aux pommes », « poisson », etc</p>`;
            } else {
                displayRecipe(filteredArray);

                updatedOption(filteredArray);
                tagSearch(filteredArray);
            }
        }
        // else {
        //     result.innerHTML = "";
        //     displayRecipe(recipes);
        //     updatedOption(recipes);
        // }
    });
}

/**
 * It takes an array of recipes, filters the ingredients, appliances and utensils, and then updates the
 * options in the dropdown menus
 * @param recipes - an array of objects
 */
export function updatedOption(recipes) {
    // Ingredient
    const filteredIngredients = getIngredients(recipes);
    optionsIngredient.innerText = "";
    filteredIngredients.forEach((choice) => {
        const liIngredient = `<li data-value="${choice}">${choice}</li>`;
        optionsIngredient.insertAdjacentHTML("beforeend", liIngredient);
    });

    // Appliance
    const filteredAppliances = getAppliances(recipes);
    optionsAppliance.innerText = "";
    filteredAppliances.forEach((choice) => {
        const liAppliance = `<li data-value="${choice}">${choice}</li>`;
        optionsAppliance.insertAdjacentHTML("beforeend", liAppliance);
    });

    // Ustensil
    const filteredUstensils = getUstensils(recipes);
    optionsUstensil.innerText = "";
    filteredUstensils.forEach((choice) => {
        const liUstensil = `<li data-value="${choice}">${choice}</li>`;
        optionsUstensil.insertAdjacentHTML("beforeend", liUstensil);
    });
}
