const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var nodemailer = require('nodemailer');

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});

app.get('/mail', (req, res) => {
  res
    .status(200)
    .send('Sending Email...')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});