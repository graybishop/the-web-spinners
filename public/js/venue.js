const toggleEventModal = () => {
  let eventModal = document.querySelector('#eventModal')
  eventModal.classList.toggle('hidden')
}

const submitNewEvent = async (event) => {
  event.preventDefault()
  console.log(event.target)

  const name = document.querySelector('#eventName').value.trim();
  const description = document.querySelector('#eventDescription').value.trim();
  const date = document.querySelector('#eventDate').value
  const venueId = event.target.dataset.venueId;

  if (name && description && date && venueId){
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ venueId, date, name, description }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      location.reload();
    } else {
      alert(response.json());
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#bookEventButton').addEventListener('click', toggleEventModal);
  document.querySelector('#cancelButton').addEventListener('click', toggleEventModal);
  document.querySelector('#bookEventForm').addEventListener('submit', submitNewEvent);
});