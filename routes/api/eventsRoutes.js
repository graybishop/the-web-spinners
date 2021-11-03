const router = require('express').Router();
const { Event } = require('../../models');

router.post('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  const eventData = await Event.create(req.body);

  res.status(200).json(eventData);

});


router.delete('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  const eventData = await Event.destroy({
    where: {
      id: req.params.id,
      userId: req.session.userId,
    },
  });

  if (!eventData) {
    res.status(404).json({ message: 'No event found!' });
    return;
  }

  res.status(200).json(eventData);

});

module.exports = router;