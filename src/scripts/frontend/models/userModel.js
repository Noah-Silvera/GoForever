define(['models/model','requestHandler'],function(Model,RequestHandler){

    class UsersModel extends Model {
        constructor(){
            super()
            this.modelName = 'User'
            // dummy ID for now - will have to figure out how this is generated
            this.data._id = 121
        }

        getData(){
            return new Promise(function(resolve, reject){
                RequestHandler.getActiveUser()
                    .then(function(user){
                        resolve(user)
                    })
                    .catch(function(err){
                        reject(err)
                    })
            })
            
        }
    }



    var userModel = new UsersModel()
    
    return userModel
})