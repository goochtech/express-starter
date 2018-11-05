require('dotenv').config();
const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    hbs = require('express-handlebars'),
    fs = require('fs'),  // can be removed if using manual routes
    session = require('express-session'), //express session
    MemoryStore = require('memorystore')(session), // a production memory store
    passport = require('passport')  // passportjs authentication

// Initialize Passport and restore authentication state, if any, from the session.
// Uses MemoryStore which is a in memory cache without memory leaks
let sess = {
    store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
    }),secret: '6nQ336mtBhAAQdTW9Xa29C3TRfKKnYjDj9kRpaSXuvwvmca97K', resave: false, saveUninitialized: false, cookie: { secure: false, maxAge: 604800000 } };

// check the environment and set secure cookies in production
// comment this out if you don't want it for prod
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// Allow express to serve static content
app.use(express.static(__dirname + '/public'));

// Add bodyparser for getting data from req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Add request logging to console for development environment
if (process.env.NODE_ENV == 'development') {
    app.use(require('morgan')('combined'));
}

// Define the layout info
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/app/views/layouts/'
}));

// Where my views at?
app.set('views', './app/views');
// Using Handlebars
app.set('view engine', 'hbs');

// Choose this or manually add the routes yourself
// Loop through the app/controllers directory and add the routes
// Make new files in the controllers directory and they will be added here
fs.readdirSync('./app/controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./app/controllers/' + file);
        route.controller(app);
    }
});

// Manually add the routes yourself
// Comment this out if you choose above
// indexRoute = require('./app/controllers/indexController');
// indexRoute.controller(app);
// passportRoute = require('./app/controllers/passportController');
// passportRoute.controller(app);
// usersRoute = require('./app/controllers/usersController');
// usersRoute.controller(app);

// Add default 404 response
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found' });
})

// Export this app for Serverless deployment
module.exports = app;