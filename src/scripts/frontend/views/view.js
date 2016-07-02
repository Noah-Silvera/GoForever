define(function(){

    return class View {
        constructor(){

            this._viewState = 0;
            this._control = null;
            this._content = "#content";
        }

        setControl(c){
            this._control = c; 
        }

        selectView(v){
            this._viewState = v; 
        }

        notify(){
            this.render(); 
        }
    }
})
