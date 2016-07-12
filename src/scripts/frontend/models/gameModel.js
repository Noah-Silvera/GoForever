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

        getData(){
            return {
                '_id': 123,
                'dateTime': null,
                'whiteUserId': 000
                // 'blackUserId': 
            }
        }
        
    }
    
    var gameModel = new GameModel()
    
    return gameModel
})