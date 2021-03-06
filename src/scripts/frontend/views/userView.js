//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','jquery','RequestHandler'],function(View,$,RequestHandler){

    class UserView extends View {

        render(){

                // buttons like 'play game' that are present on multiple pages
                // are looked for and event handlers attached
                this.setUpCommonButtons()



                RequestHandler.getActiveUser()
                    .then((function(user){
                        if (user) user = JSON.parse(user)

                switch(this.viewState){
                    // get all
                    case 'indexPage':
                        
                        $("#login").on('click',(function(){
                            this.control.login()
                        }).bind(this))
                        
                        $("#register").on('click',(function(){
                            this.control.signup()
                        }).bind(this))
                        
                        /*$("#forgot-credentials").on('click',(function(){
                            $('#recovery-modal').modal('show')
                        }).bind(this))
                        
                        $('.modal')
                        .on('show.bs.modal',(function(e){
                            $(e.currentTarget).css('z-index',1000)
                        }).bind(this))
                        .on('hide.bs.modal', (function(e){
                            $(e.currentTarget).css('z-index',-1000)
                        }).bind(this))


                    ;(function endGameModalSetup(){
                        $('.nav#submit-recovery').on('click',(function(){
                            this.control.forgotCredentials()
                        }).bind(this))
                    }).bind(this)()*/



                        break;

                    case 'landingPage':

                        this.drawNavBar()
                        $('#landing-username').html(user.username)
                        this.control.landingStats()

                        break;

                    // get one
                    case 'settingsPage':
                        this.drawNavBar()
                        
                        break;

                    case 'profilePage':
                        this.drawNavBar()
                        this.control.profileStats()

                        break;

                    default:
                        throw 'invalid state'

                        break;
                }
                            }).bind(this))


        }
        /**
         * Sets up event handlers for common purposes with the same purposes
         * that are present on many pages, i.e, play game, etc.
         */
        setUpCommonButtons(){
            $('.nav.play-game').on('click',(function(){
                console.info('loading game')
                this.control.playGame()
            }).bind(this))  

            $('.replay-button')
            
        }
        /**
         * Will attach the nav bar to the elemnent with the 'nav-bar-wrapper' id in the dom
         */
        drawNavBar(){
            // look for the sepcial element to attach to
            $('#nav-bar-wrapper').append(
                // boilerplate wrapping
                $(  `<div class="better-border">
                        <nav class="navbar navbar-inverse">
                            <div id="button-wrapper" class="container-fluid">
                                <div class="navbar-header">
                                    <a class="navbar-brand" >GoForever</a>
                                </div>                            
                            </div>
                        </nav>
                    </div>`
                )
            ).find('#button-wrapper').append(
                        // list of buttons
                        $('<ul class="nav navbar-nav">')
                        .append((function(){
                            var elems = []

                            // create all the navigation buttons and set up their handlers

                            var homeButton = $(' <li class="nav"><a href="#"  class="nav user-profile">Home</a></li>').on('click',(function(){
                                this.control.loadLandingPage()
                            }).bind(this))

                            var profileButton = $('<li ><a href="#"  class="nav account-profile" id="account-profile">User Profile</a></li>').on('click',(function(){
                                this.control.loadProfilePage()
                            }).bind(this))

                            var settingsButton = $('<li><a href="#"  class="nav logout" id="logout">Account Settings</a></li>').on('click',(function(){
                                this.control.loadSettingsPage()
                            }).bind(this))

                            var logoutButton = $('<li><a href="#"  class="nav account-settings" id="account-settings">Log out</a></li>').on('click',(function(){
                                this.control.logout()
                            }).bind(this))

                            // prepare the buttons to be sent back to jquery
                            elems.push(homeButton, profileButton, settingsButton, logoutButton)

                            // look for the current active view state- set the appropiate button to display this
                            switch(this.viewState){
                                case 'landingPage':

                                    homeButton.addClass('active')

                                    break;
                                case 'settingsPage':
                                    settingsButton.addClass('active')

                                    break;
                                case 'profilePage':
                                    profileButton.addClass('active')

                                    break;
                                default:
                                    throw 'invalid state to draw navbar in'
                            }

                            return elems

                        }).bind(this))
                    )


        }
    }
    
    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var userView = new UserView(null,null,null)
    
    return userView
})