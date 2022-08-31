var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var searchFormEl = document.querySelector('#search-form');
var cityDrink = document.querySelector("#city-drink-name")
var currentTemp;
var recipeParent = document.querySelector("#recipe");
var savedList = document.querySelector("#saved-drinks");

//!-------------------------------------------------------------------
//! Create Save Button and local storage logic
// localStorage.setItem("drinks", JSON.stringify(["moscow_mule", "tom_collins", "rum_punch", "sazerac", "martini", "whiskey_sour", "sidecar"]));
// localStorage.clear();
var savedDrinks = localStorage.getItem("drinks");
var savedDrinksArray = [];
if (!savedDrinks) {
    savedDrinksArray = [];
}
else {
    savedDrinksArray = JSON.parse(localStorage.getItem("drinks"));
}

function generateSaveButton () {
    console.log("this function was called");
    var save = document.createElement("button");
    save.type = "button";
    save.innerHTML = "Save this recipe";

   save.addEventListener("click", function () {
        console.log(nameVar);
        savedDrinksArray.push(nameVar);
        localStorage.setItem("drinks", JSON.stringify(savedDrinksArray));
        console.log(savedDrinksArray);
    })

    recipeParent.appendChild(save);
}
//--------------------------------------------------------------

//!-----------------------------------------------------------------
//! Local storage to load saved items

var savedDrinksButton = document.querySelector("#saved-drinks-btn");
savedDrinksButton.addEventListener("click", function () {
    console.log(savedDrinksArray);
    console.log("this should fill the list");
    savedList.innerHTML = "";
    for (var i = 0; i<savedDrinksArray.length; i++) {
        var list = document.createElement("li");
        list.textContent = savedDrinksArray[i];
        savedList.appendChild(list);
    }
});



//!--------------------------------------------------------------------



function getCurrentWeather(city) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + apiKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var cityName = response.name;
            var currentDate = moment().format("M/D/YYYY");
            currentTemp = response.main.temp;
            drinkRec(currentTemp);
            currentTempEl.textContent = "Temp: " + Math.round(currentTemp) + " \u00B0F";
        })
};

function handleSearchFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log("Invalid Input!");
        return;
    }
    getCurrentWeather(searchInputVal)
}

// --- Search by ingredient --- START
var searchIngredientEl = document.querySelector("#search-ingredient-form");

function getCocktailFromIngredient(ingredientName) {

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredientName)


    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        var drinksArray = data.drinks.sort(() => 0.5 - Math.random());
        slicedArray = drinksArray.slice(0, 5)
        console.log(slicedArray)
        toStringIngredient(slicedArray);
    })
}

    function toStringIngredient(data){
        var searchedParent = document.querySelector("#recipe");
        searchedParent.innerHTML = "";
        console.log(data[0].strDrink)
        console.log(data[0].strDrinkThumb)


        for (let i = 0; i < data.length; i++) {
            var drinkName = document.createElement("li");
            drinkName.textContent = data[i].strDrink;
            var image = document.createElement("img");
            image.src = data[i].strDrinkThumb;
            searchedParent.appendChild(drinkName);
            drinkName.appendChild(image);
        }

    }

//!----------------------------------------

function handleIngredientFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector('#search-ingredient-input').value;

    if (!searchInputVal) {
        console.log("Invalid Input!");
        return;
    }
    getCocktailFromIngredient(searchInputVal)
}



searchIngredientEl.addEventListener('submit', handleIngredientFormSubmit);


// --- Search by ingredient --- END

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// James new commit --------------------

