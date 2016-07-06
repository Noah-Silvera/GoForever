

var path = require('path')
var fs = require('fs')
var express = require('express')
var app = express()
var helmet = require('helmet')

// a fix to propagate errors thrown in promises
// https://gist.github.com/benjamingr/0237932cee84712951a2
process.on('unhandledRejection', function(reason, p){
    error("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

//perform initial enviroment checks
require('./utils/es6_test')
//set up logging with winston
require('./utils/log_setup')

// set up DB

require('./dbAdapter')


var root = 'src/'

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
   info('---------------------------')  
   info('listening on localhost:3000')  
   info('---------------------------')  
})  