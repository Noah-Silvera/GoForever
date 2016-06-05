## Mocking HTTP tests

http://bulkan-evcimen.com/testing_with_mocha_sinon

## setting up test suite runs

add a new command to ````package.json```` under scripts 

````
  "scripts": {
    "start": "gulp",
    "test": "./node_modules/.bin/mocha ./tests/frontend/**/*.js ./tests/backend/**/*.js",
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

