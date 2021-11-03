const router = require('express').Router();
const { Event } = require('../../models');




router.post('/events', async (req, res) => {
  try {
    const eventData = await Event.create(req.body);

    req.session.save(() => {
      req.session.user_id = eventData.id;
      req.session.logged_in = true;

      res.status(200).json(eventData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/events', async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router