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

router.get('/venue/:id', async (req, res) => {
  try {
    const venueData = await Venue.findByPk(req.params.id, {
      include: [
        {
          model: Venue,
          attributes: ['id'],
        },
      ],
    });

    const venue = venueData.get({ plain: true});

    res.render('venue', {
      ...venue,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
  })
})

router.get('/form', (req, res) => {
  res.render("form");
});


module.exports = router