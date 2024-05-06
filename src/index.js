const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars').engine;
const path = require('path');

const app = express()
const port = 3000

const route = require('./routes');
const db = require('./config/db');
const { helpers } = require('handlebars');

//connect to db
db.connect();

//log request
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public'))); //static file

//parse body
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());

//override method
app.use(methodOverride('_method'));

//template engine
app.engine(
  "hbs",
  exphbs({ 
    extname: '.hbs',
    helpers:{
        sum: (a, b) => a + b,
    },
  }),
)
app.set('view engine', 'hbs');
app.set('views', './views');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})