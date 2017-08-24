// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.get(function(req, res) {
  console.log(req.url) ;
  console.log(req.path) ;
  res.send(req.path) ;
})
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get("/:date", function(req, res) {
  var numb = parseInt(req.params.date*1000) ;
  if(numb.toString()==="NaN") {
    // it is a string
    numb = req.params.date ;
    numb = numb.split("%20") ;
    numb.join(' ') ;
  }
  
  var date = new Date(numb) ;
  var date1 = new Date("500") ;
  
  if(date.toDateString()!= date1.toDateString()) {
    var object = {} ;
    object["unix"] = Math.floor(date.getTime()/1000) ;
    object["natural"] = date.toDateString() ;
    res.json(object) ;
  }
})
app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
