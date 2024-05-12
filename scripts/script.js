let submitButton = document.querySelector(".submit-button");
let foodEntry = document.getElementById("foodEntry");
let display = document.querySelector(".display");
let totalCal = document.querySelector("#total-cals");
let totalPro = document.querySelector("#total-pros");
let totalCarb = document.querySelector("#total-carbs");
let totalSug = document.querySelector("#total-sugars");
let totals = {
  calTotals: 0,
  proTotals: 0,
  carbTotals: 0,
  sugTotals: 0,
};

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
      totals.calTotals += responseData.items[0].calories;

      const foodPro = document.createElement("p");
      foodPro.textContent = "Protein: " + responseData.items[0].protein_g + " grams";
      totals.proTotals += responseData.items[0].protein_g;

      const foodCarb = document.createElement("p");
      foodCarb.textContent = "Total Carbs: " + responseData.items[0].carbohydrates_total_g + " grams";
      totals.carbTotals += responseData.items[0].carbohydrates_total_g;

      const foodSugar = document.createElement("p");
      foodSugar.textContent = "Total Sugar: " + responseData.items[0].sugar_g + " grams";
      totals.sugTotals += responseData.items[0].sugar_g;

      display.appendChild(foodName);
      display.appendChild(foodCal);
      display.appendChild(foodPro);
      display.appendChild(foodCarb);
      display.appendChild(foodSugar);

    })
    .catch((error) => console.error('Error:', error));

  totalCal.textContent = "Total Calories: " + totals.calTotals;

});
