define(['controllers/controller','views/gameView','models/gameModel','requestHandler'], function(Controller,GameView,GameModel, requestHandler){
    
    

    class GameController extends Controller{
        
        
        setHandicapsAndScores(board, handicap, moveLog){
            if( moveLog.length === 0){
                var whiteOffset =  0
                switch (board.size){
                    case 9:
                        switch(handicap){
                            case "4 pieces":
                                board.board[7][7] = 1
                                whiteOffset += .5
                            case "3 pieces":
                                board.board[7][1] = 1
                                whiteOffset += .5
                            case "2 pieces":
                                board.board[1][1] = 1
                                board.board[1][7] = 1
                                whiteOffset += 1
                                break;
                            case "black has first move":
                                whiteOffset += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    case 13:
                        switch(handicap){
                            case "5 pieces":
                                board.board[6][6] = 1
                                whiteOffset += .5
                            case "4 pieces":
                                board.board[10][10] = 1
                                whiteOffset += .5
                            case "3 pieces":
                                board.board[10][2] = 1
                                whiteOffset += .5
                            case "2 pieces":
                                board.board[2][10] = 1
                                board.board[2][2] = 1
                                whiteOffset += 1
                                break;
                            case "black has first move":
                                whiteOffset += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    case 19:
                        switch(handicap){
                            case "9 pieces":
                                board.board[9][9] = 1
                                whiteOffset += .5
                            case "8 pieces":
                                board.board[16][9] = 1
                                whiteOffset += .5
                            case "7 pieces":
                                board.board[9][16] = 1
                                whiteOffset += .5
                            case "6 pieces":
                                board.board[2][9] = 1
                                whiteOffset += .5
                            case "5 pieces":
                                board.board[9][2] = 1
                                whiteOffset += .5
                            case "4 pieces":
                                board.board[16][16] = 1
                                whiteOffset += .5
                            case "3 pieces":
                                board.board[16][2] = 1
                                whiteOffset += .5
                            case "2 pieces":
                                board.board[2][16] = 1
                                board.board[2][2] = 1
                                whiteOffset += 1
                                break;
                            case "black has first move":
                                whiteOffset += .5
                                break;
                            default:
                                throw "invalid handicap"
                        }
                        break;
                    default:
                        throw "invalid board size"
                }
                return Promise.all([
                        this.model.setProp('whiteOffset', whiteOffset),
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
        
        
        
       getRandomMove(){
           return new Promise((function(resolve,reject){

                Promise.resolve().then((function(){
                    return this.model.getData()
                }).bind(this)).then(function(data){
                    var state = {
                        size : data.board.size,
                        board : data.board.board,
                        last: data.moveLog.slice(-1).pop()
                    }

                    return requestHandler.getRandomMove(state)

                }).then(function(move){
                   resolve(move)
                }).catch((err) => {
                    console.error('error caught in get random Move')
                    reject(err)
                })

           }).bind(this))

        }

        makeMove(boardState,aiMove){
            if( this.view.viewState === 'replay' ){
                return Promise.reject(new Error('replay-error') )
            }

            if( boardState.pass ){


                return new Promise( (resolve,reject) => {

                    this.model.getData().then((data) => {

                        // fake the opponents pass if AI
                        // add a real pass if human
                        data.moveLog.push( { pass: true } )
                        return this.model.setProp('moveLog', data.moveLog)

                    }).then( (data) => {

                        // game is ended, 2 passes have happened
                        if(  data.moveLog.slice(-1)[0] !== undefined && 
                            data.moveLog.slice(-2)[0].pass === true  &&
                            data.moveLog.slice(-1)[0].pass === true  ){
                            // set the initial move counter to 0
                            this.model.setProp('curMoveNum',0).then( (data) => {
                                // reset the board
                                return this.createBoard(data.board.size)

                            }).then( (data) => {

                                this.selectViewState('replay')
                                resolve('game ended')
                            })
                        } else {
                            // continue without ending the game
                            resolve()
                        }

                    }).then( (data) => {
                        resolve(data)
                    })
                })

            } else {

                return new Promise((function(resolve,reject){


                    Promise.resolve().then((function(){
                        return this.model.getData()
                    }).bind(this)).then((function(data){
                        return Promise.resolve(data)
                        // return this.checkCaptureSpecialCase(boardState,data.tempArmy)

                    }).bind(this)).then((function(data){
                    // check if the move is valid and not a suicide
                        return this.checkSuicide(boardState,data.tempArmy)

                    }).bind(this)).then((function(data){
                        // check the moveLog to see if the move has previously been played
                        return this.checkKo(data.moveLog, boardState)
                    

                    // update the data since the move was valid and successful
                    }).bind(this)).then((function(data){
                        console.info(data)
                        // check if this move captured a piece...
                        return this.checkCaptured(data.tempArmy, data.board, data.moveLog.slice(-1)[0] )

                    

                    }).bind(this)).then((function(data){
                    /////////////////////////////////////
                    /////////  MOVE IS VALID  ///////////
                    /////////////////////////////////////


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
                        return this.updateArmy(boardState) // ensure latest board state

                    }).bind(this)).then((function(data){

                        console.info('tallying scores and updating data')
                        // return Promise.all([this.model.getData()])
                        return this.tallyScores(data.tempArmy, data.board)

                    }).bind(this)).then((function(dataArr){
                        // resolve with a successful data callback
                        var data = dataArr[0]


                        console.info('re-rendering view')
                        this.view.notify()

                        resolve(data)
                        


                    }).bind(this)).catch((err) => {
                        console.error('error caught in making a move')
                        reject(err)
                    })

            
                }).bind(this))

                    
                    
            }
        }

        makeAIMove(){
            return new Promise((function(resolve,reject){
                console.info('making ai move...')
                Promise.resolve().then((function(){
                        return this.getRandomMove()
                }).bind(this)).then((function(move){
                    // mark down the move the ai just made
                    var lastMove = move
                    
                    // create the new move request from the most recent data
                    var boardState = {
                        "last": lastMove
                    }

                    this.boardState = boardState

                    return (this.model.getData())

                }).bind(this)).then((function(data){
                    
                    this.boardState["size"] = data.board.size
                    this.boardState["board"] = data.board.board

                    var boardState = this.boardState

                    // make the move
                    return this.makeMove(boardState,true)

                }).bind(this)).then((function(data){
                    console.info('ai move made')
                    console.debug('resulting data:')
                    console.debug(data)

                    // notify the view changes have been made
                    this.view.notify()

                    // return success response to client
                    resolve(data)

                }).bind(this)).catch(function(err){
                        console.error('error in making ai move')
                        reject(err)
                })

            }).bind(this))

        }

        checkIfAi(){
            return new Promise((function(resolve,reject){
                Promise.resolve().then((function(){
                        return this.model.getData()
                }).bind(this)).then((function(data){
                    if( data.opponent === 'ai'){
                        resolve(this.makeAIMove())
                    } else {
                        resolve()
                    }
                }).bind(this)).catch( (err) => {
                    console.info('error caught in checking if ai should make a move')
                    reject(err)
                })
            }).bind(this))
        }

        checkCaptured(armies,board, lastMove){

                // at least one army exists
                if( armies != undefined){

                    for(var army = 0; army < armies.length; army++){
            
                        //check if opposing piece surrounded your army
                        if(armies[army].liberties.length == 1 &&
                            lastMove.c !== armies[army].colour &&
                            lastMove.x == armies[army].liberties[0][0] &&
                            lastMove.y == armies[army].liberties[0][1]){
                                
                            armies[army].tokens.forEach(function(element) {
                                board.board[element.position[0]][element.position[1]] = 0
                            }, this);
                        }

                    }

                    return this.model.setProp('board',board)
                
                } else {

                    return this.model.getData()
                }

        }

        
        checkCaptureSpecialCase(boardState, armies){
            // not suicide special case no army surrounded by enemy but also capturing enemy
            if (typeof armies !== 'undefined') {
                for(var army = 0; army < armies.length; army++){
                    for(var token = 0; token < armies[army].tokens.length; token++){
                        var tempT = armies[army].tokens[token]
                        if(tempT.position[0] > 0){
                            if(tempT.position[0] - 1 == boardState.last.x + 1 &&
                                tempT.position[1] == boardState.last.y){
                                    
                                    var notLib = true
                                    
                                    
                                    for(var lib = 0; lib < tempT.liberties.length; lib++){
                                        
                                        if (tempT.liberties[lib].position[0] == tempT.position[0] - 1 &&
                                            tempT.liberties[lib].position[1] == tempT.position[1]){
                                                
                                                notLib = false
                                        } 
                                    }
                                    
                                    if(notLib){
                                        boardState.board[tempT.position[0] - 1][tempT.position[1]] = 0
                                    }
                            }
                        }
                        
                        if(tempT.position[1] > 0){
                            if(tempT.position[1] - 1 == boardState.last.y + 1 && 
                                tempT.position[0] == boardState.last.x){
                                    
                                    var notLib = true
                                    
                                    for(var lib = 0; lib < tempT.liberties.length; lib++){
                                        
                                        if (tempT.liberties[lib].position[1] == tempT.position[1] - 1 &&
                                            tempT.liberties[lib].position[0] == tempT.position[0]){
                                                
                                                notLib = false
                                        } 
                                    }
                                    
                                    if(notLib){
                                        boardState.board[tempT.position[0]][tempT.position[1] - 1] = 0
                                    }
                            }
                        }
                        
                        if(tempT.position[0] < boardState.board.length - 1){
                            if(tempT.position[0] + 1 == boardState.last.x - 1 &&
                                tempT.position[1] == boardState.last.y){
                                    
                                var notLib = true
                                
                                for(var lib = 0; lib < tempT.liberties.length; lib++){
                                        
                                        if (tempT.liberties[lib].position[0] == tempT.position[0] + 1 &&
                                            tempT.liberties[lib].position[1] == tempT.position[1]){
                                                
                                                notLib = false
                                        } 
                                    }
                                    
                                    if(notLib){
                                        boardState.board[tempT.position[0] + 1][tempT.position[1]] = 0
                                    }
                            }
                        }
                        
                        if(tempT.position[1] < boardState.board.length - 1){
                            if(tempT.position[1] + 1 == boardState.last.y - 1 && 
                                tempT.position[0] == boardState.last.x){
                                    
                                var notLib = true
                                
                                for(var lib = 0; lib < tempT.liberties.length; lib++){
                                        
                                        if (tempT.liberties[lib].position[0] == tempT.position[0] &&
                                            tempT.liberties[lib].position[1] == tempT.position[1] + 1){
                                                
                                                notLib = false
                                        } 
                                    }
                                    
                                    if(notLib){
                                        boardState.board[tempT.position[0]][tempT.position[1] + 1] = 0
                                    }
                            }
                        }
                    }
                }

                return this.model.setProp('board',boardState)
            
            } else {

                return this.model.getData()
            }
        }

        checkSuicide(boardState,armies){
            return new Promise((function(resolve,reject){

                var err = new Error("suicide")
                err.moveLoc = `x: ${boardState.last.x}, y: ${boardState.last.y}`
                err.board = boardState.board
                

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

                    reject(err)
                }
                
                // some armies previously exist
                if (typeof armies !== 'undefined') {
        
                    for(var army = 0; army < armies.length; army++){
                        //check if placement is invalid larger suicide
                        if(armies[army].liberties.length == 1 &&
                            boardState.last.c == armies[army].colour &&
                            armies[army].liberties[0][0] == boardState.last.x &&
                            boardState.last.y == armies[army].liberties[0][1]){
                                
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
                                reject(err)
                            }
                        }
                    

                    }
                }

                this.model.getData().then(function(data){
                    resolve(data)
                })

            }).bind(this))
        }

        checkKo(moveLog,boardState){
            
            for(var i = 0; i < moveLog; i++){
                if(moveLog[i] === boardState.last){
                    var err = new Error("ko")
                    err.moveLoc = `x: ${boardState.last.x}, y: ${boardState.last.y}`
                    err.board = boardState.board
                }
            }
            return this.model.getData()
        }
        
        updateArmy(state){

            return new Promise((function(resolve,reject){
                //console.error('----- TEMPORARY ---- resolving while armies is broken')
                //resolve(state)
                
                /*var postData = {
                    "size" : tempData.size,
                    "board": tempBoard,
                    "last": tempData.last  }*/
                

                    
                    $.ajax({
                    type: 'POST',
                    url : '/getArmies',
                    dataType: "json",
                    data : JSON.stringify(state), 
                    contentType : "application/json",
                    success : (function(army){
                        army = army.armies

                       this.model.setProp('tempArmy', army).then(function(data){
                           resolve(data)
                       })
                    }).bind(this),
                    error: function(xhr, status, error) {
                        // check status && error
                        reject(error)
                    }
                });

            }).bind(this))


            
            

        }
        
        tallyScores(armies, board){
            var whiteScore =0;
            var blackScore =0;

            var arr = [];
            var zeroes = [];
            var onlyArmy = true;
            for(var army = 0; army < armies.length; army++){
                var elem = armies[army]
                if (armies.length > 1 && army < armies.length - 1){
                    if(armies[army].colour !== armies[army + 1].colour){
                        onlyArmy = false;
                    }
                }
                for(var token = 0; token < elem.tokens.length; token ++) {
                    arr.push(token.position)
                }
                for(var liberty = 0; liberty < elem.liberties.length; liberty++){
                    var lib = elem.liberties[liberty]
                    if($.inArray(lib ,zeroes) == -1){
                        zeroes.push({ "pos" : lib, "c": elem.colour} )
                    }
                }
                
            }
            if(armies.length !== 1 && !onlyArmy){
                for(var pos = 0; pos < zeroes.length; pos++){
                    var freeZeroes = []
                    var groupZeroes = []
                    this.recursiveTerritoryCheck(board.board, zeroes[pos], freeZeroes, groupZeroes)
                    
            
                }
            }
            else if(armies.length == 1){
                
                if(armies[0].colour == 1){blackScore = armies[0].tokens.length}
                
                if(armies[0].colour == 2){whiteScore = armies[0].tokens.length}
                 
            }
            else{
                for(var army = 0; army < armies.length; army++){
                    
                    // not considering hole in army at the moment
                    var freeZeroes = []
                    var groupZeroes = []
                    this.recursiveTerritoryCheck(board.board, zeroes[pos], freeZeroes, groupZeroes)
                    if(armies[0].colour == 1){blackScore += armies[0].tokens.length}
                    if(armies[0].colour == 2){whiteScore += armies[0].tokens.length}
                }
            }
            
            return Promise.all([this.model.setProp('whiteScore', whiteScore), this.model.setProp('blackScore', blackScore)])
        }
        
        recursiveTerritoryCheck(board, zero, freeZeroes, groupZeroes){
            //if(freeZeroes.length > 0){return}
            groupZeroes.push(zero)
            if(zero.pos[1] > 0){
                if (board[zero.pos[0]][(zero.pos[1] - 1)] !== zero.c &&
                    board[zero.pos[0]][(zero.pos[1] - 1)] !== 0){
                        
                        freeZeroes.push(zero)
                }
            }
            if(zero.pos[0] > 0){
                if(board[(zero.pos[0] - 1)][(zero.pos[1])] !== zero.c &&
                    board[(zero.pos[0] - 1)][(zero.pos[1])] !== 0){
                        
                        freeZeroes.push(zero)
                }
            }
            
            if(zero.pos[1] < board.length - 1){
                if(board[(zero.pos[0])][(zero.pos[1] + 1)] !== zero.c &&
                    board[(zero.pos[0])][(zero.pos[1] + 1)] !== 0){
                        
                        freeZeroes.push(zero)
                }
            }
            if(zero.pos[0] < board.length - 1){
                if(board[(zero.pos[0] + 1)][(zero.pos[1])] !== zero.c &&
                    board[(zero.pos[0] + 1)][(zero.pos[1])] !== 0){
                    
                        freeZeroes.push(zero)
                }
            }
            
            //infinite loop problem with $.inArray find another solution
            if(zero.pos[1] > 0){
                if(board[zero.pos[0]][(zero.pos[1] - 1)] == 0){
                    var arr = [zero.pos[0], zero.pos[1] - 1]
                    var downZero = {"pos": arr, "c": zero.c}
                    var inGroup = false
                    for(var i = 0; i < groupZeroes.length; i++){
                        if (groupZeroes[i].pos[0] === zero.pos[0] && groupZeroes[i].pos[1] === zero.pos[1] - 1){
                            inGroup = true
                        }
                    }
                    if(!inGroup){
                        this.recursiveTerritoryCheck(board, downZero, freeZeroes, groupZeroes)
                    }
                }
            }
            
            if(zero.pos[0] > 0){
                if (board[(zero.pos[0] - 1)][(zero.pos[1])] == 0){
                    var arr = [zero.pos[0] - 1, zero.pos[1]]
                    var upZero = {"pos": arr, "c": zero.c}
                    var inGroup = false
                    for(var i = 0; i < groupZeroes.length; i++){
                        if (groupZeroes[i].pos[0] === zero.pos[0] - 1 && groupZeroes[i].pos[1] === zero.pos[1]){
                            inGroup = true
                        }
                    }
                    if(!inGroup){
                        this.recursiveTerritoryCheck(board, upZero, freeZeroes, groupZeroes)
                        
                    }
                }
            }
            
            if(zero.pos[1] < board.length - 1){
                if(board[(zero.pos[0])][(zero.pos[1] + 1)] == 0){
                    var arr = [zero.pos[0], zero.pos[1] + 1]
                    var rightZero = {"pos": arr, "c": zero.c}
                    var inGroup = false
                    for(var i = 0; i < groupZeroes.length; i++){
                        if (groupZeroes[i].pos[0] === zero.pos[0] && groupZeroes[i].pos[1] === zero.pos[1] + 1){
                            inGroup = true
                        }
                    }
                    if(!inGroup){
                        this.recursiveTerritoryCheck(board, rightZero, freeZeroes, groupZeroes)
                    }
                }
            }
            if(zero.pos[0] < board.length - 1){
                if(board[(zero.pos[0] + 1)][(zero.pos[1])] == 0){
                    var arr = [zero.pos[0] + 1, zero.pos[1]]
                    var leftZero = {"pos": arr, "c": zero.c}
                    var inGroup = false
                    for(var i = 0; i < groupZeroes.length; i++){
                        if (groupZeroes[i].pos[0] === zero.pos[0] + 1 && groupZeroes[i].pos[1] === zero.pos[1]){
                            inGroup = true
                        }
                    }
                    if(!inGroup){
                        this.recursiveTerritoryCheck(board, leftZero, freeZeroes, groupZeroes)
                        
                    }
                }
            }
            
        }
        

        replayPrevMove(){
            console.info('navigating to previous move')
            return new Promise( (resolve,reject) => {
                this.model.getData().then( (data) => {
                    // at the first move
                    if( data.curMoveNum === 0 ){
                        reject(new Error('first-move'))
                    } else {
                        // retract the current move and subtract the number
                        var moveToPlay = data.moveLog[data.curMoveNum]

                        data.board.board[ moveToPlay.x ][ moveToPlay.y ] = 0

                        return Promise.all([
                            this.model.setProp('board',data.board),
                            this.model.setProp('curMoveNum',data.curMoveNum - 1 )
                        ])

                    }

                }).then( (dataArr) => {
                    var data = dataArr[0]

                    //re-render the view
                    this.view.notify()

                    resolve()

                })
            })
        }

        replayNextMove(){
            // number of moves that are passes
            var passCount = 2

            console.info('navigating to next move')
            return new Promise( (resolve,reject) => {
                this.model.getData().then( (data) => {
                    if( data.curMoveNum === data.moveLog.length - passCount ){
                        reject(new Error('last-move'))
                    } else {
                        // retract the current move and subtract the number
                        var moveToPlay = data.moveLog[data.curMoveNum]

                        data.board.board[ moveToPlay.x ][ moveToPlay.y ] = moveToPlay.c

                        return Promise.all([
                            this.model.setProp('board',data.board),
                            this.model.setProp('curMoveNum',data.curMoveNum + 1 )
                        ])

                    }
                }).then( (dataArr) => {
                    var data = dataArr[0]

                    //re-render the view
                    this.view.notify()

                    resolve()

                })
            })

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

