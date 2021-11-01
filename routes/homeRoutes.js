const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { Venue } = require('../models');

router.get('/', async (req, res) => {
  let firstSetData = await Venue.findAll({limit:6})
  
  const maxTextSize = 150 //higher numbers mean more letters on the homepage cards descriptions
  let firstSet = firstSetData.map(element => {
    let data = element.toJSON()
    if(data.description.length > maxTextSize){
      data.description = data.description.substr(0, maxTextSize) + '...'
    }
    return data
  })

  res.render('home', {
    title: 'Unearthly Venues',
    venues: firstSet
  })
})

module.exports = router