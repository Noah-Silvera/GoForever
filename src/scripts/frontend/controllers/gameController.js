define(['controllers/controller','request'], function(Controller,request){

    console.log()
    class GameController extends Controller{
        
        
        getRandomMove(){

            var size = 5
            var board = 6
            var lastMove = "asjhda"

            var postData = {
                "size": size,
                "board": board,
                "last": lastMove
            }
            
            var options = {
                url: 'http://roberts.seng.uvic.ca:3000/ai/random',
                port: '30000',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Length': Buffer.byteLength(JSON.stringify(postData))
                    'Access-Control-Allow-Origin': 'http://roberts.seng.uvic.ca:3000'
                } 
            };
            
            return new Promise(function(resolve,reject){
                request.post(options,function(err,res,body){
                    console.debug(res)

                    if(err) reject(err)

                    resolve(body)
                })


            })

        }
    }
    var gameController = new GameController()
    
    return gameController
})

