const morgan = require('morgan');
const express = require('express')
const sequelize = require('./config/connection.js')
const session = require('express-session');
const path = require('path');

//importing express handlebars
const expressHandlebars = require('express-handlebars');

const app = express()
const port = process.env.PORT || '3001'
// eslint-disable-next-line no-unused-vars
const {Venue,Event} = require('./models/index.js')

const routes = require('./routes/index.js')


//setting view engine to handlebars
const hbs = expressHandlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));

app.use(morgan('dev'))
app.use(routes)

const init = async () => {
    await sequelize.sync()
    app.listen(port, ()=>{
      console.log(`listening on http://localhost:3001/`)
    })
  }
  
  init() 