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
app.use(express.static('public'));

var nodemailer = require('nodemailer');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/test', (req, res) => {
   res.send("Is Work Success");
})

app.post('/api/auth', (req, res) => {
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
	  var resposeAll = response.data;
	  var result = [];

		for(var i in resposeAll){
			var record1 = resposeAll[i].category + "- H";
			var record2 = resposeAll[i].category + "- F";
			if(i > 0){
				for(var j = 0 ; j < result.length; j++){
					if(result[j] == record1 || result[j] == record2){
						
					}
					else {
						result.push(resposeAll[i].category + "- " + resposeAll[i].status);
					}
				}
			}
			else {
				result.push(resposeAll[i].category + "- " + resposeAll[i].status);
			}
		}
		var obj = new Object({ "key" :  result});
		res.send(obj);
	})
	.catch((error) => {
	  console.log(error);
	});

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

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});