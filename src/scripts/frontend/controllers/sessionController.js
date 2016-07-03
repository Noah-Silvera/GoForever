define(['controllers/controller','views/sessionView','models/sessionModel'], function(Controller,SessionView,SessionModel){
    class SessionController extends Controller {

        /**
         * Create Session
         */
        create(){

        }

        /**
         * Delete Session
         */
        delete(){

        }

        /**
         * Edit Session (not sure what this would entail) - probably settings for the session
         */
        edit(){

        }
    }
    // this is how the circular dependency between controllers and views are dealt with
    // the view does not know it's controller context on instantiation
    // http://requirejs.org/docs/api.html#circular
    // http://www.bitnative.com/2015/02/03/circular-dependencies-in-requirejs/
    var sessionController = new SessionController(SessionView,SessionModel)
    sessionController._view.setControl(sessionController)

    return sessionController
})