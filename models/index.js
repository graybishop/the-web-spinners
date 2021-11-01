const Venue = require('./Venue.js')
const Review = require('./Review.js');
const User = require('./User.js');

User.hasMany(Review)
Review.belongsTo(User)

Venue.hasMany(Review)
Review.belongsTo(Venue)

module.exports = {Venue, User, Review}