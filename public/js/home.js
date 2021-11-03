const searchForCity = async (event) => {
  event.preventDefault();

  const city = document.querySelector('#homeSearchInput').value.trim();

  if (!city) {
    return;
  }

  let lowercaseCity = city.toLowerCase();

  let capitalizedCity = lowercaseCity.charAt(0).toUpperCase() + lowercaseCity.slice(1);

  const response = await fetch(`/api/venues/${capitalizedCity}`);

  if (response.ok) {
    let responseVenue = await response.json();
    console.log(responseVenue);
    renderVenueCard(responseVenue);
  } else {
    alert('Failed to find city.');
    return;
  }

};

const renderVenueCard = (venue) => {
  let resultsContainer = document.querySelector('#resultsContainer');



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
  `;
  resultsContainer.insertAdjacentHTML('beforeend', htmlString2);
};

const addSavedVenueFromStar = async (event) => {
  let target = event.target;
  let parent = target.parentElement;

  if (parent.tagName !== 'SPAN') {
    return;
  }

  const venue = target.dataset.venueId;
  console.log(venue);
  if (venue) {
    const response = await fetch('/api/users/saved-venues', {
      method: 'POST',
      body: JSON.stringify({ venue }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //for toggling star visibility
      let spans = parent.parentElement.children;
      for (const element of spans) {
        element.classList.toggle('hidden');
      }
    } else {
      alert(response.statusText);
    }
  }

};


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#homeSearchForm').addEventListener('submit', searchForCity);

  //Home hero carousel
  // eslint-disable-next-line no-undef
  new Splide('#image-slider', {
    cover: true,
    heightRatio: 0.3,
  }).mount();

  let allSaveStars = document.querySelectorAll('.addSavedVenue')
  for (const element of allSaveStars) {
    element.addEventListener('click', addSavedVenueFromStar);
  }

});