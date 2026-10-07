'use strict';

const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");

const getAuthors = (recipes) => {
    const authors = [];

    recipes.forEach((recipe) => {
        if (!authors.includes(recipe.Author)) {
            authors.push(recipe.Author);
        }
    });

    return authors;
};

const printRecipeNames = (recipes) => {
    if (recipes.length === 0) {
        console.log("No recipes found.");
        return;
    }

    recipes.forEach((recipe) => {
        const { Name } = recipe;
        console.log(Name);
    });
};

const getRecipesByAuthor = (recipes, author) => {
    return recipes.filter((recipe) => {
        return recipe.Author === author;
    });
};

const getRecipesByIngredient = (recipes, ingredient) => {
    return recipes.filter((recipe) => {
        return recipe.Ingredients.some((recipeIngredient) => {
            return recipeIngredient.includes(ingredient);
        });
    });
};

const getRecipeByName = (recipes, name) => {
    const recipe = recipes.find((recipe) => {
        return recipe.Name.includes(name);
    });

    return recipe || null;
};

const getAllIngredients = (recipes) => {
    return recipes.reduce((allIngredients, recipe) => {
        return [...allIngredients, ...recipe.Ingredients];
    }, []);
};

let savedRecipes = [];

const displayMenu = () => {
    console.log("\nRecipe Management System Menu:");
    console.log("1. Show All Authors");
    console.log("2. Show Recipe names by Author");
    console.log("3. Show Recipe names by Ingredient");
    console.log("4. Get Recipe by Name");
    console.log("5. Get All Ingredients of Saved Recipes");
    console.log("0. Exit");

    const choice = prompt("Enter a number (1-5) or 0 to exit: ");

    return parseInt(choice);
};

let choice;

do {
    choice = displayMenu();

    switch (choice) {

        case 1: {
            const authors = getAuthors(cakeRecipes);

            authors.forEach((author) => {
                console.log(author);
            });

            break;
        }

        case 2: {
            const author = prompt("Enter the name of an author: ");

            const recipes = getRecipesByAuthor(
                cakeRecipes,
                author
            );

            printRecipeNames(recipes);

            break;
        }

        case 3: {
            const ingredient = prompt("Enter an ingredient: ");

            const recipes = getRecipesByIngredient(
                cakeRecipes,
                ingredient
            );

            printRecipeNames(recipes);

            break;
        }

        case 4: {
            const name = prompt("Enter the name of a recipe: ");

            const recipe = getRecipeByName(
                cakeRecipes,
                name
            );

            if (recipe) {
                console.log(recipe);

                const save = prompt(
                    "Do you want to save this recipe? yes/no: "
                );

                if (save === "yes") {
                    savedRecipes.push(recipe);
                    console.log("Recipe saved.");
                }

            } else {
                console.log("Recipe not found.");
            }

            break;
        }

        case 5: {
            const ingredients = getAllIngredients(savedRecipes);

            console.log(ingredients);

            break;
        }

        case 0:
            console.log("Exiting...");
            break;

        default:
            console.log(
                "Invalid input. Please enter a number between 0 and 5."
            );
    }

} while (choice !== 0);
