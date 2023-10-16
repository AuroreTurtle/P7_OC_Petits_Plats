/**
 * It creates a article of recipe with the name, description, ingredients and time
 */
export function recipeFactory(recipe) {
    const { image, name, ingredients, time, description } = recipe;

    const picture = `assets/image/${image}`;

    const result = document.querySelector("#result");

    const article = document.createElement("article");

    const infoRecipe = document.createElement("div");
    infoRecipe.className = "info";

    //Image recipe
    const imageRecipe = document.createElement("img");
    imageRecipe.setAttribute("src", picture);
    imageRecipe.setAttribute("alt", name);
    imageRecipe.className = "image";

    // Header recipe
    const headerRecipe = document.createElement("div");
    headerRecipe.className = "info_header";

    // Title recipe
    const titleRecipe = document.createElement("h2");
    titleRecipe.textContent = name;

    // Time recipe
    const timeRecipe = document.createElement("div");
    timeRecipe.className = "info_time";
    const timeNumber = document.createElement("span");
    timeNumber.textContent = `${time} min`;

    const iconeTime = document.createElement("i");
    iconeTime.className = "fa-regular fa-clock";

    // Complement
    const complementInfo = document.createElement("div");
    complementInfo.className = "info_complement";

    // Ingredients recipe
    const ul = document.createElement("ul");
    ul.className = "list_ingredient";
    ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = `${ingredient.ingredient}`;

        if (ingredient.quantity !== undefined) {
            const quantityIngredient = document.createElement("span");
            quantityIngredient.textContent = ` : ${ingredient.quantity}`;
            if (ingredient.unit !== undefined) {
                quantityIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;

                if (ingredient.unit === "grammes") {
                    ingredient.unit = "g";
                    quantityIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
                }

                if (ingredient.unit === "litres") {
                    ingredient.unit = "L";
                    quantityIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
                }

                if (ingredient.unit === "cuillères à soupe") {
                    ingredient.unit = "c. à soupe";
                    quantityIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
                }

                if (ingredient.unit === "cuillères à café") {
                    ingredient.unit = "c. à café";
                    quantityIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
                }
            }
            li.appendChild(quantityIngredient);
        }
        ul.appendChild(li);
    });

    // Description recipe
    const descriptionRecipe = document.createElement("p");
    descriptionRecipe.textContent = description;
    descriptionRecipe.className = "info_description";

    result.appendChild(article);
    article.appendChild(imageRecipe);
    article.appendChild(infoRecipe);
    infoRecipe.appendChild(headerRecipe);
    headerRecipe.appendChild(titleRecipe);
    headerRecipe.appendChild(timeRecipe);
    timeRecipe.appendChild(iconeTime);
    timeRecipe.appendChild(timeNumber);
    infoRecipe.appendChild(complementInfo);
    complementInfo.appendChild(ul);
    complementInfo.appendChild(descriptionRecipe);
}
