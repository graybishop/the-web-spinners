const Venue = require('./Venue.js')
const Review = require('./Review.js');
const User = require('./User.js');
const Event = require('./Event.js')

User.hasMany(Review)
Review.belongsTo(User)

Venue.hasMany(Review)
Review.belongsTo(Venue)

Venue.hasMany(Event)
Event.belongsTo(Venue)

User.hasMany(Event)
Event.belongsTo(User)


module.exports = {Venue, User, Review, Event}