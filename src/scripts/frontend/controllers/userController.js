 define(['controllers/controller','views/UserView','models/UserModel','lib/request'], function(Controller,UserView,UserModel,request){

    class UserController extends Controller{
        
        create(){
            var data = null;
            data.name = $("#name").val();
            data.email = $("#email").val();
            data.password = $("#password").val();
            data.password_confirm = $("#password_confirmation").val();

            var valid = true;
            if (data.password !== data.password_confirm) valid = false;

            /**
             * Must validate e-mail format and name length as well
             */

            if(valid){

                // should update the model here
                // this.post("/users", data);
            } else {
                this.selectViewState(2);
                this.view.notify();
            }
        }

        playAsGuest(){
            // do auth thingys and database thingys here
            var options = {
                url: 'http://localhost:3000/game',
                port: '3000',
                headers: {
                    'Content-Type': 'application/json',
                } 
            };
            
            return new Promise(function(resolve,reject){
                request.get(options,function(err,res,body){
                    console.debug(res)

                    if(err) reject(err)

                    resolve(body)
                })


            })
        }
        
    }
    
    // this is how the circular dependency between controllers and views are dealt with
    // the view does not know it's controller context on instantiation
    // http://requirejs.org/docs/api.html#circular
    // http://www.bitnative.com/2015/02/03/circular-dependencies-in-requirejs/
    var userController = new UserController(UserView,UserModel)
    userController.view.setControl(userController)
    
    return userController
 })