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

const removeReview = async (event) => {
  const reviewId = event.target.dataset.reviewId
  if (reviewId) {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
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

  let savedVenuesSection = document.querySelector('#savedVenuesSection')
  if(savedVenuesSection){
    savedVenuesSection.addEventListener('click', removeVenue);
  }

  let writtenReviews = document.querySelector('#writtenReviewsSection')
  if(writtenReviews){
    writtenReviews.addEventListener('click', removeReview);
  }

  document
    .querySelector('#bookedEventsSection')
    .addEventListener('click', removeEvent);

  if(window.location.hash){
    let target = document.querySelector(window.location.hash)
    target.classList.add('animate__animated', 'animate__headShake', 'bg-yellow-100', 'p-3')
  }


  document.querySelector('#resetFirstTime').addEventListener('click', resetFirstTime);

  
  // eslint-disable-next-line no-undef
  tippy('#profileImage', {
    content: `Your profile picture... it's looking good!`,
    allowHTML: true,
    animation:"shift-toward-extreme",
    theme:"translucent",
  });
  // eslint-disable-next-line no-undef
  tippy('#resetFirstTime', {
    content: "Didn't get it the first time?",
    allowHTML: true,
  });
  // eslint-disable-next-line no-undef
  tippy('#bookedEventsSection', {
    content: "These are your booked events...",
    allowHTML: true, })
});