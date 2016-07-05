before(function(done){
    var chai = require('chai')
    var chaiAsPromised = require('chai-as-promised')

    chai.use(chaiAsPromised)

    // any global variables to be used in test cases should go here

    global.sinon = require('sinon')
    require('sinon-as-promised')
    global.should = chai.should()

    done()
})