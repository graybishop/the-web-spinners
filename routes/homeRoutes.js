const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { Venue, User, Review, Event } = require('../models');

router.get('/', async (req, res) => {
  let firstSetData = await Venue.findAll({
    limit: 6,
  });

  //checks if logged in user has any of the venues saved
  let userData = await User.findByPk(req.session.userId);
  let userHasVenue = [];
  if (userData) {
    for (const element of firstSetData) {
      userHasVenue.push(await element.hasUser(userData));
    }
  }
  const maxTextSize = 150; //higher numbers mean more letters on the homepage cards descriptions
  let firstSet = firstSetData.map((element, index) => {
    let data = element.toJSON();
    if (data.description.length > maxTextSize) {
      data.description = data.description.substr(0, maxTextSize) + '...';
    }
    if (userHasVenue.length) {
      data.userSaved = userHasVenue[index];
    } else {
      data.userSaved = false;
    }
    return data;
  });



  res.render('home', {
    title: 'Unearthly Venues',
    venues: firstSet,
    loggedIn: req.session.loggedIn
  });
});

router.get('/venues/:id', async (req, res) => {
  try {

    let venueData = await Venue.findByPk(req.params.id, {
      include: [
        Event,
        {
          model: Review,
          include: [User],

        },
      ]
    });



    let userHasSaved = await venueData.hasUser(await User.findByPk(req.session.userId));



    res.render('venue', {
      title: 'Venue',
      venue: venueData.toJSON(),
      loggedIn: req.session.loggedIn,
      userHasSaved
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
    loggedIn: req.session.loggedIn
  });
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  let userData = await User.findByPk(req.session.userId, {
    attributes: {
      exclude: ['password'],
    },
    include: [
      Venue, {
        model: Event,
        include: [Venue]
      },
      Review
    ]
  });
  res.render('dashboard', {
    title: 'Dashboard',
    loggedIn: req.session.loggedIn,
    user: userData.toJSON()
  });
});

router.get('/form', (req, res) => {
  res.render("form");
});


module.exports = router;