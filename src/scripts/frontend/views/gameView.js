
//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','utils/svgFactory'],function(View,svgFactory){


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
            
            // set up common modals
            $('.modal')
                .on('show.bs.modal',(function(e){
                    $(e.currentTarget).css('z-index',1000)
                }).bind(this))
                .on('hide.bs.modal', (function(e){
                    $(e.currentTarget).css('z-index',-1000)
                }).bind(this))

            // set up the end Game modal

            ;(function endGameModalSetup(){
                $('.nav#main-menu').on('click',(function(){
                    this.control.mainMenu()
                }).bind(this))
            }).bind(this)()

            this.control.getData().then((function(data){
                
                // clear the bottom panel of all state specific buttons
                
                $("#board-wrapper").addClass(data.style)

                // beginning of the game
                if( data.moveLog.length == 0){
                    //create the board
                    return this.control.createBoard(data.boardSize)
                } else return Promise.resolve(data)

            }).bind(this)).then( (function(data){

                // only does this when applicable
                return this.control.setHandicapsAndScores(data.board, data.userHandicap, data.moveLog)

            }).bind(this)).then((function(dataArr){
                    // multiple copies of the data are returned, use the first copy
                    var data = dataArr[0]
                    // set the appropiate scores
                    $("#score-black").text(data.blackScore)
                    $("#score-white").text(data.whiteScore + data.whiteOffset)

                    // continue on to draw the board
                    return Promise.resolve(data)

            }).bind(this)).catch(function(err){
                toastr.error('could not retrieve data to render game')
                throw err
            }).then((function(data){

                var curPlayerColour;

                if( data.moveLog.length === 0 ){
                    // black takes the first move
                    curPlayerColour = 1
                } else {
                    // choose the opposite colour of the last move
                    curPlayerColour = ( data.moveLog.slice(-1)[0].c % 2 ) + 1
                }

                switch(this.viewState){

                    case 'gameActive':

                        this.drawPlayerIndicator(curPlayerColour)
                        
                        // ensure the score counters are visible
                        $('.score-counter').css('opacity',100)
                        
                        ;(function drawBottomPanel(){


                            // the action buttons for main gameplay
                            $(this.selectors.bottomPanel).empty().append(
                                $('<div id="action-buttons" >').append(
                                    $('<button>')
                                        .addClass('btn btn-default')
                                        .attr('id','pass-button')
                                        .text('Pass')
                                        .on('click',(function makeMove(){
                                            this.control.makeMove({ 'pass':true })
                                        }).bind(this))
                                    // $('<button>')
                                    //     .text('Replay ( TEMPORARY )')
                                    //     .on('click',(function replay(){
                                    //         this.control.selectViewState('replay')
                                    //     }).bind(this))
                                    
                                )
                            )
                        }).bind(this)()

                      

                        // draw the board with the right colour piece    
                        this.drawBoard(data.board, curPlayerColour)

                    
                        break;

                    case 'replay':

                        // ensure the score counters are invisible
                        $('.score-counter').css('opacity',0)

                        this.control.setHandicapsAndScores(data.board, data.userHandicap, [])

                        this.drawPlayerIndicator(curPlayerColour)
                        

                        ;(function drawBottomPanel(){

                            $(this.selectors.bottomPanel).empty().append(

                                $('<button>')

                                    .on('click',(function prevMove(e){
                                        this.control.replayPrevMove().then( (result) =>{
                                            console.info('move retracted')
                                        }).catch( (err) => {
                                            if( err.message === "first-move" ){
                                                toastr.error('no more moves to return too')
                                            }
                                        })
                                        e.stopPropagation()
                                    }).bind(this))
                                    .append(
                                        $('<img class="svg">')
                                            .attr('src','images/Back_(Flat).svg')                                
                                    ),
                                
                                $('<button>')

                                    .on('click',(function nextMove(e){
                                        this.control.replayNextMove().then( (result) => {
                                            console.info('move advanced')
                                        })
                                        e.stopPropagation()
                                    }).bind(this))
                                    .append(
                                        $('<img class="svg">')
                                            .attr('src','images/Forward_(Flat).svg')                                
                                    )
                            )
                            
                            $(this.selectors.bottomPanel).find('button').addClass('btn replay-button')
                        }).bind(this)()

                        this.drawBoard(data.board, curPlayerColour)
                        

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
            
            for(var i = 0; i < (state.size); i++){
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

                                        // mark down the move just made
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
                                        this.control.makeMove(boardState).then((function(result){
                                            console.info('move successfully made')

                                            return this.control.checkIfAi()
                                        }).bind(this),(function(err){
                                            console.error('user move failed')
                                            console.error(err)

                                            // use gameplay error messages

                                            switch(err.message){
                                                case 'ko':
                                                    toastr.error('cannot place a piece where previously placed')
                                                    break;
                                                
                                                case 'suicide':
                                                    toastr.error('cannot suicide')
                                                    break;
                                                
                                                case 'replay-error':
                                                    toastr.error('cannot place a piece during replay')
                                                    break;

                                            }


                                            console.error(err)
                                            return Promise.reject(err)
                                        }).bind(this)).then((function(result){
                                            console.info('ai move made if applicable')
                                        }).bind(this),function(err){
                                            console.error('ai move failed')
                                            console.error(err)
                                        })

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

        drawPlayerIndicator(curPlayerColour){

            var backgroundColourString = ''
            var textColourString = ''

            if( curPlayerColour === 1){
                backgroundColourString = 'black'
                textColourString = 'white'
            } else {
                backgroundColourString = 'white'
                textColourString = 'black'
            }



            $(this.selectors.playerIndicator).empty().append(
                $('<button type="button" class="btn btn-default">')
                    .text(`Current Player: ${backgroundColourString}`)
                    .css('background-color',backgroundColourString)
                    .css('color',textColourString )
            )

        }

        showEndGameModal(won){
            
            $('#end-result-title').text( (function(){
                if(won){
                    return 'You Won!'
                } else return 'Better luck next time'
            })() )

            $('#end-result-modal').modal('show')


        }
        
        
    }
    
    

    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var gameView = new GameView(null,null,null)

    return gameView
})