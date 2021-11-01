const morgan = require('morgan');
const express = require('express')
const sequelize = require('./config/connection.js')
const session = require('express-session');

const app = express()
const port = process.env.PORT || '3001'
const {Venue} = require('./models/index.js')

app.use(morgan('dev'))

// create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up session
const sess = {
  secret: 'secret',
  cookie: {maxAge:1800000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const init = async () => {
    await sequelize.sync({alter:true})
    app.listen(port, ()=>{
      console.log(`listening on http://localhost:3001/`)
    })
  }
  
  init() 