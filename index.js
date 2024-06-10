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
	res.send('<html>'+
	'<head>'+
	'	<meta charset="utf-8">'+
	'	<meta name="viewport" content="width=device-width, initial-scale=1">'+
	'	<title>Bootstrap demo</title>'+
	'	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">'+
	'	<style>'+
	'		.wrapper {'+
	'		  width: 80vw;'+
	'		  margin-top : 6vw;'+
	'		  margin-bottom : 6vw;'+
	'		  margin-left : 10vw;'+
	'		}'+
	'		.custom-select {'+
	'					display: block;'+
	'					width: 100%;'+
	'					height: 40px;'+
	'					font-size: 13px;'+
	'					line-height: 1.1;'+
	'					padding: 5px 20px;'+
	'					color: #4D4E50;'+
	'					border: 1.5px solid #E8E9EC;'+
	'					border-radius: 3px;'+
	"					background: url('<i class='fa fa-times' aria-hidden='true'></i>') no-repeat right 15px center;"+
	'					background-size: 10px;'+
	'					-webkit-appearance: none;'+
	'					-moz-appearance: none;'+
	'					appearance: none;'+
	'					cursor: pointer;'+
	'					margin: 0px;'+
	'					box-sizing: border-box;'+
	'					display: block;'+
	'		}'+
	'		.custom-select:focus {'+
	'			outline: none;'+
	'			border-color: #007bff;'+
	'		}'+
	'	</style>'+
'	</head>'+
'	<body>'+
'		<div class="wrapper">'+
'			<select class="custom-select">'+
'				<option class="select" value="0">Select option:   </option>'+
'				<option class="select" value="1">Option 1</option>'+
'				<option class="select" value="2">Option 2</option>'+
'				<option class="select" value="3">Option 3</option>'+
'				<option class="select" value="4">Option 4</option>'+
'			</select>'+
'		</div>'+
'		<div class="row row-cols-1 row-cols-md-4 g-4 mx-1">'+
'		  <div class="col">'+
'			<div class="card">'+
'				<video width="100%" height="200" controls controlsList="nodownload">'+
'				  <source src="https://media.istockphoto.com/id/1463959712/video/beautiful-sunrise-over-the-sea.mp4?s=mp4-640x640-is&k=20&c=cazDXMgzJFrBXjl47BGtJzsAEg376J7sBjWDhIvqSZ0=" type="video/mp4">'+
'				  <source src="movie.ogg" type="video/ogg">'+
'				  Your browser does not support the video tag.'+
'				</video>'+
'			  <div class="card-body">'+
'				<p class="card-text">Day 01</p>'+
'			  </div>'+
'			</div>'+
'		  </div>'+
'		</div>'+
'		<script '+
'		  type="text/javascript" '+
'		  src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.3.0/mdb.umd.min.js" '+
'		></script> '+
'		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>'+
'		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>'+
'		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>'+
'		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>'+
'		<script>'+
'			function clicked(){'+
'				'+
'			}'+
'		</script>'+
'	</body>'+
'</html>');
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