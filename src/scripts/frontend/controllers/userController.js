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

        playGame(options){

            if(options.guest){
                // do guest specific logic here
                console.info('current user is a guest')
            }
            // do auth thingys and database thingys here
            window.location.href = 'http://localhost:3000/gameOptions'
        }

        loadLandingPage(){
            window.location.href = 'http://localhost:3000/userLanding'
        }

        loadProfilePage(){
            window.location.href = 'http://localhost:3000/userProfile'
        }

        loadSettingsPage(){
            // do user specific things here

            window.location.href = 'http://localhost:3000/userSettings'
        }


        logout(){
            // do logging out things here

            window.location.href = 'http://localhost:3000/'
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