const morgan = require('morgan');
const express = require('express')
const sequelize = require('./config/connection.js')

const app = express()
const port = process.env.PORT || '3001'
// eslint-disable-next-line no-unused-vars
const {Venue, Event} = require('./models/index.js')

app.use(morgan('dev'))

const init = async () => {
    await sequelize.sync()
    app.listen(port, ()=>{
      console.log(`listening on http://localhost:3001/`)
    })
  }
  
  init() 