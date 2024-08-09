const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const FormData = require('form-data');
const requestIp = require('request-ip')
const { promisify } = require('util');

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

var cryptoH = [
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 01.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 02.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New crypto session 03.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 04.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 05.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 06.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 07.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 08.mp4"
]

var cryptoF = [
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 01.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 02.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New crypto session 03.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 04.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 05.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 06.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 07.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 08.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 09.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 10.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 11.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 12.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 13.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 14.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 15.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 16.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 17.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 18.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 19.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 20.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 21.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/New Crypto Session 22.mp4",
	//"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 23.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 24.mp4",
	"https://d1qbxnh5ik5y1d.cloudfront.net/Crypto 25.mp4"
]
















































app.post('/api/viewCourse', (req, res) => {
	let sr_no = req.body.srNo;
	let course = req.body.course;
	let accessLevel = req.body.accessLevel;
	cryptoH
});

app.post('/api/get_courses', async (req, res) => {
	let sr_no = req.body.key;
	let data = new FormData();
	data.append('user_id', sr_no);
	
	var courseList = [];
	
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

	await axios.request(config)
	.then((response) => {
	  var resposeAll = response.data;

		for(var i in resposeAll){
			var record1 = resposeAll[i].category + "- H";
			var record2 = resposeAll[i].category + "- F";
			if(i > 0){
				for(var j = 0 ; j < courseList.length; j++){
					if(courseList[j] == record1 && courseList[j] == record2){
						
					}
					else {
						courseList.push(resposeAll[i].category + "- " + resposeAll[i].status);
					}
				}
			}
			else {
				courseList.push(resposeAll[i].category + "- " + resposeAll[i].status);
			}
		}
		res.send(courseList);
	})
	.catch((error) => {
	  console.log(error);
	});
});

app.post('/api/get/personal_details', async (req, res) => {
	let sr_no = req.body.key;
	let data = new FormData();
	data.append('user_id', sr_no);
	
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://www.eclub.lk/api/user/',
		headers: { 
			'access_token': '$2y$10$S3W2WSR9sk5cf0yEqR1Rf.oZGkvhUu46idzux2QLMTTzt3m2IHIWS', 
			'Content-Type': 'text', 
			'Cookie': 'wtk_s=e8kvcekdr96vvqgmmectba1o23', 
			...data.getHeaders()
		},
		data : data
	};
	await axios.request(config)
	.then((response) => {
		var resposeAll = response.data;
		res.send(resposeAll);
	})
	.catch((error) => {
	  console.log(error);
	});
	
	
		
})


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