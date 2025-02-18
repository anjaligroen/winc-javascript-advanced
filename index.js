// Final Assessment: JavaScript Advanced, by Anjali Groen

'use strict';
const prompt = require("prompt-sync")();
const util = require('node:util');
const cakeRecipes = require("./cake-recipes.json");
// apparently I do not need to JSON.parse() method, this list because the require function automatically does so. 


// FUNCTIONS:
// * FUNCTION 1: 'GET UNIQUE AUTHORS' 
// * FUNCTION 2: 'LOG RECIPE NAMES' 
// * FUNCTION 3: 'GET RECIPES BY AUTHOR'
// * FUNCTION 4: 'GET RECIPE BY INGREDIENT'
// * FUNCTION 5: 'GET RECIPE BY NAME'
// * FUNCTION 6: 'GET ALL INGREDIENTS'

// FUNCTION 1: 'GET UNIQUE AUTHORS' 
// This function gives a list of the authors of a list of recipes without repeating any author twice. 
const getUniqueAuthors = (recipeList) => {
  const uniqueAuthorList = []  //list cannot be introduced inside the forEach loop because it resets every loop. 
  
  recipeList.forEach((recipe) => {
  if (!uniqueAuthorList.includes(recipe.Author)) { //if the author is not already included we add it to the uniqueAuthorList.
    uniqueAuthorList.push(recipe.Author);
  }
})
  return uniqueAuthorList;

};

// logging function 1:
console.log("\n LOGGING FUNCTION 1 'GET UNIQUE AUTHORS': ");
console.log(getUniqueAuthors(cakeRecipes)); //listing the authors of the cakeRecipes to the console

// FUNCTION 2: 'LOG RECIPE NAMES' 
// This function hands the recipe names of a list of recipes.
const logRecipeNames = (recipeList) => {
  if (recipeList.length === 0) {
    return "No recipes are found."
  }
  else {
  return recipeList.forEach(({Name}) => console.log(Name));}
}

//logging function 2:
console.log("\n LOGGING FUNCTION 2 'LOG RECIPE NAMES: ");
logRecipeNames(cakeRecipes); //listing the recipe names of the first 25 recipes of cakeRecipes
const noCakeRecipes = [];
logRecipeNames(noCakeRecipes); 

// FUNCTION 3: 'GET RECIPES BY AUTHOR'
// This function returns a list of the recipes of a given author.
const getRecipesbyAuthor = (recipeList, nameAuthor) => {
  return recipeList.filter(({Author}) => Author.includes(nameAuthor)); //chose .includes string method to make input a bit more lenient.
}

// logging function 3:
const nancyRecipeList = getRecipesbyAuthor(cakeRecipes, "Nancy"); 
const maryRecipeList = getRecipesbyAuthor(cakeRecipes, "Mary"); 

console.log("\n LOGGING FUNCTION 3: 'GET RECIPES BY AUTHOR' ");
logRecipeNames(nancyRecipeList); //logging the recipe name(s) of Nancy
logRecipeNames(maryRecipeList); //logging the recipe names of Mary

// FUNCTION 4: 'GET RECIPE BY INGREDIENT'
// This function checks if the recipe list contains certain ingredients and returns the recipes that contain tese ingredients in a list. 
const getRecipesbyIngredient = (recipeList, ingredient) => {
    return recipeList.filter(({Ingredients}) => 
      Ingredients.some(element => element.includes(ingredient)));
    } // The .includes() method only works on strings not on cakeRecipes.Ingredients/{Ingredients} which is an array. 
// For this reason, I use the some() method to scan whether the ingredient is included in any of the string elements of {Ingredients}.

// logging function 4:
console.log("\n LOGGING FUNCTION 4: 'GET RECIPES BY INGREDIENT' ")
const CasterSugarRecipes = getRecipesbyIngredient(cakeRecipes, "140g caster sugar");
logRecipeNames(CasterSugarRecipes);

// FUNCTION 5: 'GET RECIPE BY NAME'
// This function will return a single recepe when given (part of) a recipe name. 
const getRecipebyName = (recipeList, recipename) => recipeList.find(({Name}) => Name.includes(recipename));

