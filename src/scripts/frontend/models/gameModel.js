define(['./model'], function(Model){

    class GameModel extends Model{

        constructor(){
            super()
            this.modelName = 'match'
            // dummy ID for now - will have to figure out how this is generated
            this.id = 123
            this.data = {
                
            }
        }    
    }
    
    var gameModel = new GameModel()
    
    return gameModel
})