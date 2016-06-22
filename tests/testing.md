
## Running tests

**Backend:** ````npm test````

**Frontend:** Open ````tests/frontend/mocha.html```` in the browser

* **Pro-Tip:** npm run test-client will run the mocha client tests on **windows only** 


## Mocking HTTP requests in your tests

http://bulkan-evcimen.com/testing_with_mocha_sinon

## Setting up custom test suite runs

add a new command to ````package.json```` under scripts 

````
  "scripts": {
    "start": "gulp",
    "test": "./node_modules/.bin/mocha ./tests/backend/**/*.js",
    "example_test": "./node_modules/.bin/mocha ./tests/example.js",
    "my_custom_test_run": "./node_modules/.bin/mocha ./tests/my_test.js"
  },
````

```` npm run my_custom_test_run```` will run your custom test suite

You can also use file patterns to match multiple test suites


## BDD testing explanation

http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/

## Misc

NPM validator is installed ( useful for verifying emails and the like ) https://www.npmjs.com/package/validator

