const searchForVenueByLocation = async (event) => {
  event.preventDefault();

  const city = event.target.elements[0].value.trim();
  if (!city) {
    return;
  }
  const response = await fetch(`/api/venues/${city}`);
  if (response.ok) {
    let responseList = await response.json();
    responseList.forEach(element => renderSearchCard(element));
    document.querySelector('#searchResultContainer').classList.remove('hidden')
    event.target.reset();
  } else {
    alert('Failed to find city.');
    event.target.reset();
    return;
  }
};

const addSavedVenueFromStar = async (event) => {
  let target = event.target;
  while (target.dataset.venueId == undefined) {
    target = target.parentElement
  }

  const venue = target.dataset.venueId;
  if (venue) {
    const response = await fetch('/api/users/saved-venues', {
      method: 'POST',
      body: JSON.stringify({ venue }),
      headers: { 'Content-Type': 'application/json' },
    });

    //redirects user if they are not logged in
    if (response.redirected) {
      document.location = response.url;
      return;
    }

    if (response.ok) {
      let spans = target.children;
      for (const element of spans) {
        element.classList.toggle('hidden');
      }
      target.classList.remove('addSavedVenue')
      target.classList.add('removeSavedVenue')
      target.classList.add('animate__animated', 'animate__tada');
      target.addEventListener('click', linkToDashboardVenue)
    } else {
      alert(response.statusText);
    }
  }
};

//the user will be redirected to their dashboard, and 
//sent to the saved location in their list
const linkToDashboardVenue = (event) => {
  let target = event.target;
  while (target.dataset.venueId == undefined) {
    target = target.parentElement
  }

  const venue = target.dataset.venueId;

  document.location.href = `/dashboard#sectionFor${venue}`;
};

// User Location Section
const getPosition = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

const getUserCityState = async () => {
  let position;
  try {
    position = await getPosition();
  } catch (error) {
    console.log(error);
    return { error };
  }

  const { latitude, longitude } = position.coords;
  let geoData;
  try {
    let geoResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6457baeadd874c80bd7a70f9ff672e82&no_anotations=1`);
    geoData = await geoResponse.json();
  } catch (error) {
    console.log(error);
    return { error };
  }
  let { city, state } = geoData.results[0].components;
  return { city, state };
};
// END User Location Section

let searchCarousel;
window.addEventListener('DOMContentLoaded', async () => {


  //Home hero carousel
  // eslint-disable-next-line no-undef
  new Splide('#image-slider', {
    type: 'loop',
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 7500,
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


  // Search Card carousel
  // eslint-disable-next-line no-undef
  searchCarousel = new Splide('#searchCarousel', {
    type: 'loop',
    perPage: 1,
    interval: 3500,
    autoplay: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 700,
    pagination: true,
    autoWidth: true,
    gap: '1rem',
    classes: {
      pagination: 'splide__pagination visible sm:invisible',
      arrows: 'splide__arrows your-class-arrows visible sm:invisible'
    }
  }).mount();

  searchCarousel.Components.Elements.track.style.overflow = 'visible';


  // eslint-disable-next-line no-undef, no-unused-vars
  const autoCompleteJS = new autoComplete(
    {
      selector: "#homeSearchInput",
      placeHolder: "Search for City or State...",
      data: {
        // eslint-disable-next-line no-undef
        src: cityName
      },
      wrapper: false,
      resultsList: {
        tag: "ul",
        id: "autoComplete_list",
        class: "results_list bg-white rounded text-black text-2xl py-4 absolute top-full px-4 list-none mt-1 w-7/12 md:w-6/12 lg:w-5/12 shadow-sm",
        destination: "#homeSearchInput",
        position: "afterend",
        maxResults: 10,
        element: (list, data) => {
          if (!data.results.length) {
            // Create "No Results" message list element
            const message = document.createElement("div");
            message.classList.add('text-gray-600', 'text-xl');
            // Add message text content
            message.innerHTML = `<span>No results found for "${data.query}"</span>`;
            // Add message list element to the list
            list.appendChild(message);
          }
        },
        noResults: true
      },
      resultItem: {
        tag: "li",
        class: "autoComplete_result mb-2 border-b rounded p-2",
        highlight: "autoComplete_highlight",
        selected: "autoComplete_selected bg-blue-200"
      },
      submit: true
    }
  );

  let homeSearchForm = document.querySelector('#homeSearchForm');
  let searchInput = document.querySelector("#homeSearchInput");
  homeSearchForm.addEventListener('submit', (event) => {
    searchForVenueByLocation(event);
    autoCompleteJS.close();
  });

  //Submits form when user clicks on city in suggestions list, or hits enter on suggestion list
  searchInput.addEventListener("selection", (event) => {
    // "event.detail" carries the autoComplete.js "feedback" object
    document.querySelector('#homeSearchInput').value = event.detail.selection.value;
  });

  //code for automatically searching for user location on homepage load
  let userLocation = await getUserCityState()
  document.querySelector('#homeSearchInput').value = userLocation.city || userLocation.state
  homeSearchForm.requestSubmit()

});

//renders card onto homepage, given venue information
const renderSearchCard = (venue) => {
  const slide = document.createElement('li');
  slide.className = 'splide__slide w-full sm:w-6/12 md:w-5/12 lg:w-4/12 flex flex-col animate__animated animate__bounceInDown';

  const maxTextSize = 150; //higher numbers mean more letters on the homepage cards descriptions
  if (venue.description.length > maxTextSize) {
    venue.description = venue.description.substr(0, maxTextSize) + '...';
  }

  let htmlString = `
  <div
    class="bg-white h-full rounded-lg shadow-xl w-full flex flex-col gap-2 transition-all transform scale-100 hover:scale-105 hover:shadow-2xl">
    <div>
      <div class="bg-gray-200 rounded-t-lg px-4 flex flex-row justify-between py-2">
        <div>
          <h2 class="text-xl font-extrabold">${venue.location}</h2>
          <p class="text-lg text-gray-600">${venue.city}, ${venue.state}</p>
        </div>
      </div>
      <div class="">
        <img class="object-cover w-full h-56" src="https://picsum.photos/seed/${venue.location}/600/400"
          alt="">
      </div>
    </div>
    <div class="px-4 pb-2">
      <p>${venue.description}</p>
    </div>
    <div class="px-4 mb-4 flex flex-row gap-2 mt-auto border-t pt-2">
      <button onclick="location.href = '/venues/${venue.id}'" id="bookEventButton"
        class="bg-blue-400 text-blue-50 rounded-lg py-2 px-4 mt-5-right hover:bg-blue-600">
        Visit Venue Page
      </button>
      <button onclick="location.href = '/venues/${venue.id}'" id="bookEventButton"
        class="border border-blue-400 text-blue-400 rounded-lg py-2 px-4 mt-5-right hover:bg-blue-600">
        Book an Event
      </button>
    </div>
  </div>`;

  slide.innerHTML = htmlString;
  searchCarousel.add(slide);
};