let submitButton = document.querySelector("#submit-button");
let clearButton = document.querySelector("#clear-button");
let foodEntry = document.getElementById("foodEntry");
let display = document.querySelector(".display");
let totalCal = document.querySelector("#total-cals");
let totalPro = document.querySelector("#total-pros");
let totalCarb = document.querySelector("#total-carbs");
let totalSug = document.querySelector("#total-sugars");

localStorage.setItem("calTotals", 0);
localStorage.setItem("proTotals", 0);
localStorage.setItem("carbTotals", 0);
localStorage.setItem("sugTotals", 0);

submitButton.addEventListener("click", function() {
  let responseData;

  fetch('https://api.calorieninjas.com/v1/nutrition?query=' + foodEntry.value, {
    method: 'GET',
    headers: {
      'X-Api-Key': 'bBYPTNf2eLtACjJZHaOqFg==cYpfPaEasaBcODNp'
    },
    contentType: 'application/json'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      responseData = data;
      console.log(responseData);

      const foodName = document.createElement("h3");
      foodName.textContent = foodEntry.value;

      const foodCal = document.createElement("p");
      foodCal.textContent = "Calories: " + responseData.items[0].calories;
      localStorage.setItem("calTotals", parseInt(localStorage.getItem("calTotals")) + responseData.items[0].calories);
      totalCal.textContent = "Total Calories: " + localStorage.getItem("calTotals");

      const foodPro = document.createElement("p");
      foodPro.textContent = "Protein: " + responseData.items[0].protein_g + " grams";
      localStorage.setItem("proTotals", parseInt(localStorage.getItem("proTotals")) + responseData.items[0].protein_g);
      totalPro.textContent = "Total Protein: " + localStorage.getItem("proTotals");

      const foodCarb = document.createElement("p");
      foodCarb.textContent = "Total Carbohydrates: " + responseData.items[0].carbohydrates_total_g + " grams";
      localStorage.setItem("carbTotals", parseInt(localStorage.getItem("carbTotals")) + responseData.items[0].carbohydrates_total_g);
      totalCarb.textContent = "Total Carbohydrates: " + localStorage.getItem("carbTotals");

      const foodSugar = document.createElement("p");
      foodSugar.textContent = "Total Sugar: " + responseData.items[0].sugar_g + " grams";
      localStorage.setItem("sugTotals", parseInt(localStorage.getItem("sugTotals")) + responseData.items[0].sugar_g);
      totalSug.textContent = "Total Sugar: " + localStorage.getItem("sugTotals");

      display.appendChild(foodName);
      display.appendChild(foodCal);
      display.appendChild(foodPro);
      display.appendChild(foodCarb);
      display.appendChild(foodSugar);

    })
    .catch((error) => console.error('Error:', error));


});

clearButton.addEventListener("click", function() {
  localStorage.clear();

});
