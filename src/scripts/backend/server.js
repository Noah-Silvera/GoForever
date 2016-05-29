var express = require('express')
var path = require('path')
var fs = require('fs')

var app = express()

// set up express static directories
app.use(express.static('dest/scripts/client'));
app.use(express.static('dest/static'));
app.use(express.static('dest/css'));
      
            
// load static files for serving
var indexHtml = fs.readFileSync('dest/static/index.html').toString();
   
// routing for the app homepage
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(indexHtml);
  res.send()
});

app.listen(3000, function(){
    console.log('listening on localhost:3000')  
})