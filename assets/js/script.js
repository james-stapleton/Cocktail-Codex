var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var searchFormEl = document.querySelector('#search-form');
var currentTemp;


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

    .then(function (response) {
        console.log(response);
    })
}

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

function drinkRec(currentTemp) {
if(currentTemp > 85) {
    var hotDayDrinks = ["margarita", "mojito", "aperol_spritz", "pina_colada", "daiquiri", "paloma", "white_wine_sangria"];
    var drinkIndex = Math.floor(Math.random()*hotDayDrinks.length); 
    var drink = "";
    var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+hotDayDrinks[drinkIndex];
    fetch(drinkURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            drink = data.drinks[0].strDrink;
            console.log(data);
            console.log("It's a scorcher today! Try a : " + drink);
            toString(data);
        })
    }

    else  {
        drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=old_fashioned";
        fetch(drinkURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            drink = data.drinks[0].strDrink;
            console.log(data);
            console.log("It's a scorcher today! Try a : " + drink);
            toString(data);
        })

    }
}

function toString(data) {
    var recipeString = "";
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
    
    var recipeParent = document.querySelector("#recipe");
    var recipeEl = document.createElement("p");
    recipeEl.textContent = recipeString;
    recipeParent.appendChild(recipeEl);
    var recipeImage = document.createElement("img");
    recipeImage.src=drinkImage;
    recipeParent.appendChild(recipeImage);

}

// -------------------------------------------

// start modal

// $(document).ready(function() {
//     $('#age').foundation('open');
// })

// $('.close-modal').click(function() {
//     $('#age').foundation('close');
//   });

//end modal

