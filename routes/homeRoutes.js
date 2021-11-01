const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { Venue } = require('../models');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Unearthly Venues',
    venues: [1,2,3,4,5]
  })
})

module.exports = router