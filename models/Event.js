const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE
        },
        cost: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    },
    {
        sequelize,
        modelName: 'event',
    }
);

module.exports = Event;