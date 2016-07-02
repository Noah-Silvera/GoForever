 define(['./controller'], function(Controller){
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
                this.post("/users", data);
            } else {
                this.selectView(2);
                this._view.notify();
            }
        }
        
    }
    
    var userController = new UserController()
    
    return userController
 })