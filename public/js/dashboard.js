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
  event.preventDefault();

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

  const venueId = Math.floor(Math.random() * 2000 + 2000);
  let date = '2001-03-20';
  let name = 'Party!';
  let description = 'BYOB';


  const response = await fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({ venueId, date, name, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(await response.json())
  } else {
    alert(response.json());
  }

};


document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#newVenueButton')
    .addEventListener('click', addRandomVenue);

  document
    .querySelector('#savedVenuesSection')
    .addEventListener('click', removeVenue);

  document
    .querySelector('#newEventButton')
    .addEventListener('click', addRandomEvent);
});