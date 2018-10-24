require('dotenv').config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const hbs = require('express-handlebars');
const router = express.Router();
const fs = require('fs');

// Add all your routers once you make them
// let indexRouter = require('./routes/indexRoute');

// Allow express to serve static content
app.use(express.static(__dirname + '/public'));

// Add bodyparser for getting data from req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

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
// fs.readdirSync('./app/controllers').forEach(function (file) {
//     if(file.substr(-3) == '.js') {
//         route = require('./app/controllers/' + file);
//         route.controller(app);
//     }
// });

// Manually add the routes yourself
// Comment this out if you choose above
indexRoute = require('./app/controllers/indexController');
indexRoute.controller(app);
usersRoute = require('./app/controllers/usersController');
usersRoute.controller(app);

// Add default 404 response
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found' });
})

// Export this app for Serverless deployment
module.exports = app;

// TODO: add http://passportjs.org/ for authentication