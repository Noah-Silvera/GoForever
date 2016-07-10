

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

 //prevent caching for development purposes. Caching can leave some subtle bugs in the code given to the client.
app.use(bodyParser())   
app.use(helmet.noCache()) 

// routing for the landing page 
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(indexHtml);
  res.send()
});

// the names of the html files to set up routing for
var staticFileArr = [
      'game',
      'gameOptions',
      'userLanding',
      'userSettings',
      'userProfile',
    ]
            
/**
 * @param  {Array} fileList A list of html files to set up static routing for
 */
;(function staticRoutingFactory(fileList){

    fileList.forEach(function(fileName){

      var fileString = fs.readFileSync(path.join(root,`static/${fileName}.html`))

      app.get(`/${fileName}`,function(req,res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileString);
        res.send()
      })
    })

})( staticFileArr )

// routing for the tree  page 
app.get('/', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(indexHtml);
  res.send()
});   

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



// routing for the tree  page 
app.get('/tree', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(buildTreeHtml());
  res.send()
});  




function buildTreeHtml(){
  var html;
  html =  `<div>
            <style>
                div {
                    margin-left:25px;
                    margin-top:10px;
                    margin-bottom:10px;
                    font-size:15px;
                }

                #wrapper {
                    margin:50px;
                }
            </style>
            <div id='wrapper'>
            <div>
                <a href="http://localhost:3000/">Login Page</a>
            </div>`
  
  staticFileArr.forEach(function(fileName){
    html +=   `<div>
                  <a href="http://localhost:3000/${fileName}">${fileName}</a>
              </div>`
  })

    html+=  `</div>
        </div>`

  return html
}

app.listen(3000, function(){
   info('---------------------------')  
   info('listening on localhost:3000')  
   info('---------------------------')  
})  
