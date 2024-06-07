const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

var nodemailer = require('nodemailer');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});

app.get('/auth/:id', async(req, res) => {
	var id = req.params.id;
	res.send('<!DOCTYPE html>' +
			'	<head>' +
			'	</head>' +
			'	<body>' +
			'		<script>localStorage.setItem("LoggedIn_SRNo","'+ id  +'");' +
			'				 window.location.replace("/test");</script>'+
			'	</body>' +
			'	</html>');
});

app.get('/test', async(req, res) => {
	res.send('<!DOCTYPE html>' +
			'	<head>' +
			'	</head>' +
			'	<body>' +
			'		<h1 id="data">Hello! this is home page</h1>' +
			'		<script>document.getElementById("data").innerHTML = localStorage.getItem("LoggedIn_SRNo");</script>' +
			'	</body>' +
			'	</html>');
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