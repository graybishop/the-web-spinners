const userNameInput = document.getElementById('userId');
const venueInput = document.getElementById('venueId');
const reviewInput = document.getElementById('review');
const reviewForm = document.getElementById('review-form');

// helper function that accepts a 'review' object, sends a POST request and returns the result
const postReview = (review) =>
  fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // create a new review object from the input values
  const newReview = {
    username: userNameInput.value.trim(),
    venue: venueInput.value.trim(),
    review: reviewInput.value.trim(),
  };


  postReview(newReview)
    .then((data) => alert(`Review added! Review ID: ${data.body.review_id}`))
    .catch((err) => console.error(err));
});
