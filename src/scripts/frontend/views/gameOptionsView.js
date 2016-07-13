define(['./view','jquery'],function(View,$){
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
            
            this.colours = {
                
            }
            
            this.handicaps = {
                
            }
            


        }
        render(){
             switch(this.viewState){
                case 'default':
                    $('#start-btn').on('click',(function(){
                        console.info('starting game....')

                        console.error('---NOT IMPLEMENTED--- creating initial game info ')
                        console.error('---NOT IMPLEMENTED--- loading game page ')

                    }).bind(this))


                    // populate lists
                    
                    $("#board-style").append(
                        $('<option>').attr( 'id',"colour1").text('colour1')
                    )
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