// Function that takes the temperature as a paramater and uses conditional logic to recommend a drink
function drinkRec(currentTemp) {
    var drinksArray = []; //empty array that will be filled with curated drink suggestions
    var drinkIndex; //index variable that will be randomly assigned to select a drink from the array
    var drink = "";//empty string that will be given the name of a drink from the array
    var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="; //URL for the fetch that will be appended with drink string
// conditional code for temperature ranges
if(currentTemp > 85) {
    //populate the array
    drinksArray = ["margarita", "mojito", "aperol_spritz", "pina_colada", "daiquiri", "paloma", "white_wine_sangria", "mint_julep"];
    //randomly generate the index then select the drink
    drinkIndex = Math.floor(Math.random()*drinksArray.length); 
    drink = drinksArray[drinkIndex];
    //append the selected drink name to the url and call the tempSearch function which contains the Fetch code
    drinkURL += drink;
    tempSearch(drinkURL);
    console.log("It's a scorcher today! Try a refreshing " + drink);
    }

else if (currentTemp > 60 && currentTemp <=85) {
    drinksArray = ["moscow_mule", "tom_collins", "rum_punch", "sazerac", "martini", "whiskey_sour", "sidecar"];
    drinkIndex = Math.floor(Math.random()*drinksArray.length); 
    drink = drinksArray[drinkIndex];
    drinkURL += drink;
    tempSearch(drinkURL);
    console.log("Nice Day! Relax with an easy-sipping " + drink);
    }

else if (currentTemp >40 && currentTemp <= 60) {
    drinksArray = ["old_fashioned", "manhatten", "martinez", "negroni", "boulevardier", "", "sidecar"];
    drinkIndex = Math.floor(Math.random()*drinksArray.length); 
    drink = drinksArray[drinkIndex];
    drinkURL += drink;
    tempSearch(drinkURL);
    console.log("It's a bit chilly! You need a little liquid warmth from a stiff " + drink);
    }

else {
     drinksArray = ["irish_coffee", "hot_toddy", "mulled_wine", "eggnog", "mudslide"];
     drinkIndex = Math.floor(Math.random()*drinksArray.length); 
     drink = drinksArray[drinkIndex];
     drinkURL += drink;
     tempSearch(drinkURL);
     console.log("Brr. Warm up with a " + drink);
    }
}

//function to handle the fetch code. Calls the toString function
function tempSearch(drinkURL) {
    fetch(drinkURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            drink = data.drinks[0].strDrink;
            console.log(data);
            toString(data); //Send the data to a new function for parsing and formatting recipe display
        })
}

// This function reads the data and transforms it into a comprehensive and intuitive recipe
function toString(data) {
    var recipeString = ""; //Empty string that will be appended with ingredients, instructions and measures
    if (data.drinks[0].strIngredient1) {
        recipeString += data.drinks[0].strIngredient1 + " " + data.drinks[0].strMeasure1 +"\n";
    }
    if (data.drinks[0].strIngredient2) {
        recipeString += data.drinks[0].strIngredient2 + " " + data.drinks[0].strMeasure2 +"\n";
    }
    if (data.drinks[0].strIngredient3) {
        recipeString += data.drinks[0].strIngredient3 + " " + data.drinks[0].strMeasure3 +"\n"; 
    }
    if (data.drinks[0].strIngredient4) {
        recipeString += data.drinks[0].strIngredient4 + " " + data.drinks[0].strMeasure4 +"\n";
    }
    if (data.drinks[0].strIngredient5) {
        recipeString += data.drinks[0].strIngredient5 + " " + data.drinks[0].strMeasure5 +"\n";
    }
    if (data.drinks[0].strIngredient6) {
        recipeString += data.drinks[0].strIngredient6 + " " + data.drinks[0].strMeasure6 +"\n"; 
    }
    recipeString += "\n" + data.drinks[0].strInstructions;
    drinkImage = data.drinks[0].strDrinkThumb;
    console.log(recipeString);
    //Dynamically create HTML elements for recipe and image
    // var recipeParent = document.querySelector("#recipe");
    recipeParent.innerHTML = '';
    cityDrink.innerHTML = "";
    var recipeName = document.createElement("h3");
    recipeName.id="recipe-name";
    nameVar = data.drinks[0].strDrink;
    recipeName.textContent = nameVar;
    //!Dynamically create save button with drink name"
    
    generateSaveButton();

    cityDrink.append(recipeName);
    var recipeEl = document.createElement("p");
    recipeEl.textContent = recipeString;
    recipeParent.appendChild(recipeEl);
    var recipeImage = document.createElement("img");
    recipeImage.src=drinkImage;
    recipeParent.appendChild(recipeImage);
}


// ------------------------------------------
// start modal

// $(document).ready(function() {
//     $('#age').foundation('open');
// })

// $('.close-modal').click(function() {
//     $('#age').foundation('close');
//   });

//end modal

