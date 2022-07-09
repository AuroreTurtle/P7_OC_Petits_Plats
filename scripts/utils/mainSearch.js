import { recipeFactory } from "../factories/recipeFactory.js";
import { tagSearch } from "./tagSearch.js";

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
            let t0 = performance.now();
            let filteredArray = [];
            for (let i = 0; i < recipes.length; i++) {
                for (let a = 0; a < recipes[i].ingredients.length; a++) {
                    if (
                        recipes[i].ingredients[a].ingredient.toLowerCase().includes(searchString) ||
                        recipes[i].name.toLowerCase().includes(searchString) ||
                        recipes[i].description.toLowerCase().includes(searchString)
                    ) {
                        if (filteredArray.indexOf(recipes[i]) === -1) {
                            filteredArray.push(recipes[i]);
                        }
                    }
                }
            }
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
        } else {
            result.innerHTML = "";
            displayRecipe(recipes);
            updatedOption(recipes);
        }
    });
}

export function updatedOption(recipes) {
    // Ingredient
    const filteredIngredients = getIngredients(recipes);
    optionsIngredient.innerText = "";
    filteredIngredients.forEach((choice) => {
        const liIngredient = `<li onclick="selectOption(this)" data-value='${choice}'>${choice}</li>`;
        optionsIngredient.insertAdjacentHTML("beforeend", liIngredient);
    });

    // Appliance
    const filteredAppliances = getAppliances(recipes);
    optionsAppliance.innerText = "";
    filteredAppliances.forEach((choice) => {
        const liAppliance = `<li onclick="selectOption(this)" data-value='${choice}'>${choice}</li>`;
        optionsAppliance.insertAdjacentHTML("beforeend", liAppliance);
    });

    // Ustensil
    const filteredUstensils = getUstensils(recipes);
    optionsUstensil.innerText = "";
    filteredUstensils.forEach((choice) => {
        const liUstensil = `<li onclick="selectOption(this)" data-value='${choice}'>${choice}</li>`;
        optionsUstensil.insertAdjacentHTML("beforeend", liUstensil);
    });
}
