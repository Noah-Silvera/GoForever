class SessionsView extends View {

    render(){
        switch(this._viewState){
            case 0:
                var h1 = $("<h1>").html("Sign In");
                var div1 = $("<div>").addClass("row");
                    var div2 = $("<div>").addClass("col-md-6 col-md-offset-3");
                        var form = $('<form action="/sessions" method="post">');
                            var text1 = $('<input type="text" id="email" placeholder="E-mail">').addClass("form-control");
                            var text2 = $('<input type="password" id="password" placeholder="Password">').addClass("form-control");
                            var submit = $('<input type="button" id="Sign In" value="Sign In">').addClass("btn btn-primary");
                $("#content").empty();
                $("#content").append(h1);
                form.append(text1);
                form.append(text2);
                form.append(submit);
                div2.append(form);
                div1.append(div2);
                $("#content").append(div1);
                break;
            case 1:

                break;
            default:

                break;
        }
    }
}