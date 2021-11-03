const router = require('express').Router();

const placesRoutes = require('./placesRoutes.js');
const userRoutes = require('./userRoutes.js');
const eventRoutes = require('./eventsRoutes.js')

router.use('/users', userRoutes);
router.use('/venues', placesRoutes)
router.use('/events', eventRoutes)
module.exports = router;

