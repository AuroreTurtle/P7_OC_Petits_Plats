const combobox = document.querySelector("#combobox");
const comboboxBtn = combobox.querySelectorAll(".combobox_btn");

// Ingredient
const comboboxIngredient = document.querySelector("#combobox_ingredient");
const inputIngredient = combobox.querySelector("#ingredient");
const optionsIngredient = combobox.querySelector("#choice_ingredient");
let choicesIngredient = getIngredients(recipes);

comboboxBtn[0].addEventListener("click", () => {
    comboboxIngredient.classList.toggle("active");
    comboboxAppliance.classList.remove("active");
    comboboxUstensil.classList.remove("active");

    inputIngredient.toggleAttribute("placeholder");
    inputIngredient.setAttribute("placeholder", "Rechercher un ingrédient");
    inputAppliance.setAttribute("placeholder", "Appareils");
    inputUstensil.setAttribute("placeholder", "Ustensiles");
});

// Appliance
const comboboxAppliance = document.querySelector("#combobox_appliance");
const inputAppliance = combobox.querySelector("#appliance");
const optionsAppliance = combobox.querySelector("#choice_appliance");
const choicesAppliance = getAppliances(recipes);

comboboxBtn[1].addEventListener("click", () => {
    comboboxAppliance.classList.toggle("active");
    comboboxIngredient.classList.remove("active");
    comboboxUstensil.classList.remove("active");

    inputAppliance.setAttribute("placeholder", "Rechercher un appareil");
    inputIngredient.setAttribute("placeholder", "Ingrédients");
    inputUstensil.setAttribute("placeholder", "Ustensiles");
});

// Ustensil
const comboboxUstensil = document.querySelector("#combobox_ustensil");
const inputUstensil = combobox.querySelector("#ustensil");
const optionsUstensil = combobox.querySelector("#choice_ustensil");
const choicesUstensil = getUstensils(recipes);

comboboxBtn[2].addEventListener("click", () => {
    comboboxUstensil.classList.toggle("active");
    comboboxIngredient.classList.remove("active");
    comboboxAppliance.classList.remove("active");

    inputUstensil.setAttribute("placeholder", "Rechercher un ustensile");
    inputIngredient.setAttribute("placeholder", "Ingrédients");
    inputAppliance.setAttribute("placeholder", "Appareils");
});

//////////////////////////////////////////////////////////
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getIngredients(recipes) {
    const listIngredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((object) => listIngredients.push(object.ingredient));
    });
    const filteredIngredients = listIngredients.filter(onlyUnique);
    filteredIngredients.sort((a, b) => a.localeCompare(b));
    return filteredIngredients;
}

function getAppliances(recipes) {
    const listAppliances = [];
    recipes.forEach((recipe) => {
        listAppliances.push(recipe.appliance);
    });
    const filteredAppliances = listAppliances.filter(onlyUnique);
    filteredAppliances.sort((a, b) => a.localeCompare(b));
    return filteredAppliances;
}

function getUstensils(recipes) {
    const listUstensil = [];
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((object) => listUstensil.push(object));
    });
    const filteredUstensils = listUstensil.filter(onlyUnique);
    filteredUstensils.sort((a, b) => a.localeCompare(b));
    return filteredUstensils;
}

/////////////////////////////////////////////////////////////////
function addChoice() {
    // Ingredient
    optionsIngredient.innerText = "";
    choicesIngredient.forEach((choice) => {
        const liIngredient = `<li onclick="selectOption(this)" data-value=${choice}">${choice}</li>`;
        optionsIngredient.insertAdjacentHTML("beforeend", liIngredient);
    });

    // Appliance
    optionsAppliance.innerText = "";
    choicesAppliance.forEach((choice) => {
        const liAppliance = `<li onclick="selectOption(this)" data-value="${choice}">${choice}</li>`;
        optionsAppliance.insertAdjacentHTML("beforeend", liAppliance);
    });

    // Ustensil
    optionsUstensil.innerText = "";
    choicesUstensil.forEach((choice) => {
        const liUstensil = `<li onclick="selectOption(this)" data-value="${choice}">${choice}</li>`;
        optionsUstensil.insertAdjacentHTML("beforeend", liUstensil);
    });
}

