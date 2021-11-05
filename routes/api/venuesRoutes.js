const router = require('express').Router();

const { Venue } = require('../../models');
const {withAuth} = require('../../utils/helpers.js');
const { Op } = require("sequelize");

//route used by search bar on the homepage
router.get('/:location', async (req, res) => {
  let venuesInCityData = await Venue.findAll({
    where:{
      [Op.or]:[{city: req.params.location}, {state: req.params.location}]
    },
    attributes:{
      exclude:['country', 'longitude', 'latitude', 'cityLongitude', 'cityLatitude']
    },
    limit:8
  })

  
  if(!venuesInCityData){
    res.status(404).json({message: `Could not find venue with that city.`})
    return
  }
  
  let venuesInCity = venuesInCityData.map(element => element.toJSON())
  res.json(venuesInCity)
})

router.get('/state/:state', async (req, res) => {
  let foundState = await Venue.findOne({
    where:{
      state: req.params.state
    }
  })

  if(!foundState){
    res.status(404).json()
    return
  }
  res.json(foundState.toJSON())
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newPlaces = await Venue.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlaces);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const placesData = await Venue.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!placesData) {
      res.status(404).json({ message: 'No place found!' });
      return;
    }

    res.status(200).json(placesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
