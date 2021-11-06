const toggleEventModal = () => {
  let eventModal = document.querySelector("#eventModal");
  eventModal.classList.toggle("hidden");
};

const submitNewEvent = async (event) => {
  event.preventDefault();
  console.log(event.target);

  const name = document.querySelector("#eventName").value.trim();
  const description = document.querySelector("#eventDescription").value.trim();
  const date = document.querySelector("#eventDate").value + ` 12:00:00`
  const venueId = event.target.dataset.venueId;
  const numberOfPeople = document.querySelector("#numberOfPeople");
  const cost =
    parseInt(numberOfPeople.value) * Math.floor(Math.random() * 10 + 1);

  if (name && description && date && venueId) {
    const response = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ venueId, date, name, description, cost }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(response.json());
    }
  }
};

const submitNewReview = async (event) => {
  event.preventDefault();

  console.log(event.target);
  // const countRating= document.querySelector("#count-rating").value
  let stars = document.querySelectorAll("input[name=estrellas]");

  let score;
  for (const element of stars) {
    if (element.checked) {
      score = element.value;
    }
  }

  const text = document.querySelector("#reviewText").value.trim();
  const venueId = event.target.dataset.venueId;

  console.log(text, venueId, score);
  if (text && venueId && score) {
    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ venueId, text, score }),
      headers: { "Content-Type": "application/json" },
    });

    //redirects user if they are not logged in
    if (response.redirected) {
      document.location = response.url;
      return;
    }

    if (response.ok) {
      // location.reload();
    } else {
      alert(response.json());
    }
  }
};

const addUserSavedVenue = async (event) => {
  let target = event.target;

  const venue = target.dataset.venueId;

  if (venue) {
    const response = await fetch("/api/users/saved-venues", {
      method: "POST",
      body: JSON.stringify({ venue }),
      headers: { "Content-Type": "application/json" },
    });

    //redirects user if they are not logged in
    if (response.redirected) {
      document.location = response.url;
      return;
    }

    if (response.ok) {
      target.classList.add("animate__animated", "animate__bounceOut");
      target.children[0].classList.add(
        "animate__animated",
        "animate__heartBeat"
      );
    } else {
      alert(response.statusText);
    }
  }
};

const removeVenue = async (event) => {
  console.log(event);
  let target = event.target;
  const venue = event.target.dataset.venueId;
  if (venue) {
    const response = await fetch("/api/users/saved-venues", {
      method: "DELETE",
      body: JSON.stringify({ venue }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.redirected) {
      document.location = response.url;
      return;
    }

    if (response.ok) {
      target.classList.add("animate__animated", "animate__bounceOut");
      target.children[0].classList.add(
        "animate__animated",
        "animate__heartBeat"
      );
    } else {
      alert(response.statusText);
    }
  }
};

const updateEventsForCalendar = async (calenderEl, calendarInstance) => {
  const venue = calenderEl.dataset.venueId;

  if (venue) {
    const response = await fetch(`/api/events/by-venue/${venue}`);

    //redirects user if they are not logged in
    if (response.redirected) {
      document.location = response.url;
      return;
    }

    if (response.ok) {
      let eventList = await response.json()
      let parsedEventList = eventList.map((element)=>{
        console.log(element.date)
        console.log(new Date(element.date))
        let newEvent = {
          title: element.name,
          start: element.date,
          allDay:true
        }
        return newEvent
      })
      for (const event of parsedEventList) {
        calendarInstance.addEvent(event)
      }
      calendarInstance.render()
    } else {
      alert(response.statusText);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  //Main book event button
  document
    .querySelector("#bookEventButton")
    .addEventListener("click", toggleEventModal);

  //Save and remove venue from user buttons
  let saveVenue = document.querySelector("#saveVenueButton");
  if (saveVenue) {
    saveVenue.addEventListener("click", addUserSavedVenue);
  }
  let removeSavedVenue = document.querySelector("#removeSavedVenueButton");
  if (removeSavedVenue) {
    removeSavedVenue.addEventListener("click", removeVenue);
  }

  //Modal buttons
  document
    .querySelector("#cancelButton")
    .addEventListener("click", toggleEventModal);
  document
    .querySelector("#bookEventForm")
    .addEventListener("submit", submitNewEvent);

  //Review form button
  document
    .querySelector("#newReview")
    .addEventListener("submit", submitNewReview);

  // Calender Scripting Start
  let calendarEl = document.querySelector('#jsCalender');
  if (calendarEl){
    // eslint-disable-next-line no-undef
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 500,
      dateClick: (event) => {
        toggleEventModal();
        document.querySelector("#eventDate").value = event.dateStr;
      }
    });
    updateEventsForCalendar(calendarEl, calendar)
  }

});
