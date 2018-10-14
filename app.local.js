const app = require('./app')

// Set the port in the .env file or use 8080 as default
const port = process.env.PORT || 8080;

app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
);