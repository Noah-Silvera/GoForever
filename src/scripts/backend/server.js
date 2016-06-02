var express = require('express')
var path = require('path')
var fs = require('fs')
var helmet = require('helmet')

var app = express()

// because we build our output to a different directory, must prepend all paths with this root
var root = 'dest/'

// set up express static directories
app.use(express.static(path.join(root,'/scripts/frontend').toString()));
app.use(express.static(path.join(root,'/static').toString()));
app.use(express.static(path.join(root,'/css').toString()));

          
            
// load static files for serving      
var indexHtml = fs.readFileSync(path.join(root,'static/index.html'));
var index = fs.readFileSync(path.join(root,'scripts/frontend/index.js'));
     
 //prevent caching for development purposes. Caching can leave some subtle bugs in the code given to the client.
 app.use(helmet.noCache()) 
      
// routing for the app homepage
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(indexHtml);
  res.send()
});   

app.listen(3000, function(){
    console.log('listening on localhost:3000')  
})  