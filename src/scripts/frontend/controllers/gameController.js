define(['controllers/controller','lib/request','views/gameView','models/gameModel'], function(Controller,request,GameView,GameModel){

    class GameController extends Controller{
        
        setHandicapsAndScores(board, handicap){
            var scores = {"white": 0, "black": 0}
            switch (board.size){
                case 9:
                    switch(handicap){
                        case "4 pieces":
                            board.board[7][7] = 1
                            scores.white += .5
                        case "3 pieces":
                            board.board[7][1] = 1
                            scores.white += .5
                        case "2 pieces":
                            board.board[1][1] = 1
                            board.board[1][7] = 1
                            scores.white += 1
                            break;
                        case "black has first move":
                            scores.white += .5
                            break;
                        default:
                            throw "invalid handicap"
                    }
                    break;
                case 13:
                    switch(handicap){
                        case "5 pieces":
                            board.board[6][6] = 1
                            scores.white += .5
                        case "4 pieces":
                            board.board[10][10] = 1
                            scores.white += .5
                        case "3 pieces":
                            board.board[10][2] = 1
                            scores.white += .5
                        case "2 pieces":
                            board.board[2][10] = 1
                            board.board[2][2] = 1
                            scores.white += 1
                            break;
                        case "black has first move":
                            scores.white += .5
                            break;
                        default:
                            throw "invalid handicap"
                    }
                    break;
                case 19:
                    switch(handicap){
                        case "9 pieces":
                            board.board[9][9] = 1
                            scores.white += .5
                        case "8 pieces":
                            board.board[16][9] = 1
                            scores.white += .5
                        case "7 pieces":
                            board.board[9][16] = 1
                            scores.white += .5
                        case "6 pieces":
                            board.board[2][9] = 1
                            scores.white += .5
                        case "5 pieces":
                            board.board[9][2] = 1
                            scores.white += .5
                        case "4 pieces":
                            board.board[16][16] = 1
                            scores.white += .5
                        case "3 pieces":
                            board.board[16][2] = 1
                            scores.white += .5
                        case "2 pieces":
                            board.board[2][16] = 1
                            board.board[2][2] = 1
                            scores.white += 1
                            break;
                        case "black has first move":
                            scores.white += .5
                            break;
                        default:
                            throw "invalid handicap"
                    }
                    break;
                default:
                    throw "invalid board size"
            }
            return scores;
        }
        
        
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
                url: 'http://roberts.seng.uvic.ca:30000/ai/random',
                port: '30000',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Length': Buffer.byteLength(JSON.stringify(postData))
                    'Access-Control-Allow-Origin': 'http://roberts.seng.uvic.ca:30000'
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

        makeMove(data, state, colour){
            if( data.pass ){
                console.error('---- NOT IMPLEMENTED --- Passing...')
                return;
            }
            if (this.isValidMove(data,state)){
                state.board[data.x][data.y] = colour;
                this.view.drawBoard(state);
                this.tallyScores(state);
            }
            
        }
        
        isValidMove(data, state){
            var tempBoard = state.board;
            tempBoard[data.x][data.y] = 1;
            var lastMove = {
                "x" : data.x,
                "y" : data.y,
                "c" : 1,
                "pass" : false
            }

            var postData = {
                "size": state.board.length,
                "board": tempBoard,
                "last": lastMove
            }
            
            var options = {
                url: 'http://roberts.seng.uvic.ca:30000/util/findArmies',
                port: '30000',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Length': Buffer.byteLength(JSON.stringify(postData))
                    'Access-Control-Allow-Origin': 'http://roberts.seng.uvic.ca:30000'
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

