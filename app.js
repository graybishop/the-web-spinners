const morgan = require('morgan');
const express = require('express')
const sequelize = require('./config/connection.js')

const app = express()
const port = process.env.PORT || '3001'
const {Venue} = require('./models/index.js')

app.use(morgan('dev'))


const init = async () => {
    await sequelize.sync({alter:true})
    app.listen(port, ()=>{
      console.log(`listening on http://localhost:3001/`)
    })
  }
  
  init() 