
describe('Database Interactions',function(){

    var dbAdapter;
    var db;


    before(function(done){


        mongoose = require('mongoose');

        // used for finding which DB the adapter connects to
        var connectSpy = sinon.spy(mongoose,'connect')

        dbAdapter = require(`${global.scriptsPath}dbAdapter`)

        // wait to connect to the DB
        setTimeout(function(){
            db = connectSpy.returnValues[0]

            if( !db ){
                throw 'could not connect to the db. try waiting longer'
            } else {
                done()

            }
        },500)

    })

    beforeEach(function(done){
        // clear all documents from the test collections

        // colOne.drop()
        // colTwo.drop()

        // // re-insert the documents for testing

        // var colOne = db.collection('testCollectionOne')
        // var colTwo = db.collection('testCollectionTwo')


        // var inserts = Promise.all([ 
        //     colOne.insertMany(
        //         [
        //             {"_id":"0", "data":"value", "uniqueVal":00},
        //             {"_id":"1", "data":"value", "uniqueVal":11},
        //             {"_id":"2", "data":"value", "uniqueVal":22},
        //             {"_id":"3", "data":"value", "uniqueVal":33}
        //         ]
        //     ),
        //     colTwo.insertMany(
        //         [
        //             {"_id":"0", "data":"value", "uniqueVal":00},
        //             {"_id":"1", "data":"value", "uniqueVal":11},
        //             {"_id":"2", "data":"value", "uniqueVal":22},
        //             {"_id":"3", "data":"value", "uniqueVal":33}
        //         ]
        //     )

        // ])
        // .then(function(result){
        //     verbose(result)
        // })       
        // .catch(function(err){
        //     error('problem with creation of test collections')
        //     reject(err)
        // })

        
    })


    it('should fail retrieval if the document is not found',function(done){
        'test'.should.equal('implemented')

    })
    
    it('should return the appropiate document if it exists',function(done){
        'test'.should.equal('implemented')
    })
    

    
    it('should fail creation if the object type is invalid',function(done){
        'test'.should.equal('implemented')
    })

    it('should fail creation if the object doesn\'t match the schema',function(done){
        'test'.should.equal('implemented')

    })

    it('should insert a document into the appropiate collection and return the _id of the document',function(done){
        'test'.should.equal('implemented')
    })

    
    it('should fail modification if the object type is invalid',function(done){
        'test'.should.equal('implemented')
    })

    it('should successfully modify a document in the appropiate collection and return the modified document',function(done){
        'test'.should.equal('implemented')
    })
    
    
    it('should fail modification if the object attributes don\'t match the schema',function(done){
        'test'.should.equal('implemented')

    })
    

    it('should fail retrieval if the collection name is not valid',function(done){
        'test'.should.equal('implemented')
    })

    it('should fail upon any other errors from the database',function(done){
        'test'.should.equal('implemented')
    })

})
    
