define(['./model'], function(Model){

    class SessionModel extends Model {
        constructor(){
            super()
            this.modelName = 'Session'
            // dummy ID for now - will have to figure out how this is generated
            this.data._id = 122
        }
    }
    
    var sessionModel = new SessionModel()
    
    return sessionModel
    
})