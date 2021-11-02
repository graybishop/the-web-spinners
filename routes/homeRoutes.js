const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { Venue } = require('../models');

router.get('/', async (req, res) => {
  let firstSetData = await Venue.findAll({limit:6})
  
  const maxTextSize = 150 //higher numbers mean more letters on the homepage cards descriptions
  let firstSet = firstSetData.map(element => {
    let data = element.toJSON()
    if(data.description.length > maxTextSize){
      data.description = data.description.substr(0, maxTextSize) + '...'
    }
    return data
  })

  res.render('home', {
    title: 'Unearthly Venues',
    venues: firstSet,
    loggedIn: req.session.loggedIn
  })
})

router.get('/venues/:id', async (req, res) => {
  try {

    let result = await Venue.findByPk(req.params.id)
    
    res.render('venue', {
      title: 'Login',
      venue: result.toJSON(),
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
    loggedIn: req.session.loggedIn
  })
})

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  
  res.render('dashboard', {
    title: 'Dashboard',
    loggedIn: req.session.loggedIn
  })
})

router.get('/form', (req, res) => {
  res.render("form");
});


module.exports = router