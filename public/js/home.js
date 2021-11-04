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
  if (venue) {
    const response = await fetch('/api/users/saved-venues', {
      method: 'POST',
      body: JSON.stringify({ venue }),
      headers: { 'Content-Type': 'application/json' },
    });

    //redirects user if they are not logged in
    if(response.redirected){
      document.location = response.url
      return
    }

    if (response.ok) {
      let spans = parent.parentElement.children;
      for (const element of spans) {
        element.classList.toggle('hidden');
      }
      parent.parentElement.classList.add('animate__animated', 'animate__tada')
    } else {
      alert(response.statusText);
    }
  }

};

//the user will be redirected to their dashboard, and 
//sent to the saved location in their list
const linkToDashboardVenue = (event) => {
  let target = event.target;
  let parent = target.parentElement;

  if (parent.tagName !== 'SPAN') {
    return;
  }

  const venue = target.dataset.venueId;

  document.location.href = `/dashboard#sectionFor${venue}`
}


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#homeSearchForm').addEventListener('submit', searchForCity);

  //Home hero carousel
  // eslint-disable-next-line no-undef
  new Splide('#image-slider', {
    type: 'loop',
    pagination: false,
    arrows: false,
    autoplay:true,
    interval: 5000,
    speed: 0
  }).mount();

  //attaches eventlistener to all hollow stars
  let allSaveStars = document.querySelectorAll('.addSavedVenue');
  for (const element of allSaveStars) {
    element.addEventListener('click', addSavedVenueFromStar);
  }

  let allRemoveStars = document.querySelectorAll('.removeSavedVenue');
  for (const element of allRemoveStars) {
    element.addEventListener('click', linkToDashboardVenue);
  }

  //card carousel
  // eslint-disable-next-line no-undef
  let cardCarousel = new Splide('#cardCarousel', {
    type: 'loop',
    perPage: 1,
    interval: 2000,
    autoplay:true,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 700,
    pagination: true,
    autoWidth: true,
    gap: '1rem',
    classes : {
      pagination: 'splide__pagination visible sm:invisible',
      arrows: 'splide__arrows your-class-arrows visible sm:invisible'
    }
  }).mount();

  cardCarousel.Components.Elements.track.style.overflow = 'visible'
  
});