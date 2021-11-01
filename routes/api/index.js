const router = require('express').Router();

const placesRoutes = require('./placesRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/users', userRoutes);
router.use('/venues', placesRoutes)
module.exports = router;

