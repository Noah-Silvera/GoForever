

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
var indexHtml = fs.readFileSync(path.join(root,'static/index.html'));
var gameHtml = fs.readFileSync(path.join(root,'static/game.html'));
var gameOptionsHtml = fs.readFileSync(path.join(root,'static/gameOptions.html'));
var userLandingHtml = fs.readFileSync(path.join(root,'static/userLanding.html'));
var userSettingsHtml = fs.readFileSync(path.join(root,'static/userSettings.html'));
var userProfileHtml = fs.readFileSync(path.join(root,'static/userProfile.html'));
var treeHtml = fs.readFileSync(path.join(root,'static/tree.html'));
     
 //prevent caching for development purposes. Caching can leave some subtle bugs in the code given to the client.
      
// routing for the landing page 
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(indexHtml);
  res.send()
});   

// routing for the game page
app.get('/game', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(gameHtml);
  res.send()
});  

// routing for the game options page
app.get('/gameOptions', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(gameOptionsHtml);
  res.send()
});  

// routing for the user landing page
app.get('/userLanding', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(userLandingHtml);
  res.send()
});  


// routing for the user settings page
app.get('/userSettings', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(userSettingsHtml);
  res.send()
});  

// routing for the user profile page
app.get('/userProfile', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(userProfileHtml);
  res.send()
});  

app.get('/tree',function(req,res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(treeHtml);
  res.send()
})


// all requests to model data
// route both requests with and without an id
app.route(['/api/:model/:id','/api/:model'])
  .all(function(req,res,next){
    // parse the id if available
    if( req.params.id ){
      req.id = req.params.id 
    }

    // parse the model

    req.model = req.params.model 

    info(`request to ${req.model} for object`)

    next()
  })
  .get(function(req,res){

    if( req.id === undefined || req.id === null){
      res.status(400)
      res.send('Need ID in get request')
    }

    // retrieve the data
    dbAdapter.get(req.model,req.id)
      .then(function(data){
        res.status(200)
        res.send(data)

      })
      .catch(function(err){
        error(err)

        res.status(501)
        res.send(err)
      })

  })
  .post(function(req,res){

    // create new data
    dbAdapter.create(req.model, req.body)
      .then(function(result){
        res.status(200)
        res.send(result)
      },function(err){
        error(err)
        res.status(501) // method not implemented
        res.send(err)
      })

  })
  .patch(function(req,res){

    if( req.id === undefined || req.id === null){
      res.status(400)
      res.send('Need ID in patch request')
    }

    // update the data
    dbAdapter.update(req.model, req.id, req.body)
      .then(function(result){
        res.status(200)
        res.send(result)
      },function(err){
        error(err)
        res.status(501) // method not implemented
        res.send(err)
      })
  })


app.listen(3000, function(){
   info('---------------------------')  
   info('listening on localhost:3000')  
   info('---------------------------')  
})  