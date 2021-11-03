const router = require('express').Router();

const venuesRoutes = require('./venuesRoutes.js');
const userRoutes = require('./userRoutes.js');
const eventRoutes = require('./eventsRoutes.js')

router.use('/users', userRoutes);
router.use('/venues', venuesRoutes)
router.use('/events', eventRoutes)
module.exports = router;

