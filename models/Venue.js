const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

Venue.init(
  {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(3475),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateAbbrev: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cityLongitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cityLatitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'venue',
    timestamps: false
  }
);

module.exports = Venue