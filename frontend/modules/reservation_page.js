import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint+"/reservations");
    const reservations = await res.json();
    return reservations;
  }
  catch(err) {
    return null;
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  const noReservationElem = document.getElementById("no-reservation-banner");
  const tableElem = document.getElementById("reservation-table-parent");
  if(reservations.length == 0)
  { 
    noReservationElem.style.display = "block";
    tableElem.style.display = "none";
}
else
{
  noReservationElem.style.display = "none";
  tableElem.style.display = "block";
}
const tbodyElem = document.getElementById("reservation-table");
  reservations.forEach(reservation => {
    const trElem = document.createElement("tr");
    trElem.innerHTML += `<td>${reservation.id}</td>`;
    trElem.innerHTML += `<td>${reservation.name}</td>`;
    trElem.innerHTML += `<td>${reservation.adventureName}</td>`;
    trElem.innerHTML += `<td>${reservation.person}</td>`;
    const reservationDate = new Date(reservation.date);
    trElem.innerHTML += `<td>${reservationDate.toLocaleString('en-IN', {day: 'numeric', month: 'numeric', year: 'numeric' })}</td>`;
    trElem.innerHTML += `<td>${reservation.price}</td>`;
    const reservationTime = new Date(reservation.time);
    trElem.innerHTML += `<td>${reservationTime.toLocaleString("en-IN", {year: 'numeric', month: 'long', day: 'numeric', hourCycle:'h12', hour:'numeric', minute:'numeric', second: 'numeric'})}</td>`;
//    trElem.innerHTML += `<td><button class= "reservation-visit-button" id = "${reservation.id}" onclick="document.location.href= '../detail/?adventure=${reservation.adventure}'">Visit Adventure</button></td>`
trElem.innerHTML += `<td><button class= "reservation-visit-button" id = "${reservation.id}" ><a href= "../detail/?adventure=${reservation.adventure}">Visit Adventure</a></button></td>`
tbodyElem.append(trElem);
  })

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
