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
                return Promise.all([this.model.getData()])
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

        makeMove(boardState){
            return new Promise((function(resolve,reject){
                if( boardState.pass ){
                    console.error('---- NOT IMPLEMENTED --- Passing...')
                    return;
                }
                tempData = boardState
                    
                    
                //special case suicide with no army
                var suicide = true;
                if (boardState.last.x !== 0){
                    if (boardState.board[boardState.last.x - 1][boardState.last.y] == 0 || boardState.board[boardState.last.x - 1][boardState.last.y] == boardState.last.c){
                        suicide = false
                    }
                }
                if (boardState.last.x !== boardState.size - 1){
                    if (boardState.board[boardState.last.x + 1][boardState.last.y] == 0 || boardState.board[boardState.last.x + 1][boardState.last.y] == boardState.last.c){
                        suicide = false
                    }
                }
                if (boardState.last.y !== boardState.size - 1){
                    if(boardState.board[boardState.last.x][boardState.last.y + 1] == 0 || boardState.board[boardState.last.x][boardState.last.y + 1] == boardState.last.c){ 
                        suicide = false
                    }
                }
                if(boardState.last.y !== 0){ 
                    if(boardState.board[boardState.last.x][boardState.last.y - 1] == 0 || boardState.board[boardState.last.x][boardState.last.y - 1] == boardState.last.c){
                        suicide = false
                    }
                }
                if (suicide){
                    reject("suicide")
                }
                
                if (typeof tempArmy !== 'undefined') {
        
                    for(var army = 0; army < tempArmy.armies.length; army++){
                        //check if placement is invalid larger suicide
                        if(tempArmy.armies[army].liberties.length == 1 &&
                            tempData.last.c == tempArmy.armies[army].colour &&
                            tempArmy.armies[army].liberties[0][0] == tempData.last.x &&
                            tempData.last.y == tempArmy.armies[army].liberties[0][1]){
                                
                            var suicide = true
                            if (boardState.last.x !== 0){
                                if (boardState.board[boardState.last.x - 1][boardState.last.y] == 0){ suicide = false }
                            }
                            if (boardState.last.x !== boardState.size - 1){
                                if (boardState.board[boardState.last.x + 1][boardState.last.y] == 0){ suicide = false }
                            }
                            if (boardState.last.y !== boardState.size - 1){
                                if(boardState.board[boardState.last.x][boardState.last.y + 1] == 0){ suicide = false }
                            }
                            if(boardState.last.y !== 0){ 
                                if( boardState.board[boardState.last.x][boardState.last.y - 1] == 0){ suicide = false }
                            }
                            if (suicide){
                                reject("suicide")
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
                


                // update the data since the move was valid and successful
                this.model.getData().then((function(data){
                    // push the valid move onto the list of moves
                    console.info('move is valid, updating data...')
                    data.moveLog.push(boardState.last)
                    // update the board with this new move
                    data.board.board[boardState.last.x][boardState.last.y] = boardState.last.c

                    // update the model with these changes
                    return Promise.all([
                            this.model.setProp('moveLog',data.moveLog),
                            this.model.setProp('board', data.board)
                        ])

                }).bind(this)).then((function(){
                    

                    console.info('updating armies...')
                    return this.updateArmy(boardState)

                }).bind(this)).then((function(data){

                    console.info('tallying scores and updating data')
                    return this.tallyScores(data.armies, data.board)

                }).bind(this)).then((function(data){
                    // resolve with a successful data callback
                    console.info('re-rendering view')
                    this.selectViewState('gameActive')
                    resolve(data)
                }).bind(this)).catch(function(err){
                    reject(err)
                })

            }).bind(this))
            
            
            
        }
        
        updateArmy(state){
            return new Promise((function(resolve,reject){

                console.error('----- TEMPORARY ---- resolving while armies is broken')
                resolve(state)

                var tempBoard = tempData.board;
                tempBoard[state.last.x][state.last.y] = state.last.c;
                
                var postData = {
                    "size" : tempData.size,
                    "board": tempBoard,
                    "last": tempData.last  }
                    
                    
                    $.ajax({
                    type: 'POST',
                    url : '/getArmies',
                    dataType: "json",
                    data : JSON.stringify(postData), 
                    contentType : "application/json",
                    success : function(data){
                        resolve(data)
                    }.bind(this),
                    error: function(xhr, status, error) {
                        // check status && error
                        reject(error)
                    }
                });

            }).bind(this))
            

        }
        
        tallyScores(armies, board){
            // data.armies.forEach(function(element) {
                
            // }, this);

            // should update the model at the end

            // should return a promise that sets the data to the appropiate score
            return this.model.getData()
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

