const buttonAdd = document.getElementById('add-recipe-btn')
const inputTitle = document.getElementById("title")
const inputIngredients = document.getElementById('ingredients')
const inputInstructions = document.getElementById('instructions')
const listRecipe = document.getElementById('recipe-list')

const recipes = [];

var indexOfRecipeToBeEdited = -1

var isEditMode = false

buttonAdd.addEventListener('click',addRecipe)

//comment
function clearInputFields() {
    
    inputTitle.value = '';
    inputIngredients.value = '';
    inputInstructions.value = '';
    indexOfRecipeToBeEdited = -1;
    isEditMode = false
    buttonAdd.textContent = 'Add Recipe'
}


function addRecipe() {
   
    const title = inputTitle.value.trim()
    const ingredients = inputIngredients.value.trim()
    const instructions = inputInstructions.value.trim()

      if(title === '' ||ingredients === '' ||instructions === '' ){
          alert('complete all the information')
          return;
        } 

          const newRecipe = {
            title: title,
            ingredients: ingredients.split(',').map(function(ingredient){
                return ingredient.trim();
            }),
            instructions:instructions    
            };

            recipes.push(newRecipe);

            clearInputFields()
            displayRecipes()
        }


function displayRecipes() {
    
    const list = document.getElementById('recipes')
    list.innerHTML = ''
   
   
       for(let i = 0; i <recipes.length; i++){
        const recipe = recipes[i]

        const show = document.createElement('li');
        show.classList.add('recipe-element');

        const recipeTitle = document.createElement('h3')
        recipeTitle.textContent = recipe.title

        const ingredientsList = document.createElement('ul')
        recipe.ingredients.forEach(function(ingredient){
            const liIngredient = document.createElement('li');
            liIngredient.textContent = ingredient
            ingredientsList.appendChild(liIngredient)
        })

        const directions = document.createElement('p')
        directions.textContent = recipe.instructions;

        const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click',() => editRecipe(i))

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click',() => deleteRecipe(i))

    

        show.appendChild(recipeTitle)
        show.appendChild(ingredientsList)
        show.appendChild(directions)
        show.appendChild(editButton)
        show.appendChild(deleteButton)

           list.appendChild(show)
       }

      
}


function editRecipe(i){
    const recipeToEdit = recipes[i];

    inputTitle.value = recipeToEdit.title;
    inputIngredients.value = recipeToEdit.ingredients.join(', ');
    inputInstructions.value = recipeToEdit.instructions;

    isEditMode = true;
    indexOfRecipeToBeEdited = i
    buttonAdd.textContent = 'Update Recipe'
    console.log('editing recipe', recipeToEdit)
}

function deleteRecipe(i){
    if (i >= 0 && i < recipes.length) {
       const deleteRecipe = recipes.splice(i, 1); // Remove 1 element at the specified index
        displayRecipes();
        console.log(recipes)
        clearInputFields();
        isEditMode = false;

    }

    
    
}