

var path = require('path')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var helmet = require('helmet')
var dbAdapter = require('./dbAdapter')
var aiInterface = require("./aiInterface");


//STUFF FOR SESSIONS/CURRENT WORK
var passport = require('passport');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
var session      = require('express-session');

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// required for passport
app.use(session({ secret: 'ilovestuffstuffstusususus',
                    cookie:{
                        maxAge: 3600000    
                    }})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/**
 * Logout
 * None of these three routes require the /api, since I didn't know how
 * they would be handled when they met multiple routing criteria
 * which can be changed later
 */
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/index.html');
});

/**
 * Signup
 * This is used instead of a /post/users since it was easier to incorporate
 * data validation into the passport config. However, such data validation is
 * useful for all data models and we could extend it into the db adapter
 * and then remove this extra route
 */
app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/userLanding.html', // redirect to the profile
    failureRedirect : '/index.html', // redirect back to the signup page if there is an error
}));


/**
 * Login
 */
app.post('/login', passport.authenticate('login', {
    successRedirect : '/userLanding.html', // redirect to the profile
    failureRedirect : '/index.html', // redirect back to the signup page if there is an error
}));

/**
 * post to ai move
 */
app.post("/move", function(req, res){

    console.log("POST Request to: /move");

    aiInterface.getRandomMove(req.body.size, req.body.board, req.body.last, function(move){
        res.json(move);
    });

});

////////////////////////////////////////
////  
////
////////////////////////////////////////
app.use(function(req, res, next){
    if(req.user){
        res.user = req.user
    }
    next()
})

/**
 * post to get armies
 */
app.post("/getArmies", function(req, res){

    console.log("POST Request to: /getArmies");
    
    
    aiInterface.getArmies(req.body.size, req.body.board, req.body.last, function(armies){
        res.json(armies);
        
    });

});

/**
 * This will redirect people to the home page if they try to access
 * a secure page while not logged in.
 */
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/index.html');
}



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

app.get('/', function(req, res){
    res.redirect('/index')
})

app.get('/getActive', function(req, res){
    var response;
    if(req.user){
        response = req.user
        response.password = null
        response = JSON.stringify(response)
    } else {
        response = null
    }
    res.send(response)
})

// set up express static directories
app.use(express.static(path.join(root,'/scripts/frontend').toString()));
app.use(express.static(path.join(root,'/static').toString()));
app.use(express.static(path.join(root,'/css').toString()));

//prevent caching for development purposes. Caching can leave some subtle bugs in the code given to the client.
app.use(helmet.noCache())  

// the names of the html files to set up routing for
var staticFileArr = [
      'game',
      'gameOptions',
      'hello'
    ]
 
var secureFileArr = [ 
      'userLanding',
      'userSettings',
      'userProfile',
      'index'
]          

/**
 * @param  {Array} fileList A list of html files to set up static routing for
 */

////////////////////////////////////////////////
//// Incorporate isLoggedIn() here somehow?
//// Maybe make two different staticFileaArrs?
////////////////////////////////////////////////
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

;(function staticRoutingFactory(fileList){

    fileList.forEach(function(fileName){

      var fileString = fs.readFileSync(path.join(root,`static/${fileName}.html`))

      app.get(`/${fileName}`,function(req,res){
        if(req.isAuthenticated()){
            if(fileName === "index"){
                res.redirect('/userLanding.html')
                res.send()
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(fileString);
                res.send()
            }
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fileString = fs.readFileSync(path.join(root,`static/index.html`))
            res.end(fileString)
            res.send()
        }
      })
    })

})( secureFileArr )


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
    dbAdapter.get(req.model, {"_id" : req.id})
      .then(function(data){
        if(data === null){
            res.status(404)
            res.send(req.model + " not found.")
        } else {
            res.status(200)
            res.send(data) 
        }
      })
      .catch(function(err){
        error(err)
        res.status(404)
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
        res.status(418)
        res.send(err)
      })

  })
  .patch(function(req,res){

    if( req.id === undefined || req.id === null){
      res.status(400)
      res.send('Need ID in patch request')
    }

    // update the data
    dbAdapter.update(req.model, {"_id" : req.id}, req.body)
      .then(function(result){
        if(result === null){
            res.status(404)
            res.send(req.model + " not found.")
        } else {
            res.status(200)
            res.send(result)
        }
      },function(err){
        error(err)
        res.status(400)
        res.send(err)
      })
  })



// routing for the tree  page 
app.get('/tree', function( req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(buildTreeHtml());
  res.send()
});

// routing for the tree  page 
app.patch('/updateHistory/:userid/:matchid', function(req, res){
    userid = req.params.userid 
    matchid = req.params.matchid
    dbAdapter.update('User', {_id : userid}, {$push : {matches : matchid}})
      .then(function(result){
        if(result === null){
            res.status(404)
            res.send(req.model + " not found.")
        } else {
            res.status(200)
            res.send(result)
        }
      },function(err){
        error(err)
        res.status(400)
        res.send(err)
      })
});



/////////////////////////

// Statistics and Rankings

/////////////////////////

app.get("/getStats", function (req, res) {
    console.log("GET Request to: /statistics");
    db.statistics((req.body.userName), function (err, data) {
        if (err) {
            res.status(500).send();
        } else {
            console.log(data);
            res.status(200).json(data);
        }
    });
});

app.post("/statistics", function (req, res) {
    console.log("POST Request to: /statistics");

    db.addStats(req.body, function (err) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
});


app.post("/statisticsRemove", function (req, res) {
    console.log("POST Request to: /statisticsRemove");

    db.removeStats((req.body.userName), function (err) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
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
