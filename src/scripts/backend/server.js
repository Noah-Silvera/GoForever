

var path = require('path')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var helmet = require('helmet')
var dbAdapter = require('./dbAdapter')

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

app.use(bodyParser())   
app.use(helmet.noCache()) 
            
// load static files for serving      
var userHtml = fs.readFileSync(path.join(root,'static/user.html'));
     
 //prevent caching for development purposes. Caching can leave some subtle bugs in the code given to the client.
      
// routing for the app  homepage
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(userHtml);
  res.send()
});   


app.route('/api/:model/:id')
  .all(function(req,res,next){
    if( req.params.id ){

    }
    req.id = req.params.id 
    req.model = req.params.model 

    info(`request to ${req.model} for object`)

    next()
  })
  .get(function(req,res){

    dbAdapter.get(req.model,req.id)
      .then(function(data){
        res.status(200)
        res.send()

      })
      .catch(function(err){
        error(err)
        res.status(501)
        res.send(err)
      })

  })
  .post(function(res,res){

    dbAdapter.create(req.model,req.body)

  })

app.listen(3000, function(){
   info('---------------------------')  
   info('listening on localhost:3000')  
   info('---------------------------')  
})  