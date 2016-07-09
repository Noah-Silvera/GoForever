define(['./view','jquery'],function(View,$){
    class GameOptionsView extends View {
        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view


        }
        render(){
             switch(this.viewState){
                case 'default':
                    $('#start-btn').on('click',function(){
                        console.info('starting game....')

                        console.info('---NOT IMPLEMENTED--- creating initial game info ')
                        console.info('---NOT IMPLEMENTED--- loading game page ')
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