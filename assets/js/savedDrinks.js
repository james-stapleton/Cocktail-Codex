console.log("This file is linked!");
var savedDrinksButton = document.querySelector("#save-btn");

var savedList = document.querySelector("#saved-drinks");

localStorage.setItem("drinks", JSON.stringify(["moscow_mule", "tom_collins", "rum_punch", "sazerac", "martini", "whiskey_sour", "sidecar"]));

var savedDrinks = localStorage.getItem("drinks");
var savedDrinksArray;
if (!savedDrinks) {
    savedDrinksArray = [];
}
else {
    savedDrinksArray = JSON.parse(localStorage.getItem("drinks"));
}

for (var i = 0; i<savedDrinksArray.length; i++) {
    var list = document.createElement("li");
    list.textContent = savedDrinksArray[i];
    savedList.appendChild(list);
}


var save = document.createElement("button");
save.textContent = "Save Drink";
savedList.appendChild(save);
save.addEventListener("click", function () {
    
})