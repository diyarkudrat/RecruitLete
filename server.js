const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload')

require('dotenv').config();

const app = express();


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

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
app.use(fileUpload());

// Set db
require('./data/recruithub-db');


// Static
app.use(express.static('public'));

//Controllers
require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/replies.js')(app);
require('./controllers/users.js')(app);


const mongoose = require('mongoose')
const mongo_uri = process.env.MONGODB_URI
mongoose.connect(mongo_uri)


const port = process.env.PORT

app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
});

module.exports = app;