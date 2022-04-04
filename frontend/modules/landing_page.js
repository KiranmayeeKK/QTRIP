import config from "../conf/index.js";

async function init() {
  console.log("From init()" + config.backendEndpoint);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return an array with the cities data 
  try {
  const res = await fetch(config.backendEndpoint+"/cities");
  const cities = await res.json();
  return cities;
}
catch(err) {
  return null;
}
/* Alternate solution to try catch
if (response.status >= 200 && response.status <= 299) {
   */
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const rowElem = document.getElementById("data");
  rowElem.innerHTML+=      ` <div class="col-12 col-sm-6 col-lg-3 mb-4 align-items-stretch">
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <img src=${image}  alt=${city}>
    <div class="tile-text"><h5>${city}</h5><p>${description}</p></div>
</div>
</a>
</div>`
}

export { init, fetchCities, addCityToDOM };
