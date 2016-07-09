//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','lib/jquery'],function(View,$){

    class UserView extends View {

        render(){

            switch(this.viewState){
                // get all
                case 'firstState':

                    // event handlers intialized here
                    // state specific DOM manips dealt with here

                    break;

                // get one
                case 1:

                    break;

                // create
                case 2:
                
            
                    var h1 = $("<h1>").html("Sign Up");
                    var div1 = $("<div>").addClass("row");
                        var div2 = $("<div>").addClass("col-md-6 col-md-offset-3");
                            //var form = $('<form>');

                                var text1 = $('<input type="text" id="name" placeholder="Your Name">').addClass("form-control");
                                var text2 = $('<input type="text" id="email" placeholder="E-mail">').addClass("form-control");
                                var text3 = $('<input type="password" id="password" placeholder="Password">').addClass("form-control");
                                var text4 = $('<input type="password" id="password_confirmation" placeholder="Confirm Password">').addClass("form-control");
                                var submit = $('<input type="submit" onclick="app._usersController.create()" name="Create Account">').addClass("btn btn-primary");
                    $("#content").empty();
                    $("#content").append(h1);
                    div2.append(text1);
                    div2.append(text2);
                    div2.append(text3);
                    div2.append(text4);
                    div2.append(submit);
                    //div2.append(form);
                    div1.append(div2);
                    $("#content").append(div1);

                    break;
                
                //Welcome after creating
                case 3:
                    $("#content").empty();
                    var div = $("<div>").addClass("jumbotron");
                        var h1 = $("<h1>").html("Welcome to GoForever");
                        var p = $("<p>").html("Your account has been successfully created");
                    div.append(h1);
                    div.append(p);
                    $("#content").append(div);
                    $("#content").html(this.control.getData());
                    break;

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