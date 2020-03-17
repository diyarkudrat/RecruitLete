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

const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);

// Set db
require('./data/recruithub-db');


//Routes
app.get('/posts/new', (req, res) => {
    res.render('posts-new')
});


//Controllers
require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);
// require('./controllers/profile.js')(app);



app.listen(3000, () => {
    console.log('listening on localhost:3000')
});

module.exports = app;