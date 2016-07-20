define(['./view','jquery','models/gameModel'],function(View,$,gameModel){
    class GameOptionsView extends View {
        
        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view

            this.images = {
                'whitePiece': 'images/whitePieceCloseup.png',
                'blackPiece': 'images/blackPieceCloseup.png',
                'emptyBoard': 'images/emptyBoardCloseup.png'
            }
            
            this.style = {
                'beach': 'images/beach.png',
                'dragon': 'images/dragon.png',
                'forest': 'images/dragon.png',
                'metal': 'images/metal.png',
                'river': 'images/river.png'
            }

        }
        
        
        render(){
             switch(this.viewState){
                case 'default':
                    $('#start-btn').on('click',(function(){
                        console.info('starting game....')
                        
                        var hotSeat = $("#play-hot-seat").attr('data-selected')
                        var colour = $("#player-black").attr('data-selected')
                        var opponent;
                        
                        if(hotSeat){
                            opponent = "hot-seat"
                        }
                        else{
                            opponent = "ai"
                        }
                        var userColour;
                        if(colour){
                            userColour = "black"
                        }
                        else{
                            userColour = "white"
                        }

                        var data = {
                            "time" : new Date(),
                            "userId": null,
                            "opponent":opponent,
                            "userHandicap": $("#game-handicap").val(),
                            "boardSize" : $("#board-size").val().slice(0,1),
                            // no moves yet
                            "moveLog": [],
                            "whiteScore": 0,
                            "blackScore": 0,
                            // these values aren't in the DB
                            "style": $("#board-style").val(),
                            "userColour":userColour
                        }

                        gameModel.setData(data).then(function(data){

                            var url = window.location.href.replace("gameOptions", "game?")
                            window.location.href = url.concat(JSON.stringify(data._id))

                        }).catch(function(err){
                            alert('could not create game')
                            console.error(err)
                        })


                    }).bind(this))


                    // populate lists
                    $( "#board-size" ).on("change", function (event) {
                    switch (event.target.value){
                        case "9x9" :
                            $("#game-handicap").append(
                                $('<option>').attr( 'id', 2).text('2 pieces'),
                                $('<option>').attr( 'id', 3).text('3 pieces'),
                                $('<option>').attr( 'id', 4).text('4 pieces'),
                                $('<option>').attr( 'id', 0).text('black has first move')
                            )
                        break;
                        case "13x13" :
                            $("#game-handicap").append(
                                $('<option>').attr( 'id', 2).text('2 pieces'),
                                $('<option>').attr( 'id', 3).text('3 pieces'),
                                $('<option>').attr( 'id', 4).text('4 pieces'),
                                $('<option>').attr( 'id', 5).text('5 pieces'),
                                $('<option>').attr( 'id', 0).text('black has first move')
                            )
                        break;
                        case "19x19" :
                            $("#game-handicap").append(
                                $('<option>').attr( 'id', 2).text('2 pieces'),
                                $('<option>').attr( 'id', 3).text('3 pieces'),
                                $('<option>').attr( 'id', 4).text('4 pieces'),
                                $('<option>').attr( 'id', 5).text('5 pieces'),
                                $('<option>').attr( 'id', 6).text('6 pieces'),
                                $('<option>').attr( 'id', 7).text('7 pieces'),
                                $('<option>').attr( 'id', 8).text('8 pieces'),
                                $('<option>').attr( 'id', 9).text('9 pieces'),
                                $('<option>').attr( 'id', 0).text('black has first move')
                            )
                        break;
                        default :
                        throw "event not detected"
                        }
                    })
                    
                    
                    $.each(this.style, function(index, value){
                        $("#board-style").append(
                        $('<option>').attr( 'id', value).text(index)
                    )
                    });
                    
                    /**
                     * Create the opponent buttons that allow a user to choose between playing against a computer or an AI
                     */
                    $('#opponent-selector').append(
                        $('<button class="btn btn-primary">').attr( 'id',"play-AI").text('Play Against Computer')
                            .addClass('opponent-buttons')
                            .attr('data-selected',1),
                        $('<button class="btn btn-default">').attr( 'id',"play-hot-seat").text('Hot-Seat Play')
                            .addClass('opponent-buttons')
                            .attr('data-selected',0)
                    ).find('.opponent-buttons')
                        // handle dynamic button selections
                        .on('click',function(e){

                            var elem = $(this)

                            // if the button is selected, deselect it, and vice verse
                            if( !parseInt(elem.attr('data-selected')) ){
                                // the value 1 is truthy. To be used later for determining the value of the selection
                                elem.attr('data-selected',1)
                                elem.addClass('btn-primary')
                                elem.removeClass('btn-default')

                                var id = elem.attr('id')

                                elem.closest('#opponent-selector').find('.opponent-buttons').not(`#${id}`)
                                // the value 0 is falsey. To be used later for determining the value of the selection
                                        .attr('data-selected',0)
                                        .addClass('btn-default')
                                        .removeClass('btn-primary')
                            }

                        })

 

                    $('#colour-selector').append(
                        $('<button class="btn">').attr( 'id',"player-white").text('White')
                            .addClass('colour-buttons')
                            .addClass('shadow')
                            .attr('data-selected',1)
                            .css('background-color','white')
                            .css('color','black')
                            .css('font-size','23px')
                            .css('font-weight','600'),
                        $('<button class="btn">').attr( 'id',"player-black").text('Black')
                            .addClass('colour-buttons')
                            .attr('data-selected',0) 
                            .css('background-color','black')
                            .css('font-size','20px')
                            .css('color','white')
                    ).find('.colour-buttons')
                        // handle dynamic button selections
                        .on('click',function(e){

                            var elem = $(this)

                            // if the button is selected, deselect it, and vice verse
                            if( !parseInt(elem.attr('data-selected')) ){
                                // the value 1 is truthy. To be used later for determining the value of the selection
                                elem.attr('data-selected',1)
                                    .css('font-weight','600')
                                    .css('font-size','23px')
                                    .addClass('shadow')

                               

                                var id = elem.attr('id')

                                var otherElem = elem.closest('#colour-selector').find('.colour-buttons').not(`#${id}`)

                                otherElem
                                    .attr('data-selected',0)
                                    .css('font-weight','')
                                    .css('font-size','20px')
                                    .removeClass('shadow')

                                
                                
                            }

                        })

                    
                    

                    break;
              default:
                    throw 'invalid state'
                    break;
            }
        }
    }
    
    var gameOptionsView = new GameOptionsView(null,null,null)
    
    return gameOptionsView
})