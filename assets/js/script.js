var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var searchFormEl = document.querySelector('#search-form');


function getCurrentWeather(city) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + apiKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var cityName = response.name;
            var currentDate = moment().format("M/D/YYYY");
            var currentTemp = response.main.temp;

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
