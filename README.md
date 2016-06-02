# GoForever
An implementation of the traditional chinese game Go, required for a SENG course.

## Dependencies

[Node> 6.2](https://nodejs.org/en/) 

[Chrome > 52.0](https://www.google.com/chrome/browser/canary.html)

[Gulp CLI](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

[Live Reload Chrome Plugin (hot-reload browser side)](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

## Setup

Navigate to the project directory

````npm install````

##Starting the app

Navigate to the project directory

````npm start````

The code will be pre-processed and run by gulp. Any changes (frontend,backend) will be instantly reflected upon save in the browser.

**Notes** : 

* Any added or deleted files will require you to run ````npm start```` again.

* Changing core folder names will require you to change the patterns in the gulpfile for code refresh to work.

* ```gulp```` clean will clear the ````dest```` directory of old files



Navigate to localhost:3000 

**Click the livereload browser plugin icon to enable live reload of client code**

Your code should not be instantly reloaded in the browser upon changes.
