// ------------------------------
// 1. Data (array manipulation)
// ------------------------------
const cars = [
  { brand: "Toyota", models: ["Corolla", "Camry", "RAV4"] },
  { brand: "Honda", models: ["Civic", "Accord", "CR-V"] },
  { brand: "Ford", models: ["Focus", "Fusion", "Escape"] },
  { brand: "Tesla", models: ["Model S", "Model 3", "Model X", "Model Y"] }
];

// History array for practice - fill this with information every selection by the customer
//   this would go into a database when implemented for a customer
const selectionHistory = [];

// ------------------------------
// Populate brand dropdown
// ------------------------------
let brandEl = document.getElementById("brand"); //assign html to a variable

cars.forEach(car => {
  // do this for each car
  //create new dropdown option
  const opt = document.createElement("option");
  opt.value = car.brand;
  opt.textContent = car.brand;
  brandEl.appendChild(opt);  //actually change the html
})

// ------------------------------
// 4. Update model dropdown using the “change” event
// ------------------------------

modelEl = document.getElementById("model");

brandEl.addEventListener("change", () => { // () => means, "do this"
  
  let selectedBrand = brandEl.value;
  console.log(selectedBrand);

  //empty the dropdown menu<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  modelEl.innerHTML = '<option value="">-- choose a model --</option>';

  //Loop through the array of cars
  cars.forEach(car => {

    //check if current car is the same brand as the selected brand
    if (car.brand == selectedBrand) {

      car.models.forEach(model => {
        //populate dropdown with models and exit loop
        const opt = document.createElement("option");
        opt.value = model;
        opt.textContent = model;
        modelEl.appendChild(opt);
      })
    }

  })
});




// Clear previous models
// example: selectEl.innerHTML = `<option value="">-- choose a model --</option>`;

// example if (!selectedBrand) return;

//  hint: Find the brand object
//  cars.find(car => car.brand === selectedBrand);

// Populate models

// ------------------------------
// 5. Form validation + output
// ------------------------------
let errorBox = document.getElementById("errorBox");
let form = document.getElementById("carForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.textContent = "";

  const name = document.getElementById("name").value; //.trim();
  const email = document.getElementById("email").value; //.trim();
  const brand = brandEl.value;
  const model = modelEl.value;

  // Validation

  if (email.includes("@") && email.includes(".")) {
    selectionHistory.push({ name, email, brand, model });

    //Outputconst latest = selectionHistory[selectionHistory.length - 1];
    const latest = selectionHistory[selectionHistory.length - 1];
    document.getElementById("output").innerText = `* Name: ${latest.name}, Email: ${latest.email}, Brand: ${latest.brand}, Model: ${latest.model}`;

    document.getElementById("history").innerHTML += `* ${new Date} Name: ${latest.name}, Email: ${latest.email}, Brand: ${latest.brand}, Model: ${latest.model} <br>`
  } else {
    document.getElementById("email").value = "";
    errorBox.textContent = "Invalid Email address";
  }

  // Store name, email, brand, model, in the history array
  //   hint: something like selectionHistory.push({ name, email, brand, model });
});
