# GoForever

An implementation of the traditional chinese game Go, required for a SENG course.

## Enviroment setup

install [Node> 6.2](https://nodejs.org/en/) 

* **Ensure the correct version of node is on your path if you have previously installed node**

Install [Chrome > 52.0](https://www.google.com/chrome/browser/canary.html)

Install [Gulp CLI](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

In Chrome Canary (52) install [Live Reload Chrome Plugin (hot-reload browser side)](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

## npm dependency Setup

Navigate to the project directory

````npm install````

##Starting the app

````npm start```` or ````gulp````

The code will be pre-processed and run by gulp. 

Navigate to roberts.seng.uvic.ca:30128 

**Click the [livereload browser plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) icon to enable live reload of client code**

Any changes (frontend,backend) will be instantly reflected upon save in the browser.

**Notes** : 

* Changing core folder names will require you to change the patterns in the gulpfile for code refresh to work.


## Testing that the build is set up correctly

Start the app

Load the app.

Turn on the live-reload plugin

The page should refresh appropiately in all cases

#### Hot Reload CSS

* Change the color of the ````<p>```` object to blue in ````src/sass/index.scss````

#### Hot Reload client code

* Change the output of ````console.info()```` in ````src/scripts/frontend/index.js````

#### Hot reload server code

* Change the port in ````src/scripts/backend/server.js````

#### Hot push new source

* Add a new file to the source. Make it do something.


## Running Mocha Tests

* ````npm test```` will run all tests in the ````backend```` folder in the ````tests```` folder
* ````npm run test-client```` will run all frontend tests
  * More info on tests can be found in the TESTING.md documents in the ````tests```` folder 
* ````npm run example-test```` will run the example test suite ````tests\example.js````. See implementation for details

Mocha tests can be debugged in VS code. Their is a debugger set up already to run frontend and backend tests.

## More about the packages installed

* see ````packages.md````

## Debugging

Debugging with [vs code](https://code.visualstudio.com/)'s great debugger is setup. ````launch.json```` will debug the project\

## Backend Logging

Their are 6 global functions that log to different levels using [winston](https://github.com/winstonjs/winston)

````
error()
warn()
info()
verbose()
debug()
silly()
````

````console.log()```` has also been overwritten to log with ````info()````

## Frontend Logging

Please use ````console.info()````, ````console.error()````, etc 