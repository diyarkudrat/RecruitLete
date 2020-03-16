const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Adding body parser
app.use(expressValidator());


//Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Routes
app.get('/', (req, res) => {
    res.render('layouts/main');
  })


app.listen(3000, () => {
    console.log('Reddit listening on localhost:3000')
});

module.exports = app;