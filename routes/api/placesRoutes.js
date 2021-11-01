const router = require('express').Router();
const { Places } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newPlaces = await Places.create({
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
    const placesData = await Places.destroy({
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
