var db = require('../../config/mongodb')

var schema = db.Schema
var user_schema = new schema( {
          username: String,
          realname: String,
          email: String,
          password: String
      }),
user = db.model('user', user_schema);

module.exports = user;