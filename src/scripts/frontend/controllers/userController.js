 define(['controllers/controller','views/UserView','models/UserModel','lib/request'], function(Controller,UserView,UserModel,request){

    class UserController extends Controller{
        
        create(){
            var data = {};
            data.name = $("#register-username").val();
            data.email = $("#register-email").val();
            data.email_confirm = $("#register-email-confirm").val();
            data.password = $("#register-password").val();
            data.password_confirm = $("#register-password-confirm").val();

            var valid = true;
            if (data.password !== data.password_confirm) valid = false;
            
            if (data.email !== data.email_confirm) valid = false;
            
            if (data.name.length == 0) valid = false;
            
            if (data.password.length == 0) valid = false;

            if(valid){

                // should update the model here
                // this.post("/users", data);
            } else {
                
                // select view state changes nothing at the moment
                this.selectViewState("landingPage");
                this.view.notify();
            }
        }
        //Login should be handled in sessions controller, not here
        login(){
            var data = {};
            data.name = $("#login-username").val();
            data.password = $("#login-password").val();
            
            var valid = true;
            if (data.name.length == 0) valid = false;
            
            if (data.password.length == 0) valid = false;
            
            if(valid){//logic should be reversed later

                // should update the model here
                // this.post("/users", data);
            } else {
                
                // select view state changes nothing at the moment
                this.selectViewState("landingPage"); 
                this.view.notify();
            }
        }
        
        forgotCredentials(){
            //send username and pass by email
            throw "method not implemented"
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