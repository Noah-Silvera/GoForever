 define(['controllers/controller','views/userView','models/userModel','lib/request','requestHandler','lib/statistics'], function(Controller,UserView,UserModel,request,RequestHandler,Stats){

    class UserController extends Controller{
        
        signup(){  

            //asdkjgasfdhgasdhj
            var data = {};
            data.username = $("#register-username").val();
            data.email = $("#register-email").val();
            data.email_confirm = $("#register-email-confirm").val();
            data.password = $("#register-password").val();
            data.password_confirm = $("#register-password-confirm").val();


            if (data.username.length == 0) alert("Must provide a username.");
            else if (data.email.length == 0) alert("Must provide an email.");
            else if (data.password.length == 0) alert("Must provide a password.");
            else if (data.password !== data.password_confirm) alert("Passwords didn't match");
            else {                                 
                RequestHandler.signup(data)
                    .then(function(res){
                        window.location.href = 'http://localhost:30103/userLanding.html'
                    })
                    .catch(function(err){
                        console.debug(err)
                    })   
                
            } 
        }   
        
        login(){
            var data = {};
            data.username = $("#login-username").val();
            data.password = $("#login-password").val();
            
            if (data.username.length == 0) alert("Must provide a username.");
            else if (data.password.length == 0) alert("Must provide a password.");
            else {//logic should be reversed later
                RequestHandler.login(data)
                    .then((function(res){
                        console.debug(res)
                        window.location.href = 'http://localhost:30103/userLanding.html'
                    }).bind(this))
                    .catch((function(err){
                        console.debug(err)
                    }).bind(this))
            }
        }
        
        logout(){
            RequestHandler.logout()
            .then(function(res){
                console.log(res)
                window.location.href = 'http://localhost:30103/'
            })
            .catch(function(err){
                console.log(err)
            })
        }

        landingStats(){
            Stats.landingStats()
        }

        profileStats(){
            Stats.profileStats()
        }
        
        forgotCredentials(){
            //send username and pass by email
            throw "method not implemented"
        }

        playGame(){
            // do auth thingys and database thingys here
            .href = 'http://localhost:30103/gameOptions'
        }

        loadLandingPage(){
            window.location.href = 'http://localhost:30103/userLanding.html'
        }

        loadProfilePage(){
            window.location.href = 'http://localhost:30103/userProfile.html'
        }

        loadSettingsPage(){
            // do user specific things here

            window.location.href = 'http://localhost:30103/userSettings.html'
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