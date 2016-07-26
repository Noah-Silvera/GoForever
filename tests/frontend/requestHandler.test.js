describe('Test the clients ability to send server requests related to changing data',function(){


    
    //revert the HTTP request stubbing for subsequent tests
    afterEach(function(done){
        require(['request'],function(request){

            request.get.restore()
            done()

        })
    })

    it('should retrieve data with the correct url and handle a sucess response',function(done){
        require(['request'],function(request){

            //I know the requestHandlerModule uses request.get to make it's requests
            // I stub out this method to intercept those requests with appropiate results
           var getStub = sinon.stub(request,'get')
           // sucess case
            getStub.yields(null,null,{ args : getStub.args })
           

            RequestHandler.getData('user','0')
                //only care if the promise is fufilled
                .then(function(res){
                    should.exist(res)

                    //check that the request was called with the correct url
                    var url = res['args'][0][0]['url']
                    should.exist(url)
                    url.should.eql('roberts.seng.uvic.ca:30128/api/user?0')

                    done()
                })
                .catch(function(err){
                    // bomb the test
                    should.not.exist(err)
                    done()
                })
        })





    })

    it('should retrieve data with the correct url and handle an error response',function(done){
        require(['request'],function(request){
          //I know the requestHandlerModule uses request.get to make it's requests
            // I stub out this method to intercept those requests with appropiate results
           var getStub = sinon.stub(request,'get')
            getStub.yields({ args : getStub.args })
           


            RequestHandler.getData('user','1')
                .then(function(args){

                    // the promise shouldn't be fufilled
                    should.not.exist(args)
                    done()
                })
                // the promise should bomb because this is an invalid id
                .catch(function(res){
                    should.exist(res)

                    //check that the request was called with the correct url
                    var url = res['args'][0][0]['url']
                    should.exist(url)
                    url.should.eql('roberts.seng.uvic.ca:30128/api/user?1')

                    done()

                })
        })
    })

})