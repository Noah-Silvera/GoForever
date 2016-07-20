define(['controllers/controller','views/gameView','models/gameModel','requestHandler'], function(Controller,GameView,GameModel, requestHandler){
    
    var tempData;
    var tempArmy;
    

    class GameController extends Controller{
        
        
        setHandicapsAndScores(handicap, whiteScore, board, moveLog){
            if( moveLog.length === 0){

                switch (board.size){
                    case 9:
                        switch(handicap){
                            case "4 pieces":
                                board[7][7] = 1
                                whiteScore += .5
                            case "3 pieces":
                                board[7][1] = 1
                                whiteScore += .5
                            case "2 pieces":
                                board[1][1] = 1
                                board[1][7] = 1
                                whiteScore += 1
                                break;
                            case "black has first move":
                                whiteScore += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    case 13:
                        switch(handicap){
                            case "5 pieces":
                                board[6][6] = 1
                                whiteScore += .5
                            case "4 pieces":
                                board[10][10] = 1
                                whiteScore += .5
                            case "3 pieces":
                                board[10][2] = 1
                                whiteScore += .5
                            case "2 pieces":
                                board[2][10] = 1
                                board[2][2] = 1
                                whiteScore += 1
                                break;
                            case "black has first move":
                                whiteScore += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    case 19:
                        switch(handicap){
                            case "9 pieces":
                                board[9][9] = 1
                                whiteScore += .5
                            case "8 pieces":
                                board[16][9] = 1
                                whiteScore += .5
                            case "7 pieces":
                                board[9][16] = 1
                                whiteScore += .5
                            case "6 pieces":
                                board[2][9] = 1
                                whiteScore += .5
                            case "5 pieces":
                                board[9][2] = 1
                                whiteScore += .5
                            case "4 pieces":
                                board[16][16] = 1
                                whiteScore += .5
                            case "3 pieces":
                                board[16][2] = 1
                                whiteScore += .5
                            case "2 pieces":
                                board[2][16] = 1
                                board[2][2] = 1
                                whiteScore += 1
                                break;
                            case "black has first move":
                                whiteScore += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    default:
                        throw "invalid board size"
                }

                return Promise.all([
                        this.model.setProp('whiteScore', whiteScore),
                        this.model.setProp('board',board)
                    ])  
            } else {
                return this.model.getData()
            }
        }
        /**
         * Creates a board and then returns the new data
         * @param  {9, 13, or 19} boardSize
         */
        createBoard(boardSize){
            switch(boardSize){
                case 9:
                    return this.model.setProp( 'board', {"size":9,"board":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]}
                    )
                    break;
                case 13:
                    return this.model.setProp( 'board', {"size":13,"board":[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]]}
                    )
                    break;
                case 19:
                    return this.model.setProp( 'board', {"size":19,"board":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
                    )
                    break;
                default:
                    throw ("default size not implemented")
            }
        }
        
        
        getRandomMove(postData){
            
            return this.model.getData().then(function(data){
                var state = {
                    size : data.board.size,
                    board : data.board.board,
                    last: data.moveLog.slice(-1).pop()
                }

                return requestHandler.getRandomMove(state)

            })
            

        }

        makeMove(data){
            if( data.pass ){
                console.error('---- NOT IMPLEMENTED --- Passing...')
                return;
            }
            tempData = data
            
            
           //special case suicide with no army
           var suicide = true;
            if (data.last.x !== 0){
                if (data.board[data.last.x - 1][data.last.y] == 0 || data.board[data.last.x - 1][data.last.y] == data.last.c){
                     suicide = false
                }
            }
            if (data.last.x !== data.size - 1){
                if (data.board[data.last.x + 1][data.last.y] == 0 || data.board[data.last.x + 1][data.last.y] == data.last.c){
                     suicide = false
                }
            }
            if (data.last.y !== data.size - 1){
                if(data.board[data.last.x][data.last.y + 1] == 0 || data.board[data.last.x][data.last.y + 1] == data.last.c){ 
                    suicide = false
                }
            }
            if(data.last.y !== 0){ 
                if(data.board[data.last.x][data.last.y - 1] == 0 || data.board[data.last.x][data.last.y - 1] == data.last.c){
                    suicide = false
                }
            }
            if (suicide){
                alert("no suicide")
                return;
            }
            
            if (typeof tempArmy !== 'undefined') {
    
                for(var army = 0; army < tempArmy.armies.length; army++){
                    //check if placement is invalid larger suicide
                    if(tempArmy.armies[army].liberties.length == 1 &&
                        tempData.last.c == tempArmy.armies[army].colour &&
                        tempArmy.armies[army].liberties[0][0] == tempData.last.x &&
                        tempData.last.y == tempArmy.armies[army].liberties[0][1]){
                            
                        var suicide = true
                        if (data.last.x !== 0){
                            if (data.board[data.last.x - 1][data.last.y] == 0){ suicide = false }
                        }
                        if (data.last.x !== data.size - 1){
                            if (data.board[data.last.x + 1][data.last.y] == 0){ suicide = false }
                        }
                        if (data.last.y !== data.size - 1){
                            if(data.board[data.last.x][data.last.y + 1] == 0){ suicide = false }
                        }
                        if(data.last.y !== 0){ 
                            if( data.board[data.last.x][data.last.y - 1] == 0){ suicide = false }
                        }
                        if (suicide){
                            alert("no suicide")
                            return;
                        }
                    }
                    
                    //check if opposing piece surrounded your army
                    if(tempArmy.armies[army].liberties.length == 1 &&
                        tempData.last.c !== tempArmy.armies[army].colour &&
                        tempData.last.x == tempArmy.armies[army].liberties[0][0] &&
                        tempData.last.y == tempArmy.armies[army].liberties[0][1]){
                            
                        tempArmy.armies[army].tokens.forEach(function(element) {
                            tempData.board[element.position[0]][element.position[1]] = 0
                        }, this);
                    }
                }
            }
    
            this.updateArmy(data)
            
            
        }
        
        updateArmy(state, cb){
            var tempBoard = tempData.board;
            tempBoard[state.last.x][state.last.y] = state.last.c;
            
            var postData = {
                "size" : tempData.size,
                "board": tempBoard,
                "last": tempData.last  }
                
                var callback = function(data, controller){
                    tempArmy = data;
                    
                    var colour;
                    if(state.last.c = 1){ 
                        colour = 2 
                    }
                    else{ 
                        colour = 1 
                    }
                        
                    controller.tallyScores(data, tempBoard);
                    
                    state.board = tempBoard
                    controller.view.drawBoard(state, colour);
                    
                    
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
        
        tallyScores(data, board){
            data.armies.forEach(function(element) {
                
            }, this);
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

