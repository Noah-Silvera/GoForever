describe('Test the clients ability to send server requests related to changing data',function(){

    var userRes = {"user":"value"}
    var matchRes = {"match":"value"}

    before(function(done){
        sinon
            .stub(request,'get')
            .withArgs('api/user')
            .yields(null, null, JSON.stringify(userRes))
            .withArgs('api/match')
            .yields(null, null, JSON.stringify(matchRes))
        done()
    })

    afterEach(function(done){
        request.get.restore()
        done()
    })

    it('should handle a requests data by communicating the data back to the caller',function(done){
        
        // requestHandler.getData('game','123')

        var reqs = []

        reqs.push( 
            new Promise(function(resolve,reject){
                request.get('api/user',function(err,res,body){
                    should.not.exist(err)

                    should.exist(body)
                    body.should.eql(JSON.stringify(userRes))

                    resolve()

                })
            })
        )

        reqs.push(
            new Promise(function(resolve,reject){
                request.get('api/match',function(err,res,body){
                    should.not.exist(err)

                    should.exist(body)
                    body.should.eql(JSON.stringify(matchRes))

                    resolve()

                })
            })
        )

        Promise.all(reqs).then( () => { done() } )
    })

    it('should handle error cases for requests by communicating the error back to the caller',function(done){

    })



})