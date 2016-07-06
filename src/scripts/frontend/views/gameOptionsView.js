define(['./view'],function(View){
    class GameOptionsView extends View {
        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view
            this.states = ['onlyState']

        }
        render(){
             switch(this.viewState){
                case this.states[0]:

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