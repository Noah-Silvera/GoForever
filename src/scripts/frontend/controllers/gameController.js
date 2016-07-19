define(['controllers/controller','views/gameView','models/gameModel'], function(Controller,GameView,GameModel){
    
    var tempData;
    

    class GameController extends Controller{
        
        
        setHandicapsAndScores(board, handicap){
            var scores = {"white": 0, "black": 0, "whiteOffset": 0}
            switch (board.size){
                case 9:
                    switch(handicap){
                        case "4 pieces":
                            board.board[7][7] = 1
                            scores.whiteOffset += .5
                        case "3 pieces":
                            board.board[7][1] = 1
                            scores.whiteOffset += .5
                        case "2 pieces":
                            board.board[1][1] = 1
                            board.board[1][7] = 1
                            scores.whiteOffset += 1
                            break;
                        case "black has first move":
                            scores.whiteOffset += .5
                            break;
                        default:
                            throw "invalid handicap"
                    }
                    break;
                case 13:
                    switch(handicap){
                        case "5 pieces":
                            board.board[6][6] = 1
                            scores.whiteOffset += .5
                        case "4 pieces":
                            board.board[10][10] = 1
                            scores.whiteOffset += .5
                        case "3 pieces":
                            board.board[10][2] = 1
                            scores.whiteOffset += .5
                        case "2 pieces":
                            board.board[2][10] = 1
                            board.board[2][2] = 1
                            scores.whiteOffset += 1
                            break;
                        case "black has first move":
                            scores.whiteOffset += .5
                            break;
                        default:
                            throw "invalid handicap"
                    }
                    break;
                case 19:
                    switch(handicap){
                        case "9 pieces":
                            board.board[9][9] = 1
                            scores.whiteOffset += .5
                        case "8 pieces":
                            board.board[16][9] = 1
                            scores.whiteOffset += .5
                        case "7 pieces":
                            board.board[9][16] = 1
                            scores.whiteOffset += .5
                        case "6 pieces":
                            board.board[2][9] = 1
                            scores.whiteOffset += .5
                        case "5 pieces":
                            board.board[9][2] = 1
                            scores.whiteOffset += .5
                        case "4 pieces":
                            board.board[16][16] = 1
                            scores.whiteOffset += .5
                        case "3 pieces":
                            board.board[16][2] = 1
                            scores.whiteOffset += .5
                        case "2 pieces":
                            board.board[2][16] = 1
                            board.board[2][2] = 1
                            scores.whiteOffset += 1
                            break;
                        case "black has first move":
                            scores.whiteOffset += .5
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
        
        
        getRandomMove(postData){
            
            $.ajax({
                type: 'POST',
                url : '/move',
                dataType: "json",
                data : JSON.stringify(postData), 
                contentType : "application/json",
                success : makeMove(data)
            });

        }

        makeMove(data){
            if( data.pass ){
                console.error('---- NOT IMPLEMENTED --- Passing...')
                return;
            }
            tempData = data
            
            
            this.isValidMove(data)
            
            
        }
        
        isValidMove(state, cb){
            var tempBoard = tempData.board;
            tempBoard[state.last.x][state.last.y] = state.last.c;
            
            var postData = {
                "size" : tempData.size,
                "board": tempBoard,
                "last": tempData.last  }
                
                var callback = function(data, controller){
                //state.board[data.x][data.y] = colour;
                //this.view.drawBoard(state);
                controller.tallyScores(state);
                }
                
                $.ajax({
                type: 'POST',
                url : '/getArmies',
                dataType: "json",
                data : JSON.stringify(postData), 
                contentType : "application/json",
                success : function(data){
                    callback(data, this)
                }.bind(this),
                error: function(xhr, status, error) {
                    // check status && error
                }
            });
            

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