// logging function 5: 
console.log("\n LOGGING FUNCTION 5: 'GET RECIPE BY NAME' ")
const nancyChristmasCake = getRecipebyName(cakeRecipes, "Nancy"); 
console.log(nancyChristmasCake);

// FUNCTION 6: 'GET ALL INGREDIENTS'
// Flattens and returns all ingredients from the recipe list in a single array.
const getAllIngredients = (recipeList) => {
  return recipeList.reduce((acc, { Ingredients }) => acc.concat(Ingredients), [])
}; 

// logging Function 6: 
console.log("\n LOGGING FUNCTION 6: 'GET ALL INGREDIENTS");
let savedRecipes = JSON.parse(JSON.stringify(cakeRecipes.slice(0, 5))); //Made a deep copy of some cakeRecipes (so future mutations can be made) to act as the savedRecipe list of users/. 
console.log(getAllIngredients(savedRecipes));                           // savedRecipes is saved as a global value so it is easy to reusable.



// PART 2: RECIPE MANEGEMENT SYSTEM
// a do...while loop that handles user choices through a switch statement.

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
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("1. Show All Authors");
      console.log("2. Show Authors of your Saved Recipes");
      let authorListChoice = prompt("Enter a number (1-2) or 0 to go back to the menu. ");
      authorListChoice = parseInt(authorListChoice); // Parse the choice as a integrer 
      
      switch (authorListChoice) { //bringing in a nested switch statement here. 
        case 1:
          console.log("All authors: ");
          console.log(getUniqueAuthors(cakeRecipes));
          break;
        case 2:
          console.log("The authors of your saved recipes: ");
          console.log(getUniqueAuthors(savedRecipes));
          break;
        case 0:
          break;
        default: 
          console.log("\nInvalid input, please enter a valid number.");
      }

      break;
    case 2:
      let choiceAuthor = prompt("Insert Author: "); 
      console.log(`\nThe recipes by ${choiceAuthor}: \n`);
      logRecipeNames((getRecipesbyAuthor(cakeRecipes, choiceAuthor)));
      
      break;
    case 3:
      let choiceIngredient = prompt("Insert ingredient: ");
      console.log(`\nThe recipes containing ${choiceIngredient}: \n`);
      logRecipeNames((getRecipesbyIngredient(cakeRecipes, choiceIngredient)));

      break;
    case 4:
      let choiceName = prompt("Insert recipe name: ");
      let recipeByName = (getRecipebyName(cakeRecipes, choiceName));
      
      if (!recipeByName) {
        console.log ("\nSorry, there is no recipe by this name. "); //If the prompt does not bring up a recipe, it will tell the user. 
        break;
      } else {
        console.log(recipeByName); //First show recipe to user, after ask whether user wants to save recipe. 
        let saveChoice = prompt("Would you like to save this recipe? (Y/N): ").toUpperCase();  
        if (saveChoice === "Y") {
          if (savedRecipes.some(recipe => util.isDeepStrictEqual(recipe, recipeByName))) { //check if the recipe (object) is already saved or not using util library. 
            console.log("\nThis recipe is already saved. Your saved recipes:");            //Can't check this by recipe name because there are some distinct recipes have similar name. 
            logRecipeNames(savedRecipes);
          } else {
            savedRecipes.push(recipeByName);
            console.log("\nYour saved recipes: \n");
            logRecipeNames(savedRecipes);
          }
        } 
        else if (saveChoice === "N") {
        break;
        } else {
          console.log ("\nPlease answer Y/N. ");   //This brings us back to the main menu, alternatively, the choiceName prompt and prompts in other cases could be asked again in a loop. 
        }
      }

        break;
    case 5:
      console.log("Your saved recipes: \n");
      logRecipeNames(savedRecipes);
      console.log("\n Here is a list of all the ingredients of your saved recipes: \n");
      console.log(getAllIngredients(savedRecipes));

      break;
    case 0:
      console.log("\nExiting...");
      break;
    default:
      console.log("\nInvalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0); 
