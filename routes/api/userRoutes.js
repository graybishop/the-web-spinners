const router = require('express').Router();
const { User, Venue } = require('../../models');

router.post('/', async (req, res) => {
   try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
   }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/users/saved-venues', async (req,res) => {
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
