// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const url = require("url");
const moment = require("moment");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
  
})

app.get("/*", (req, res) => {
  let query = url.parse(req.url, true).pathname.slice(1);
  let time = "";
  if(!isNaN(query)){
    time = moment.unix(decodeURI(query));
     }else{
    time = moment(decodeURI(query));
     }
  let result = {unix:null, natural:null};
  if(time.isValid()){
    result.unix = time.format("X");
    result.natural = time.format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  res.end(JSON.stringify(result));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
