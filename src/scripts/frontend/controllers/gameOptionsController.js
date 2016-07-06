define(['controllers/controller','views/gameOptionsView','models/gameOptionsModel'], function(Controller,GameOptionsView,GameOptionsModel){
    class GameOptionsController extends Controller {

        /**
         * Create Options
         */
        create(){

        }

        /**
         * Delete Options
         */
        delete(){

        }

        /**
         * Edit Options
         */
        edit(){

        }
    }
    // this is how the circular dependency between controllers and views are dealt with
    // the view does not know it's controller context on instantiation
    // http://requirejs.org/docs/api.html#circular
    // http://www.bitnative.com/2015/02/03/circular-dependencies-in-requirejs/
    var gameOptionsController = new GameOptionsController(GameOptionsView,GameOptionsModel)
    gameOptionsController._view.setControl(gameOptionsController)

    return gameOptionsController
})