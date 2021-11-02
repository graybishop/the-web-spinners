const searchForCity = async (event) => {
  event.preventDefault();

  const city = document.querySelector('#homeSearchInput').value.trim();

  if (!city) {
    return;
  }

  let lowercaseCity = city.toLowerCase() 

  let capitalizedCity = lowercaseCity.charAt(0).toUpperCase() + lowercaseCity.slice(1)

  const response = await fetch(`/api/venues/${capitalizedCity}`);

  if (response.ok) {
    let responseVenue = await response.json()
    console.log(responseVenue)
    renderVenueCard(responseVenue)
  } else {
    alert('Failed to find city.');
    return
  }

};

const renderVenueCard = (venue) => {
  let resultsContainer = document.querySelector('#resultsContainer')

  let htmlString =`<div class="col-sm-12 col-md-4 col-lg-3 pb-4">
        <div class="card shadow h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">${venue.location}</h5>
              <p>Located in: ${venue.city}, ${venue.state}</p>
              <p>${venue.description}</p>
            </div>
            <div class="">
              <a href="/venues/${venue.id}" class="btn btn-primary mb-2">Browse Reviews</a>
              <a href="/venues/${venue.id}" class="btn btn-primary mb-2">Book an Event</a>
            </div>
          </div>
        </div>
      </div>
  `
  resultsContainer.insertAdjacentHTML('beforeend',htmlString)
}


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#homeSearchForm').addEventListener('submit', searchForCity);
});