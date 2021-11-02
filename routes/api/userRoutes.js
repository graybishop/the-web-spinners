const router = require('express').Router();
const { User, Venue } = require('../../models');

router.post('/', async (req, res) => {
   try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
   }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({err});
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/saved-venues', async (req,res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  let user = await User.findByPk(req.session.userId)
  let venue = await Venue.findByPk(req.body.venue)
  if(user && venue){
    let result = await user.addSavedUserVenue(venue) 
    res.json({message: 'Venue added', result})
  } else {
    res.status(404).json({message: 'Venue or user not found'})
  }

})

module.exports = router;
