// Use a variable to store the car images
var carImages = {
    'Toyota': '/assets/images/toyota.jpg',
    'Honda': '/assets/images/honda.jpg',
    'Chevrolet': '/assets/images/chevrolet.jpg',
    'Nissan': '/assets/images/nissan.jpg',
    'Ford': '/assets/images/ford.jpg'
};

// Gets the filters that the user chose, and stores them in an array.
function getSelectedValues(inputType, inputName) {
    var inputs = document.querySelectorAll(inputType + '[name="' + inputName + '"]');
    var selectedValues = [];

    inputs.forEach(function(input) {
        if (input.checked) {
            selectedValues.push(input.value);
        }
    });

    return selectedValues;
}

// When the user changes a filter, apply the filters to the car list
function applyFilters() {
    var minYear = document.getElementById("minYear").value;
    var maxYear = document.getElementById("maxYear").value;
    var makes = getSelectedValues('input[type="checkbox"]', 'make');
    var maxMileage = getSelectedValues('input[type="radio"]', 'mileage');
    var price = document.querySelector('#priceFilter select').value;
    var colors = getSelectedValues('input[type="checkbox"]', 'color');

    // Checks to see if cars meet the filter criteria
    var filteredCars = usedCars.filter(function (car) {
        return (
            (!minYear || car.year >= minYear) &&
            (!maxYear || car.year <= maxYear) &&
            (!makes.length || makes.includes(car.make)) &&
            (!maxMileage.length || car.mileage <= maxMileage[0]) &&
            (!price || car.price <= price) &&
            (!colors.length || colors.includes(car.color))
        );
    });

    
  // Dynamically create the HTML for the car list
  var carList = document.getElementById("carList");
  carList.innerHTML = "";
  filteredCars.forEach(function (car) {
    var carHTML = `
        <div class="car">
            <img src="${carImages[car.make]}" alt="${car.make}">
            <p>${car.year} ${car.make}, ${car.mileage} miles, $${car.price}, ${
      car.color
    }</p>
        </div>
    `;
    carList.innerHTML += carHTML;
  });
}


// When the reset button is clicked, clear all the filters
document.getElementById("resetButton").addEventListener("click", function () {
  // Select all input and select elements
  var inputs = document.querySelectorAll("input, select");

  inputs.forEach(function (input) {
    if (input.type === "text" || input.type === "select-one") {
      input.value = "";
    } else if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    }
  });
});

window.onload = function () {
  applyFilters();
};
