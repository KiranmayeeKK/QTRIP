import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint+"/adventures?city="+city);
    const adventureList = await res.json();
    return adventureList;
  }
  catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const rowElem = document.getElementById("data");
  adventures.forEach(adv => {
  rowElem.innerHTML+=      ` <div class="col-6 col-lg-3 mb-4 align-items-stretch">
  <a href="detail/?adventure=${adv.id}" id="${adv.id}">
  <div class="card activity-card">
  <div class="category-banner">${adv.category}</div>
  <img src="${adv.image}" alt="${adv.name}"/>
  <div class="container card-body w-100 d-flex flex-column">
  <div class="row justify-content-between pb-2">
  <h5 class="col-6 card-text" style="flex-basis:content">${adv.name}</h5>
  <p class="col-6 card-text" style="flex-basis:content">₹${adv.costPerHead}</p>
  </div>
  <div class="row justify-content-between">
  <h5 class="col-6 card-text" style="flex-basis:content" >Duration</h5>
  <p class="col-6 card-text" style="flex-basis:content">${adv.duration}hours</p>
  </div>
  </div>
</div>
</a>
</div>`
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adv => low <= adv.duration && adv.duration <= high);
} 

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adv => categoryList.includes(adv.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration!="") {
  const values = filters.duration.split("-");
  list = filterByDuration(list, parseInt(values[0]),parseInt(values[1]));
}
if (filters.category.length!= 0) {
  list = filterByCategory(list, filters.category);
}
  // Place holder for functionality to work in the Stubs
  return list;
}

function updateCategoryFilter(adventures) {
    const avlCategoryList = getAvailableCategories(adventures);
    const categoryElem = document.getElementById("category-select");
    Array.from(document.querySelector("#category-select").options).forEach(option => {
        if(!avlCategoryList.includes(option.value))
            option.disabled = true;
        else
            option.disabled = false;
    });
}

function getAvailableCategories(adventures) {
    const avlCategoryList = [];
    adventures.forEach(adventure => {
        avlCategoryList.push(adventure.category);
    })

    return avlCategoryList.filter(onlyUnique);

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 const categoryListDiv = document.getElementById("category-list");
 const durationFilterElem = document.getElementById("duration-select");
 durationFilterElem.value = filters.duration;
  filters.category.forEach(f => {
    categoryListDiv.innerHTML+=`<div class="category-filter" id="${f}">${f}
    <button class="btn-close-filter" id='close' onclick= "removeCategory(event)">x</button>
    </div>`;
  });
}


async function addAdventureToDB(event, city) {
  const postBody =` {
    "city": "${city}"
  }`
  const res = await addPostToServer(postBody);
  window.location.reload();
}

async function addPostToServer(dataObject) {
  const res = await fetch(config.backendEndpoint+"/adventures/new", {
      method: "POST",
      body: dataObject,
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
  });
  return res;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addAdventureToDB,
  updateCategoryFilter
};
