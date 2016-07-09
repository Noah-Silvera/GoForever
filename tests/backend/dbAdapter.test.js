
describe('Database Interactions',function(){

    var dbAdapter;
    var db;
    var TestModel;
    var mongoose


    before(function(done){


        mongoose = require('mongoose');
        Schema = mongoose.Schema
        // used for finding which DB the adapter connects to
        var connectSpy = sinon.spy(mongoose,'connect')
        

        dbAdapter = require(`${global.scriptsPath}dbAdapter`)


        function requireAllSchemaFields(schema) {
            for (var i in schema.paths) {
                var attribute = schema.paths[i]
                if (attribute.isRequired == undefined) {
                    attribute.required(true);
                }
            }
            return schema
        }


        testSchema = new Schema({
            'prop1': String,
            'prop2': Number
        })

        TestModel = mongoose.model('TestModel',testSchema)

        done()



    })


    it('should fail retrieval if the document is not found',function(done){
        dbAdapter.get('TestModel','ashgfjashdas') .should.be.rejected
        dbAdapter.get('NonExsistantModel','ashgfjashdas') .should.be.rejected
        done()

    })
    
    it('should return the appropiate document if it exists',function(done){
        var thing = new TestModel({'prop1':'some string', 'prop2':21})

        // save this test object to the db
        thing.save().then(function(result){
            
            return dbAdapter.get('TestModel', result._id)
        }).then(function(result){

            var orig = thing._doc

            // check that the correct object was returned
            for( prop in result){
                if( result.hasOwnProperty(prop) ){
                    if( prop != '_id' ){
                        // check if the prop is in the original object
                        should.exist(orig[prop])

                        // ensure that the correct object was inserted
                        result[prop].should.equal(orig[prop])
                    }
                }
            }   
            
            done()
        }).catch(function(err){
            should.not.exist(err)
            done()
        })


    })
    

    it('should fail creation if the object doesn\'t match the schema.',function(done){
        // property missing is the only case it will fail
        // extra properties aren't saved ( might want to display a warning message on this, up to you)
        // invalid type properties are cast ( this is crazy behaviour, but it's mongoose, can't do anything)


        'test'.should.equal('implemented')

    })

    it('should insert a document into the appropiate collection and return the _id of the document',function(done){
        'test'.should.equal('implemented')
    })

    it('should successfully modify a document in the appropiate collection and return the modified document',function(done){
        'test'.should.equal('implemented')
    })
    
    
    it('should fail modification if the object attributes don\'t match the schema',function(done){
        'test'.should.equal('implemented')

    })
    

    it('should fail retrieval if the collection name is not valid. This should happen for all DB functions',function(done){
        'test'.should.equal('implemented')
    })


})
    
