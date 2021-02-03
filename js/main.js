const userInput = document.querySelector('.userInput');
const searchBtn = document.querySelector('.searchBtn');
const getRecipeBtn = document.querySelector('.getRecipeBtn');
const drinkSelection = document.querySelector('.drinkSelection');
const inputForm = document.querySelector('.inputForm');


//! EVENT LISTENERS
searchBtn.addEventListener('click', fetchCocktail);
getRecipeBtn.addEventListener('click', fetchRecipe);

//! FUNCTIONS
// Searching API for  the list of possible matches from the user input
function fetchCocktail() {
  let choice = userInput.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const { drinks } = data;
      displayAvailableDrinks(drinks);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
// Displaying all the drinks matching the user Input in the UI

function displayAvailableDrinks(drinks) {
  drinkSelection.classList.add('active');
  drinks.map((drink) => {
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = drink.strDrink;
    input.className = 'drinkOption';
    let label = document.createElement('label');
    label.for = drink.strDrink;
    label.textContent = drink.strDrink;
    inputForm.appendChild(input);
    // inputArray.push(input)
    inputForm.appendChild(label);
  });
}

function fetchRecipe(input) {
  const optionsArray = inputForm.childNodes;
  optionsArray.forEach((el) => {
    if (el.checked === true) {
      let drinkSelected = el.attributes[1].textContent;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSelected}`;
      fetch(url)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
          const { drinks } = data;
          // Creating an object for the selected Drink
          let selectedDrinkObj = drinks.filter(
            (drink) => drink.strDrink === drinkSelected
          );
          console.log(selectedDrinkObj);
          //? Changing the Recipe elements according to the selected drink
          // Making Visible the recipe section
          const recipeCard = document.querySelector('.recipeCard');
          recipeCard.classList.add('active');
          // Recipe's name
          document.querySelector('.recipeTitle').textContent = selectedDrinkObj[0].strDrink;
          // Recipe's ingredients
          const ingredientsArray = [];
          //  Pushing all the ingredients in the array
          ingredientsArray.push(selectedDrinkObj[0].strIngredient1);

          // Creating and appending the list of ingredient in the UI
          ingredientsArray.forEach((ingredient) => {
            let node = document.createElement('li');
            let textNode = document.createTextNode(ingredient);
            node.appendChild(textNode);
            document.querySelector('.recipeIngredients').appendChild(node);

            // Inserting the recipe in the UI
            document.querySelector('.cocktailRecipe').textContent = selectedDrinkObj[0].strInstructions

          });
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    }
  });
}
