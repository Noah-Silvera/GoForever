//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','lib/jquery','/controllers/userController'],function(View,$,userController){

    class UserView extends View {

        render(){

            switch(this.viewState){
                // get all
                case 'indexPage':

                    // event handlers intialized here
                    // state specific DOM manips dealt with here

                    $('play-as-guest').submit(function(){
                       
                    })

                    break;

                case 'landingPage':

                    break;

                // get one
                case 'settingsPage':

                    break;

                case 'profilePage':

                default:
                    throw 'invalid state'

                    break;
            }
        }
    }
    
    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var userView = new UserView(null, null,null)
    
    return userView
})