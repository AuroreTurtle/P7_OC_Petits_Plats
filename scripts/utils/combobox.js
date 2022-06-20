////////////////////////////////////////////////////////////////////////////
// /!\ Pas demandé supprimer tag après sélectionner mais le faire si le temps
/////////////////////////////////////////////////////////////////////////////

const combobox = document.querySelector("#combobox");
const comboboxBtn = combobox.querySelectorAll(".combobox_btn");

// Ingredient
const comboboxIngredient = document.querySelector("#combobox_ingredient");
const inputIngredient = combobox.querySelector("#ingredient");
const optionsIngredient = combobox.querySelector("#choice_ingredient");
const choicesIngredient = getIngredients(recipes);

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
        recipe.ingredients.forEach((object) =>
            listIngredients.push(object.ingredient)
        );
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
function addChoice(selectedChoice) {
    optionsIngredient.innerText = "";
    choicesIngredient.forEach((choice) => {
        const isSelected = choice === selectedChoice ? "selected" : "";
        const liIngredient = `<li onclick="selectOption()" class="${isSelected}" data-value='${choice}'>${choice}</li>`;
        optionsIngredient.insertAdjacentHTML("beforeend", liIngredient);
    });

    optionsAppliance.innerText = "";
    choicesAppliance.forEach((choice) => {
        const isSelected = choice === selectedChoice ? "selected" : "";
        const liAppliance = `<li onclick="selectOption()" class="${isSelected}" data-value='${choice}'>${choice}</li>`;
        optionsAppliance.insertAdjacentHTML("beforeend", liAppliance);
    });

    optionsUstensil.innerText = "";
    choicesUstensil.forEach((choice) => {
        const isSelected = choice === selectedChoice ? "selected" : "";
        const liUstensil = `<li onclick="selectOption()" class="${isSelected}" data-value='${choice}'>${choice}</li>`;
        optionsUstensil.insertAdjacentHTML("beforeend", liUstensil);
    });
}

function updateOption() {
    // Ingredient
    inputIngredient.addEventListener("keyup", () => {
        console.log(inputIngredient.value);
        if (inputIngredient.value.length > 0) {
            comboboxIngredient.classList.add("active");
            optionsIngredient.innerHTML = "";
            let choiceInput =
                inputIngredient.value[0].toUpperCase() +
                inputIngredient.value.slice(1);
            let filteredList = choicesIngredient.filter((option) =>
                option.includes(choiceInput)
            );
            for (let option of filteredList) {
                optionsIngredient.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption()" data-value='${option}'>${option}</li>`
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
            let choiceInput =
                inputAppliance.value[0].toUpperCase() +
                inputAppliance.value.slice(1);
            let filteredList = choicesAppliance.filter((option) =>
                option.includes(choiceInput)
            );
            for (let option of filteredList) {
                optionsAppliance.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption()" data-value='${option}'>${option}</li>`
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
            let choiceInput =
                inputUstensil.value[0].toUpperCase() +
                inputUstensil.value.slice(1);
            let filteredList = choicesUstensil.filter((option) =>
                option.includes(choiceInput)
            );
            for (let option of filteredList) {
                optionsUstensil.insertAdjacentHTML(
                    "beforeend",
                    `<li onclick="selectOption()" data-value='${option}'>${option}</li>`
                );
            }
        } else {
            addChoice(choicesUstensil);
        }
    });
}

function selectOption() {
    const tags = document.querySelector("#option_selected");

    // Ingredient
    optionsIngredient.addEventListener("click", (e) => {
        const spanTag = document.createElement("span");
        spanTag.classList.add("tag");
        spanTag.textContent = e.target.dataset.value;
        spanTag.insertAdjacentHTML(
            "beforeend",
            `<i class="fa-regular fa-circle-xmark"></i>`
        );
        spanTag.style.background = "#3282f7";
        tags.appendChild(spanTag);

        inputIngredient.value = "";
        addChoice(choicesIngredient);

        comboboxIngredient.classList.remove("active");
        inputIngredient.setAttribute("placeholder", "Ingrédients");
    });

    // Appliance
    optionsAppliance.addEventListener("click", (e) => {
        const spanTag = document.createElement("span");
        spanTag.classList.add("tag");
        spanTag.textContent = e.target.dataset.value;
        spanTag.insertAdjacentHTML(
            "beforeend",
            `<i class="fa-regular fa-circle-xmark"></i>`
        );
        spanTag.style.background = "#68D9A4";
        tags.appendChild(spanTag);

        inputAppliance.value = "";
        addChoice(choicesAppliance);

        comboboxAppliance.classList.remove("active");
        inputAppliance.setAttribute("placeholder", "Appareils");
    });

    // Ustensil
    optionsUstensil.addEventListener("click", (e) => {
        const spanTag = document.createElement("span");
        spanTag.classList.add("tag");
        spanTag.textContent = e.target.dataset.value;
        spanTag.insertAdjacentHTML(
            "beforeend",
            `<i class="fa-regular fa-circle-xmark"></i>`
        );
        spanTag.style.background = "#ED6454";
        tags.appendChild(spanTag);

        inputUstensil.value = "";
        addChoice(choicesUstensil);

        comboboxUstensil.classList.remove("active");
        inputUstensil.setAttribute("placeholder", "Ustensiles");
    });
}

addChoice();
