var express = require('express');
var app = express();

const request = require('request');

const  bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('/home/ec2-user/oneRoute/index.html');
});


request('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=93abcd905332612d2a77ca3a4e1b2aa7', function(err, res, body) {
    console.log(body);
});



app.post('/submit-location-data', function (req, res) {
    var startVar = req.body.startLocation;
    var daysVar = req.body.numDays;
    var startVar2 = '' + startVar;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + startVar2 + '&units=metric&appid=93abcd905332612d2a77ca3a4e1b2aa7';
    console.log(url);

    request({url: url}, function(err, res, body) {
        console.log(body);
    }); 

    res.send('Showing weather for ' + daysVar + ' days, in ' + startVar + 'Temperature:  ' + req.body.name);
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
