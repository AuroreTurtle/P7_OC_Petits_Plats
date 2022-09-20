import { displayRecipe, updatedOption } from "../utils/mainSearch.js";

let setTag = new Set();
/**
 * When the user clicks on an ingredient, the recipes that contain that ingredient are filtered and
 * displayed.
 * @param recipes - an array of objects
 */
function filterByIngredient(recipes) {
    const ingredient = document.querySelector("#choice_ingredient");
    ingredient.addEventListener("click", (e) => {
        result.innerHTML = "";
        setTag.add(e.target.dataset.value);
        // const filteredRecipe = recipes.filter((element) =>
        //     element.ingredients.some((el) => el.ingredient.includes(e.target.dataset.value))
        // );
        const filteredRecipe = recipes.filter((element) =>
            element.ingredients.some((el) => el.ingredient === e.target.dataset.value)
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
        setTag.add(e.target.dataset.value);
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
        setTag.add(e.target.dataset.value);
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
        setTag.delete(e.target.parentNode.textContent);
        // console.log(setTag);

        /////////// A MODIFIER : mettre dans factory ///////////////

        const tagSelected = document.querySelectorAll(".tag");
        let tagIngredient = [];
        let tagAppliance = [];
        let tagUstensil = [];

        for (let x = 0; x < tagSelected.length; x++) {
            if (tagSelected[x].dataset.category === "ingredient") {
                tagIngredient.push(tagSelected[x].textContent);
                tagIngredient = tagIngredient.filter(onlyUnique);
            } else if (tagSelected[x].dataset.category === "appliance") {
                tagAppliance.push(tagSelected[x].textContent);
                tagAppliance = tagAppliance.filter(onlyUnique);
            } else if (tagSelected[x].dataset.category === "ustensil") {
                tagUstensil.push(tagSelected[x].textContent);
                tagUstensil = tagUstensil.filter(onlyUnique);
            } else {
                console.log("not found");
            }
        }
        // console.log("ingredient: " + tagIngredient);
        // console.log("appareil: " + tagAppliance);
        // console.log("ustensile: " + tagUstensil);

        if (tagIngredient.length > 0 && tagAppliance.length > 0 && tagUstensil.length > 0) {
            console.log("ok IAU");
            let filteredRecipe = recipes.filter((element) => {
                for (let us = 0; us < element.ustensils.length; us++) {
                    if (
                        element.ingredients.some((el) => el.ingredient == tagIngredient) &&
                        element.appliance.includes(tagAppliance) &&
                        element.ustensils[us] == tagUstensil
                    ) {
                        return true;
                    }
                }
                return false;
            });
            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else if (tagIngredient.length > 0 && tagAppliance.length > 0) {
            console.log("ok IA");
            let filteredRecipe = recipes.filter(
                (element) =>
                    element.ingredients.some((el) => el.ingredient == tagIngredient) &&
                    element.appliance.includes(tagAppliance)
            );
            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else if (tagIngredient.length > 0 && tagUstensil.length > 0) {
            console.log("ok IU");
            let filteredRecipe = recipes.filter((element) => {
                for (let us = 0; us < element.ustensils.length; us++) {
                    if (
                        element.ingredients.some((el) => el.ingredient == tagIngredient) &&
                        element.ustensils[us] == tagUstensil
                    ) {
                        return true;
                    }
                }
                return false;
            });
            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else if (tagAppliance.length > 0 && tagUstensil.length > 0) {
            console.log("ok AU");
            let filteredRecipe = recipes.filter((element) => {
                for (let us = 0; us < element.ustensils.length; us++) {
                    if (element.appliance.includes(tagAppliance) && element.ustensils[us] == tagUstensil) {
                        return true;
                    }
                }
                return false;
            });
            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else if (tagIngredient.length > 0) {
            console.log("ok I");
            if (tagIngredient.length > 1) {
                let filteredRecipe = recipes.filter((element) =>
                    element.ingredients.some((el) => el.ingredient == tagIngredient[0])
                );
                for (let i = 1; i < tagIngredient.length; i++) {
                    filteredRecipe = filteredRecipe.filter((element) =>
                        element.ingredients.some((el) => el.ingredient == tagIngredient[i])
                    );
                    console.log(filteredRecipe);
                    result.innerHTML = "";
                    displayRecipe(filteredRecipe);
                    updatedOption(filteredRecipe);
                    tagSearch(filteredRecipe);
                }
            } else {
                let filteredRecipe = recipes.filter((element) =>
                    element.ingredients.some((el) => el.ingredient == tagIngredient)
                );
                console.log(filteredRecipe);
                result.innerHTML = "";
                displayRecipe(filteredRecipe);
                updatedOption(filteredRecipe);
                tagSearch(filteredRecipe);
            }
        } else if (tagAppliance.length > 0) {
            console.log("ok A");
            let filteredRecipe = recipes.filter((element) => element.appliance.includes(tagAppliance));
            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else if (tagUstensil.length > 0) {
            console.log("ok U");
            // let filteredRecipe = recipes.filter((element) => element.ustensils.includes(tagUstensil));
            let filteredRecipe = recipes.filter((element) => {
                for (let us = 0; us < element.ustensils.length; us++) {
                    if (element.ustensils[us] == tagUstensil) {
                        return true;
                    }
                }
                return false;
            });

            console.log(filteredRecipe);
            result.innerHTML = "";
            displayRecipe(filteredRecipe);
            updatedOption(filteredRecipe);
            tagSearch(filteredRecipe);
        } else {
            console.log("error not found");
        }
        ///////////////////////////////////////////////////////////////////////////
        // element?.ingredients.some((el) => el.ingredient.includes(arrayTag[i])) &&
        //     element?.appliance.includes(arrayTag[i]) &&
        //     element?.ustensils.includes(arrayTag[i]);
        // console.log(element.appliance.includes(arrayTag[i]));

        /////////// FIN MODIFICATION ///////////////

        if (setTag.size === 0) {
            result.innerHTML = "";
            displayRecipe(recipes);
            addChoice();
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
