define(['controllers/controller','views/gameView','models/gameModel'], function(Controller,GameView,GameModel){
    
    var tempData;
    var tempArmy;
    

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
                if(element.liberties == 0){
                    for(var i = 0; i < element.position.length; i++){
                        
                    }
                }
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

