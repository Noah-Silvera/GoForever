define(['./model'], function(Model){

    class GameModel extends Model{

        constructor(){
            super()
            this.modelName = 'Match'
            this.blackList = ['board', 'whiteOffset', 'tempArmy','curMoveNum','userColour']
            // dummy ID for now - will have to figure out how this is generated
            
        }    
    }
    
    var gameModel = new GameModel()
    
    return gameModel
})