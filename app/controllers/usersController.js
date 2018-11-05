// Import the database
const db = require('../../config/mongodb');

// Import the user model
var userModel = require('../models/usersModel');

module.exports.controller = function(app) {
/**
 * a signup route
 */
  app.post('/signup',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {

    const user = new userModel();
    user.username = req.body.username;
    user.password = req.body.password;
    user.realname = req.body.realname;
    user.email = req.body.email;
    user.save(function (err) {
      if (err) res.send('opps, something went wrong');
      else res.send('thanks for signing up');
    });
   
  });
/**
 * a users route to show users
 */
  app.get('/users',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {

    let locals = res.locals;
    locals.title = 'express-starter';
    locals.users = [];
    userModel.find({}, function (err, docs) {
      if (err) {
        console.log('oops: ' + err)
      }
      else {
        docs.forEach(document => {
          locals.users.push(document);
        });
      }
      res.render('users');
    });
  });

}
