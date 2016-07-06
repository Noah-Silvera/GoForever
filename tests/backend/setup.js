// a fix to propagate errors thrown in promises
// https://gist.github.com/benjamingr/0237932cee84712951a2
process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

before(function(done){



    var chai = require('chai')
    var chaiAsPromised = require('chai-as-promised')

    chai.use(chaiAsPromised)

    // any global variables to be used in test cases should go here

    global.sinon = require('sinon')
    require('sinon-as-promised')
    global.should = chai.should()

    global.scriptsPath = './../../src/scripts/backend/'

    require(`${scriptsPath}utils/log_setup`)

    done()
})
