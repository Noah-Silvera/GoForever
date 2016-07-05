describe('Retrieval interactions with the database',function(){


    it('should fail retrieval if the document is not found',function(done){
        'test'.should.equal('implemented')
    })
    
    it('should fail retrieval if multiple document are found',function(done){
        'test'.should.equal('implemented')
    })

    it('should return the appropiate document if it exists',function(done){
        'test'.should.equal('implemented')
    })
    
})

describe('Creation interactions with the the database',function(){
    
    
    it('should fail creation if the object type is invalid',function(done){
        'test'.should.equal('implemented')
    })

    it('should insert a document into the appropiate collection and return the _id of the document',function(done){
        'test'.should.equal('implemented')
    })


    
    // Schema test???
    
})

describe('Modification interactions with the database',function(){
    
    it('should fail modification if the object type is invalid',function(done){
        'test'.should.equal('implemented')
    })

    it('should successfully modify a document in the appropiate collection and return the modified document',function(done){
        'test'.should.equal('implemented')
    })
    
    
    //Schema test???
    
})

describe('General database interaction Failure cases',function(){

    it('should fail retrieval if the collection name is not valid',function(done){
        'test'.should.equal('implemented')
    })

    it('should fail upon any other errors from the database',function(done){
        'test'.should.equal('implemented')
    })

})
    
