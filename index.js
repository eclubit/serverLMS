const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var nodemailer = require('nodemailer');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/', (req, res) => {
	let sr_no = req.body.key;
	let data = new FormData();
	data.append('user_id', sr_no);
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
	  var resposeAll = JSON.stringify(response.data);
	  var result = [];

		for(var i in resposeAll){
			result.push(data[i]);
		}
		res.send(result);
	})
	.catch((error) => {
	  console.log(error);
	});

});

app.get('/', (req, res) => {
	let sr_no = "SR292440";//req.body.key;
	let data = new FormData();
	data.append('user_id', sr_no);
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
	  var resposeAll = JSON.stringify(response.data);
	  var result = [];

		for(var i in resposeAll){
			result.push(data[i]);
		}
		res.send(result);
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
	res.sendFile("public/index.html", { root: __dirname })
});

app.post('/send-email', async(req, res) => {
	let to = req.body.to;
	let userID = req.body.userID;
	let Password = req.body.Password;
	const transporter = nodemailer.createTransport({
	  service: "Gmail",
	  host: "smtp.gmail.com",
	  port: 587,
	  secure: false,
	   /*auth: {
		user: "office.eclub@gmail.com",
		pass: "nepc cnzg feyw uugd"
		},*/
		auth: {
		user: "officemanagementeclub@gmail.com",
		pass: "winq ncwt rpbm guja"
		},
	});
	console.log("Sending email to " + to + "");
	var mailOptions = {
	  from: 'officemanagementeclub@gmail.com',
	  to: to,
	  subject: 'Your Login Account Created for Lecture Hall Booking System',
	  text: "",
	  html: '<p style="margin-top : 4%;">Your Login Account Created for Lecture Hall Booking System. Please login to <a href="https://office.eclub.lk/">https://office.eclub.lk/</a> using following credintials.</p><table style="border-collapse: collapse;border: 1px solid;"><tbody><tr style="border: 1px solid;"><td style="border: 1px solid; width : 20%; padding : 1%">Username</td><td style="border: 1px solid; width : 40%; padding : 1%"><h4>'+ userID +'</h4></td></tr><tr><td style="border: 1px solid; width : 20%; padding : 1%">Password</td><td style="border: 1px solid; width : 40%; padding : 1%"><h4>'+ Password +'</h4></td></tr></tbody></table><br/><p>Please login and change your password.</p><p style="margin-top : 2%; color : red;"><b>The above details are highly private and confidential so please avoid sharing them.</b></p> </div>',
      /*attachments: [{
        filename: 'logo_jped.jpg',
        path: __dirname + '/public/images/logo_jped.jpg',
        cid: 'unique@prageeth.ee' //same cid value as in the html img src
      }]*/
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
		res.send('Email sent: ' + info.response);
	  }
	})
});


app.get('/', (req, res) => {
  res
    .status(200)
    .send('<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Bootstrap demo</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"><link rel="stylesheet" href="./css/style.css"></head><body><div class="w-50 mx-auto my-5"><div class="form-group"><label for="exampleInputEmail1">Enter Your SR Number</label><input type="text" class="form-control" id="data"></div><button type="submit" onclick="clicked()" class="btn btn-success my-2">Go LMS</button></div><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.3.0/mdb.umd.min.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script><script>function clicked(){var url="/auth/" + document.getElementById("data").value;window.location.href=url;}</script></body></html>')
    .end();
});

 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});