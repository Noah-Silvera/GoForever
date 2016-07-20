
//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','jquery','utils/svgFactory'],function(View,$,svgFactory){


    class GameView extends View{

        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view

            this.selectors = {
                // where all the action buttons go
                'bottomPanel': '#bottom-panel',
                'passButton': '#pass-button',
                'board':'#board',
                'playerIndicator':'#player-indicator'
            } 

        }
        
        render(){

            this.control.getData().then((function(data){
                
                // clear the bottom panel of all state specific buttons
                
                $("#board-wrapper").addClass(data.style)
                
                return this.control.createBoard(data.boardSize)

            }).bind(this)).catch(function(err){
                alert('could not retrieve data to render game')
                throw err
            }).then((function(data){

                switch(this.viewState){
                    case 'gameActive':

                        this.drawPlayerIndicator()
                        
                        
                        ;(function drawBottomPanel(){


                            // the action buttons for main gameplay
                            $(this.selectors.bottomPanel).append(
                                $('<div id="action-buttons" >').append(
                                    $('<button>')
                                        .addClass('btn btn-default')
                                        .attr('id','pass-button')
                                        .text('Pass')
                                        .on('click',(function makeMove(){
                                            this.control.makeMove({ 'pass':true })
                                        }).bind(this)),
                                    $('<button>')
                                        .text('Replay ( TEMPORARY )')
                                        .on('click',(function replay(){
                                            this.control.selectViewState('replay')
                                        }).bind(this))
                                    
                                )
                            )

                        }).bind(this)()

                        // it's the beginning of the game, so calculate and make the handicaps
                      this.control.setHandicapsAndScores(data.userHandicap, data.whiteScore, data.board, data.moveLog).then((function(dataArr){
                            // multiple copies of the data are returned, use the first copy
                            var data = dataArr[0]
                            // draw the board
                            $("#score-black").text(data.blackScore)
                            $("#score-white").text(data.whiteScore)
                            if(data.whiteScore == .5){
                            this.drawBoard(
                                data.board, 1
                                )
                            }else{
                                this.drawBoard(
                                data.board, 2
                                )
                            }
                            
                      }).bind(this), function(err){
                          console.error('could not set handicap scores')
                          throw err
                      })

                    
                        break;
                    case 'replay':

                        this.drawPlayerIndicator()

                        ;(function drawBottomPanel(){

                            $(this.selectors.bottomPanel).append(

                                $('<button>')

                                    .on('click',(function prevMove(e){
                                        this.control.replayPrevMove()
                                        e.stopPropagation()
                                    }).bind(this))
                                    .append(
                                        $('<img class="svg">')
                                            .attr('src','images/Back_(Flat).svg')                                
                                    ),
                                
                                $('<button>')

                                    .on('click',(function nextMove(e){
                                        this.control.replayNextMove()
                                        e.stopPropagation()
                                    }).bind(this))
                                    .append(
                                        $('<img class="svg">')
                                            .attr('src','images/Forward_(Flat).svg')                                
                                    )
                            )
                            
                            $(this.selectors.bottomPanel).find('button').addClass('btn replay-button')


                        }).bind(this)()
                        

                        break;
                    case 'endGame':

                        break;
                    default:
                        throw 'invalid state'
                }
            }).bind(this)).catch(function(err){
                console.error('could not create board')
                throw err
            })
        }
        
        //state requires size board n*n with moves 0, 1, 2 for this to function correctly and colour of next move if in play state
        drawBoard(state, colour){
            
            var svgElem = $("#board").find('svg')[0];
            svgElem = $(svgElem)
            svgElem.empty();
            
            var H = svgElem.parent().width()
            var W = svgElem.parent().width()

            svgElem.attr('width',W)
            svgElem.attr('height',H)
            svgElem.attr('xmlns','http://www.w3.org/2000/svg')
            svgElem.attr('xmlns:xlink','http://www.w3.org/1999/xlink')

            
            for(var i = H/(state.size + 1); i < H; i += H/(state.size + 1)){
                svgElem.append(svgFactory.makeLine(0, i, W, i));
            }
            for(var i = W/(state.size + 1); i < W; i += W/(state.size + 1)){
                svgElem.append(svgFactory.makeLine(i, 0, i, H));
            }
            
            svgElem.append(svgFactory.makeRectangle(0, 0, W, H/(2*(state.size + 1)), "Peru"));
            svgElem.append(svgFactory.makeRectangle(0, H - H/(2*(state.size + 1)), W, H/(2*(state.size + 1)), "Peru"));
            svgElem.append(svgFactory.makeRectangle(0, 0, W/(2*(state.size + 1)), H, "Peru"));
            svgElem.append(svgFactory.makeRectangle(W - W/(2*(state.size + 1)), 0, W/(2*(state.size + 1)), H, "Peru"));
            
            for(var i = 0; i < (state.board.length); i++){
            var distance = H/(state.size + 1);
                for(var j = 0; j < (state.size); j++){
                    switch (state.board[i][j]){
                        case 1:
                            svgElem.append(svgFactory.makeCircle((i + 1)*distance, (j + 1)*distance, distance/2, "black", "Peru", 4));
                            break;
                        case 2:
                            svgElem.append(svgFactory.makeCircle((i + 1)*distance, (j + 1)*distance, distance/2, "lightGray", "Peru", 4));
                            break;
                        case 0:
                            if (typeof colour !== 'undefined'){
                                svgElem.append(
                                    $( svgFactory.makeTransparentCircle(
                                        (i + 1)*distance,
                                        (j + 1)*distance,
                                        distance/2,
                                        'black',
                                        true )

                                    )
                                    .attr('data-x',i)
                                    .attr('data-y',j)
                                    .on('click',(function(e){
                                        var data = $(e.target).data()
                                        var lastMove = {
                                            "x" : data.x,
                                            "y" : data.y,
                                            "c" : colour,
                                            "pass" : false
                                        }
                                        
                                        var boardState = {
                                            "size": state.size,
                                            "board": state.board,
                                            "last": lastMove
                                        }
                                        //send state?
                                        this.control.makeMove(boardState)
                                    }).bind(this))
                                    .hover(function(){
                                        $(this).css("fill-opacity","0.25")
                                    },function(){
                                        $(this).css("fill-opacity",'0')
                                    })
                                )
                            }
                            break;
                        default:
                            
                    }
                }
            }

        }

        drawPlayerIndicator(){


            console.error('----NOT IMPLEMENTED----- determine who is current player')

            var curPlayer = 'White'



            $(this.selectors.playerIndicator).empty().append(
                $('<button type="button" class="btn btn-default">')
                    .text(`${curPlayer}`)
                .attr('background-color','white')
            )

        }
        
        
    }
    
    

    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var gameView = new GameView(null,null,null)

    return gameView
})