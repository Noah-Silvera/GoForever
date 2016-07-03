describe('Test the clients ability to send server requests related to changing data',function(){

    // successful response from a request to api/user
    var userRes = {"user":"value"}
    // successful response from a request to api/match
    var matchRes = {"match":"value"}
    // successful response from a request to api/session
    var sessionRes = {"session":"value"}

    var idErrMes = "invalid id"

    // stub out the HTTP requests so test is not reliant on server
    before(function(done){

        require(['request'],function(request){

            //I know the requestHandlerModule uses request.get to make it's requests
            // I stub out this method to intercept those requests with appropiate results
            sinon
                .stub(request,'get')
                // .throws()
                // a valid user id
                // .withArgs('localhost:3000/api/user?0')
                .yields(null, null, userRes)
            
            done()

        })
    })

    
    //revert the HTTP request stubbing for subsequent tests
    after(function(done){
        require(['request'],function(request){

            request.get.restore()
            done()

        })
    })

    it('should handle a user data request with a valid id',function(done){


        //list of promise requests to perform
        var reqs = []
            
        reqs.push( 
            RequestHandler.getData('user','0')
                //only care if the promise is fufilled
                .then(function(body){

                    //ensure we actually got a response
                    should.exist(body)
                    //ensure it's the correct response 
                    // ( using the mocked expected response)
                    body.should.eql(userRes)
                    done()
                })
        )

        return Promise.all(reqs)
            //bail if ANY promise is rejected
            .should.not.be.rejected



    })

    it('should handle the invalid id error case',function(done){
        'test'.should.equal('implemented')
    })

    it('should handle all other error cases',function(done){
        'test'.should.equal('implemented')
    })
    
    



})