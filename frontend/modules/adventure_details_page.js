import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get("adventure");

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    const adventureDetail = await res.json();
    return adventureDetail;
  }
  catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const advNameElem = document.getElementById("adventure-name");
  advNameElem.textContent = adventure.name;
  const advSubtitleElem = document.getElementById("adventure-subtitle");
  advSubtitleElem.textContent = adventure.subtitle;
  const galleryElem = document.getElementById("photo-gallery");
  adventure.images.forEach(img => {
    const imgElem = document.createElement("img");
    imgElem.classList.add("activity-card-image");
    imgElem.setAttribute("src", img);
    galleryElem.append(imgElem);
  })
  
  const advContentElem = document.getElementById("adventure-content");
  advContentElem.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const galleryElem = document.getElementById("photo-gallery");
  galleryElem.innerHTML = getCarouselOuterStructure();
  let carouselParent = document.getElementById("carousel-parent");
  addCarouselItems(carouselParent, images);
}


function addCarouselItems(carouselParent, imageList) {
  imageList.forEach((img, index) => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "h-100");
    let carouselIndicatorElem = document.getElementById("carousel-indicator");
    if (index == 0) carouselItem.classList.add("active");
    carouselItem.innerHTML = ` <img
    src=${img}
    class="d-block w-100 h-100"
    alt="..."
    style="object-fit:cover"
    />`;
    carouselParent.append(carouselItem);
    let carouselIndicatorBtnElem = document.createElement("button");
    carouselIndicatorBtnElem.setAttribute("data-bs-target","#carouselDiv");
    carouselIndicatorBtnElem.setAttribute("data-bs-slide-to",index);
    if(index==0) carouselIndicatorBtnElem.classList.add("active");
    carouselIndicatorElem.append(carouselIndicatorBtnElem);
  });
}

function getCarouselOuterStructure() {
  return `<div id="carouselDiv" class="carousel slide" data-bs-ride="carousel" style="height:24rem">
  <div class="carousel-indicators" id="carousel-indicator"></div>
  <div class="carousel-inner h-100" id = "carousel-parent">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselDiv" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselDiv" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
