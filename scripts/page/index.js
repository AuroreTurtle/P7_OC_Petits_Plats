import { displayRecipe } from "../utils/mainSearch.js";

/**
 * The function `init()` calls the function `displayRecipe()` and passes the variable `recipes` as an
 * argument.
 *
 * The function `displayRecipe()` takes the argument `recipes` and loops through the array of objects.
 * For each object, it creates a new element and adds it.
 */
function init() {
    displayRecipe(recipes);
}

init();
