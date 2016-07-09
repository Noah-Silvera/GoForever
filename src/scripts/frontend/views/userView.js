//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','jquery','controllers/userController'],function(View,$,userController){

    class UserView extends View {

        render(){

            switch(this.viewState){
                // get all
                case 'indexPage':

                    // event handlers intialized here
                    // state specific DOM manips dealt with here

                    $('.nav#play-as-guest').on('click',(function(){
                       console.info('loading guest game')
                       this.control.playGame({ guest: true })
                    }).bind(this))

                    break;

                case 'landingPage':

                    $('.nav#account-settings').on('click',(function(){
                        console.info('loading settings')
                        this.control.loadSettings()
                    }).bind(this))

                    $('.nav#logout').on('click',(function(){
                        console.info('logging out....')
                        console.info('--- NOT IMPLEMENTED --- ')
                        this.control.logout()
                    }).bind(this))

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