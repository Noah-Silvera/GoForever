 define(['controllers/controller','views/UserView','models/UserModel','lib/request','RequestHandler'], function(Controller,UserView,UserModel,request,RequestHandler){

    class UserController extends Controller{
        
        signup(){
            var data = {};
            data.username = $("#register-username").val();
            data.email = $("#register-email").val();
            data.email_confirm = $("#register-email-confirm").val();
            data.password = $("#register-password").val();
            data.password_confirm = $("#register-password-confirm").val();

            var valid = true;
            if (data.password !== data.password_confirm) valid = false;
            
            if (data.email !== data.email_confirm) valid = false;
            
            if (data.username.length == 0) valid = false;
            
            if (data.password.length == 0) valid = false;
                RequestHandler.signup(data)
                    .then(function(res){
                        window.location.href = 'http://localhost:3000/userLanding'
                    })
                    .catch(function(err){
                        console.debug(err)
                    })                      
                    
            if(valid){
                
            } else {
                
                // select view state changes nothing at the moment
            }
        }
        
        

        login(){
            var data = {};
            data.username = $("#login-username").val();

            data.password = $("#login-password").val();
            
            var valid = true;
            if (data.username.length == 0) valid = false;
            
            if (data.password.length == 0) valid = false;
                RequestHandler.login(data)
                    .then(function(res){
                        console.debug(res)
                        window.location.href = 'http://localhost:3000/userLanding'
                                              
                    })
                    .catch(function(err){
                        console.debug(err)
                    })
            if(valid){//logic should be reversed later
                
            } else {

            }
        }
        
        logout(){
            RequestHandler.logout()
            .then(function(res){
                console.log(res)
                window.location.href = 'http://localhost:3000/'
            })
            .catch(function(err){
                console.log(err)
            })
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

        
    }
    
    // this is how the circular dependency between controllers and views are dealt with
    // the view does not know it's controller context on instantiation
    // http://requirejs.org/docs/api.html#circular
    // http://www.bitnative.com/2015/02/03/circular-dependencies-in-requirejs/
    var userController = new UserController(UserView,UserModel)
    userController.view.setControl(userController)
    
    return userController
 })