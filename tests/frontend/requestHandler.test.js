describe('Test the clients ability to send server requests related to changing data',function(){

    var userRes = {"user":"value"}
    var matchRes = {"match":"value"}

    var idErrMes = "invalid id"

    before(function(done){

        require(['request'],function(request){

            sinon
                .stub(request,'get')
                // .throws()
                // a valid user id
                // .withArgs('localhost:3000/api/user?0')
                .yields(null, null, userRes)
            
            done()

        })
    })

    
    after(function(done){
        request.get.restore()
        done()
    })

    it('should handle a user data request with a valid id',function(done){



        var reqs = []
            
        reqs.push( 
            RequestHandler.getData('user','0')
                .then(function(body){

                    should.exist(body)
                    body.should.eql(userRes)
                    done()
                })
        )

        return Promise.all(reqs)
            .should.not.be.rejected



    })

    it('should handle the invalid id error case',function(done){
        'test'.should.equal('implemented')
    })

    it('should handle all other error cases',function(done){
        'test'.should.equal('implemented')
    })
    
    



})