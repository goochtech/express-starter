const mongoose = require('mongoose');
const database_url = process.env.DATABASE_URL;

// Connect to the database
mongoose.connect(database_url, { useNewUrlParser: true });

module.exports = mongoose;