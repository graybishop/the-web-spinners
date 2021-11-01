const morgan = require('morgan');
const express = require('express')

const app = express()
const port = process.env.PORT || '3001'

app.use(morgan('dev'))


const init = async () => {
    // await sequelize.sync()
    app.listen(port, ()=>{
      console.log(`listening on http://localhost:3001/`)
    })
  }
  
  init()