function searchOption() {
    // Ingredient
    inputIngredient.addEventListener("keyup", () => {
        if (inputIngredient.value.length > 0) {
            comboboxIngredient.classList.add("active");
            optionsIngredient.innerHTML = "";
            let choiceInput = inputIngredient.value[0].toUpperCase() + inputIngredient.value.slice(1);
            let filteredList = choicesIngredient.filter(
                (option) => option.includes(choiceInput) || option.includes(inputIngredient.value.toLowerCase())
            );
            for (let option of filteredList) {
                optionsIngredient.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption(this)" data-value='${option}'>${option}</li>`
                );
            }
        } else {
            addChoice(choicesIngredient);
        }
    });

    // Appliance
    inputAppliance.addEventListener("keyup", () => {
        if (inputAppliance.value.length > 0) {
            comboboxAppliance.classList.add("active");
            optionsAppliance.innerHTML = "";
            let choiceInput = inputAppliance.value[0].toUpperCase() + inputAppliance.value.slice(1);
            let filteredList = choicesAppliance.filter(
                (option) => option.includes(choiceInput) || option.includes(inputAppliance.value.toLowerCase())
            );
            for (let option of filteredList) {
                optionsAppliance.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption(this)" data-value='${option}'>${option}</li>`
                );
            }
        } else {
            addChoice(choicesAppliance);
        }
    });

    // Ustensil
    inputUstensil.addEventListener("keyup", () => {
        if (inputUstensil.value.length > 0) {
            comboboxUstensil.classList.add("active");
            optionsUstensil.innerHTML = "";
            let choiceInput = inputUstensil.value[0].toUpperCase() + inputUstensil.value.slice(1);
            let filteredList = choicesUstensil.filter(
                (option) => option.includes(choiceInput) || option.includes(inputUstensil.value.toLowerCase())
            );
            for (let option of filteredList) {
                console.log(option);
                optionsUstensil.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption(this)" data-value='${option}'>${option}</li>`
                );
            }
        } else {
            addChoice(choicesUstensil);
        }
    });
}

function selectOption(e) {
    const tags = document.querySelector("#option_selected");
    const spanTag = document.createElement("span");
    spanTag.classList.add("tag");
    spanTag.setAttribute("data-value", e.dataset.value);
    spanTag.textContent = e.dataset.value;
    spanTag.insertAdjacentHTML("beforeend", `<i onclick="removeTag(this)" class="fa-regular fa-circle-xmark"></i>`);
    tags.appendChild(spanTag);

    if (e.parentNode.id === "choice_ingredient") {
        spanTag.style.background = "#3282f7";
        spanTag.setAttribute("data-category", "ingredient");

        inputIngredient.value = "";

        comboboxIngredient.classList.remove("active");
        inputIngredient.setAttribute("placeholder", "Ingrédients");
    } else if (e.parentNode.id === "choice_appliance") {
        spanTag.style.background = "#68d9a4";
        spanTag.setAttribute("data-category", "appliance");

        inputAppliance.value = "";

        comboboxAppliance.classList.remove("active");
        inputAppliance.setAttribute("placeholder", "Appareils");
    } else if (e.parentNode.id === "choice_ustensil") {
        spanTag.style.background = "#ed6454";
        spanTag.setAttribute("data-category", "ustensil");

        inputUstensil.value = "";

        comboboxUstensil.classList.remove("active");
        inputUstensil.setAttribute("placeholder", "Ustensiles");
    } else {
        console.log("Not found");
    }
}

function removeTag(e) {
    e.parentNode.remove();
}

addChoice();
