
const addRandomVenue = async (event) => {
  event.preventDefault();

  const venue = Math.floor(Math.random() * 2000 + 2000);
  console.log(venue);
  if (venue) {
    const response = await fetch('/api/users/saved-venues', {
      method: 'POST',
      body: JSON.stringify({ venue }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const removeVenue = async (event) => {
  const venue = event.target.dataset.venueId;
  if (venue) {
    const response = await fetch('/api/users/saved-venues', {
      method: 'DELETE',
      body: JSON.stringify({ venue }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const addRandomEvent = async (event) => {
  event.preventDefault();
  const pickRandom = (arr) => {
    return arr[Math.floor(Math.random() * (arr.length))]
  }

  const names =['Birthday Party', 'Bar mitzvah', 'Baby Shower', 'Party']
  const descriptions =['BYOB', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', `I ain't afraid of no ghosts!`, 'After party out back']

  const venueId = Math.floor(Math.random() * 2000 + 2000);
  let date = '2001-03-20';
  let name = pickRandom(names)
  let description = pickRandom(descriptions);


  const response = await fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({ venueId, date, name, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.json());
  }

};

const removeEvent = async (event) => {
  const eventId = event.target.dataset.eventId;
  if (eventId) {
    const response = await fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const resetFirstTime = (event) => {
  console.log(event)
  localStorage.removeItem('previousVisitor')
  document.location.href = '/'
}


document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#newVenueButton')
    .addEventListener('click', addRandomVenue);

  let savedVenuesSection = document.querySelector('#savedVenuesSection')
  if(savedVenuesSection){
    savedVenuesSection.addEventListener('click', removeVenue);
  }
  document
    .querySelector('#newEventButton')
    .addEventListener('click', addRandomEvent);
  document
    .querySelector('#bookedEventsSection')
    .addEventListener('click', removeEvent);

  if(window.location.hash){
    let target = document.querySelector(window.location.hash)
    target.classList.add('animate__animated', 'animate__headShake', 'bg-yellow-100', 'p-3')
  }

  document.querySelector('#resetFirstTime').addEventListener('click', resetFirstTime)
  tippy('#editBtn',{
  content: 'Edit your review here',
  })
});