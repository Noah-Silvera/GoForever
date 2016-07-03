define(function(){

    
    return class View {
        constructor(viewState,control,content){

            if( !viewState) this._viewState = 0;
            else this._viewState = viewState

            if( !control) this._control = null;
            else this._control = control

            if( !content) this._content = "#content";
            else this._content = _viewState

        }

        setControl(c){
            this._control = c 
        }

        selectViewState(v){
            this._viewState = v.trim(); 
        }

        notify(){
            this.render(); 
        }

        render(){
            throw 'method not implemented'
        }
    }
    
    
})
