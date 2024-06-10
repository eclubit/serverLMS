const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const FormData = require('form-data');

const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var nodemailer = require('nodemailer');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
	let data = new FormData();
	data.append('user_id', '382593');
	let config = {
	  method: 'post',
	  maxBodyLength: Infinity,
	  url: 'https://www.eclub.lk/api/user_courses/all',
	  headers: { 
		'access_token': '$2y$10$S3W2WSR9sk5cf0yEqR1Rf.oZGkvhUu46idzux2QLMTTzt3m2IHIWS', 
		'Content-Type': 'application/json', 
		'Cookie': 'wtk_s=e8kvcekdr96vvqgmmectba1o23', 
		...data.getHeaders()
	  },
	  data : data
	};

	axios.request(config)
	.then((response) => {
	  res.send(JSON.stringify(response.data));
	})
	.catch((error) => {
	  console.log(error);
	});

});

app.get('/auth/:id', async(req, res) => {
	var id = req.params.id;
	res.send('<!DOCTYPE html>' +
			'	<head>' +
			'	</head>' +
			'	<body>' +
			'		<script>localStorage.setItem("LoggedIn_SRNo","'+ id  +'");' +
			'				 window.location.replace("/my-courses");</script>'+
			'	</body>' +
			'	</html>');
});

app.get('/my-courses', async(req, res) => {
	res.sendFile(`${__dirname}/public/index.html`, (err) => {
		if (err) {
		  console.log(err);
		  res.end(err.message);
		}
	});
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