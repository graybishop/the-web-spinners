const router = require('express').Router();

const apiRoutes = require('./api/index.js');
const homeRoutes = require('./homeRoutes.js');

const htmlRouter=require('./htmlRouter');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);

router.use('/api', apiRoutes);
router.use('/', htmlRouter);
module.exports = router;