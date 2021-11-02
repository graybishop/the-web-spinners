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

router.get('/home2', async (req, res) => {
  let firstSetData = await Venue.findAll({limit:6})
  
  const maxTextSize = 150 //higher numbers mean more letters on the homepage cards descriptions
  let firstSet = firstSetData.map(element => {
    let data = element.toJSON()
    if(data.description.length > maxTextSize){
      data.description = data.description.substr(0, maxTextSize) + '...'
    }
    return data
  })

  res.render('homebs', {
    title: 'Unearthly Venues',
    venues: firstSet,
    layout: 'bs-main'
  })
})

router.get('/home3', async (req, res) => {
  let firstSetData = await Venue.findAll({limit:6})
  
  const maxTextSize = 150 //higher numbers mean more letters on the homepage cards descriptions
  let firstSet = firstSetData.map(element => {
    let data = element.toJSON()
    if(data.description.length > maxTextSize){
      data.description = data.description.substr(0, maxTextSize) + '...'
    }
    return data
  })

  res.render('hometw', {
    title: 'Unearthly Venues',
    venues: firstSet,
    layout: 'maintw'
  })
})

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
    layout: 'bs-main'
  })
})

router.get('/form', (req, res) => {
  res.render("form");
});

router.get('/saved', (req, res) => {
  res.render("saved");
});

module.exports = router