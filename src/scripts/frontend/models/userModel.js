define(['models/model'],function(Model){

    class UsersModel extends Model {
        constructor(){
            super()
            this.modelName = 'User'
            // dummy ID for now - will have to figure out how this is generated
            this.data._id = 121
        }
    }

    var userModel = new UsersModel()
    
    return userModel
})