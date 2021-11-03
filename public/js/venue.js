const toggleEventModal = () => {
  let eventModal = document.querySelector('#eventModal')
  eventModal.classList.toggle('hidden')
}

const submitNewEvent = (event) => {
  event.preventDefault()
  console.log(event.target)
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#bookEventButton').addEventListener('click', toggleEventModal);
  document.querySelector('#cancelButton').addEventListener('click', toggleEventModal);
  document.querySelector('#bookEventForm').addEventListener('submit', submitNewEvent);
});