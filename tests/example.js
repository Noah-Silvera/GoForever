/**
 * An Example test suite to base other test suites off of
 * run the command  npm run example_test to see the output
 */


//required require ( dont forget to add parenthese after should!)
var should = require('chai').should()

// required to test promises
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
 
chai.use(chaiAsPromised);

//
describe('Testing synchronous and asynchronous code',function(){
    // this test suite should take less than 10 seconds to run
    this.timeout( 10 * 1000)
    
    before(function(){
        console.log('this is executed before the whole test suite starts')
    })
    
    beforeEach(function(){
        console.log('this is executed before each test. Each "it" block')
    })
    
    
    //simple straightforward non assync test
    it('tests one case of the functionality',function(){
        
        // check for properties
        [0].should.have.length(1)
        
        //check for values
        'string'.should.equal('string')
        
        //check for object equivalence
        var nestedObj = { some: { nested : 'object'} }
        
        var unknownObj = { some: { nested : 'object'} }
        unknownObj.should.eql(nestedObj)
    })
    
    //async test
    //pass done to async tests
    it('tests an asynchrnous case ',function(done){
        // this test case should take less than 500 milliseconds to run
        this.timeout(500)
        
        setTimeout(function(){
            // since asynchronous test, we must pass and call done to complete the test
            done()
        },300)
    })
    
    
    // working with promises
    // https://www.npmjs.com/package/chai-as-promised
    it('tests a promise asynchronous case',function(){
        // return a promise object
        
        function promiseWrapper(param){
            // setup a promise
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        console.log(param)
                        // the value you return here is what you will test
                        resolve('success')
                    },100)
            })
        }
        
        return promiseWrapper('some data').should.eventually.equal('success')
    })
    
    
    after(function(){
        console.log('this is executed after the whole test suite starts')
    })
    
    afterEach(function(){
        console.log('this is executed after each test. Each "it" block')
    })
})

// see an example here http://bulkan-evcimen.com/testing_with_mocha_sinon
describe('mocking http tests with sinon',function(){
    
    // I dont know how to use sinon yet - this will be filled out when we start testing the REST API
    
})