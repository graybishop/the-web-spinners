const router = require('express').Router();

const apiRoutes = require('./api/index.js');

const htmlRouter=require('./htmlRouter');


router.use('/api', apiRoutes);
router.use('/', htmlRouter);
module.exports = router;