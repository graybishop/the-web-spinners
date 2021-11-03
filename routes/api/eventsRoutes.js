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

//get route for event by id. Not sure if it will be used
router.get('/:id', async (req, res) =>{
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  const eventData = await Event.findByPk(req.params.id)

  if (!eventData){
    res.status(404).json({message: 'Cannot find Event'})
    return
  }

  res.json(eventData.toJSON())
})

//get route for event by userId
router.get('/by-user/:userId', async (req, res) =>{
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  const eventsData = await Event.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!eventsData){
    res.status(404).json({message: 'Cannot find events or user'})
    return
  }

  res.json(eventsData.toJSON())
})

module.exports = router;