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
  let htmlString2 =
  `<div class="flex-none px-2 md:w-3/12  sm:w-full">
  <div class="bg-white-400 py-2 flex items-center justify-center w-full h-full">
      <div class="bg-white rounded-lg shadow-2xl w-full h-full">
          <header class="bg-gray-100 rounded-t-lg p-2 text-xl font-extrabold">
              <h2>${venue.location}</h2>
          </header>
          <div class="p-2">
              <p>${venue.description}</p>
              <a class="bg-blue-400 text-blue-50 rounded-lg py-2 px-4 mt-5" href="/venues/${venue.id}$"> My Venue</a>
          </div>
      </div>
  </div>
</div>
  `
  resultsContainer.insertAdjacentHTML('beforeend',htmlString2)
}


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#homeSearchForm').addEventListener('submit', searchForCity);
});