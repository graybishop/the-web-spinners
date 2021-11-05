// eslint-disable-next-line no-undef
let homePageIntro = introJs().setOptions({
  steps: [{
    title: 'Welcome Mortals',
    intro: 'Here you can plan your next gathering! Birthday? Wedding? Retirement? Divorce? We offer the Best Venues at cut throat prices! We ask that you come prepared for the time of your life!'
  },
  {
    element: document.querySelector('#homeSearchForm'),
    intro: 'You can enter your city here to check out a location near you...'
  },
  {
    element: document.querySelector('#bookEventButton'),
    intro: 'Click the Visit Venue Page to get intimate details of our place, Login to Book your event. Star your favorites and modify your event details. '

  },
  {
    title: `That's it!`,
    intro: "Book Now! let's set this in stone!"
  }]
})

//Intro only runs on first visit to site
if(!window.localStorage.getItem('previousVisitor')){
  console.log(window.localStorage.getItem('previousVisitor'))
  homePageIntro.start()
  window.localStorage.setItem('previousVisitor', true)
}
