define(['controllers/controller','lib/request','views/gameView','models/gameModel'], function(Controller,request,GameView,GameModel){

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

        makeMove(data, state){
            if( data.pass ){
                console.error('---- NOT IMPLEMENTED --- Passing...')
                return;
            }
            //if (this.isValidMove(data,state)){
                state.board[data.x][data.y] = 1;
                this.view.drawBoard(state);
                tallyScores(state);
            //}
            
        }
        
        isValidMove(data, state){
            var tempBoard = state

            /*var postData = {
                "size": size,
                "board": board,
                "last": lastMove
            }
            
            var options = {
                url: 'http://roberts.seng.uvic.ca:3000//util/findArmies',
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


            })*/

        }
        
        tallyScores(state){
            
        }
        

        replayPrevMove(){
            console.error(`---- NOT IMPLEMENTED --- replaying previous move...`)
        }

        replayNextMove(){
            console.error(`---- NOT IMPLEMENTED --- replaying next move...`)

        }

    }

    // this is how the circular dependency between controllers and views are dealt with
    // the view does not know it's controller context on instantiation
    // http://requirejs.org/docs/api.html#circular
    // http://www.bitnative.com/2015/02/03/circular-dependencies-in-requirejs/
    var gameController = new GameController(GameView,GameModel)
    gameController.view.setControl(gameController)
    
    return gameController
})

