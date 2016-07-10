define(['./model'], function(Model){

    class GameModel extends Model{

        constructor(){
            super()
            this.modelName = 'matchs'
            // dummy ID for now - will have to figure out how this is generated
            this.id  = 123
        }

        addData(gameData){
            // handle and send data to database
        }
        
    }
    
    var gameModel = new GameModel()
    
    return gameModel
})