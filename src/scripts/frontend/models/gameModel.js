define(['./model'], function(Model){

    class GameModel extends Model{

        constructor(){
            super()
            this.modelName = 'Match'
            // dummy ID for now - will have to figure out how this is generated
            this.data._id = 123
        }    
    }
    
    var gameModel = new GameModel()
    
    return gameModel
})