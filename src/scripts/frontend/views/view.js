define(function(){

    
    return class View {
        constructor(viewState,control,content){

            if( !viewState) this.viewState = 'firstState';
            else this.viewState = viewState

            if( !control) this.control = null;
            else this.control = control

            if( !content) this.content = "#content";
            else this.content = viewState

        }

        setControl(c){
            this.control = c 
        }

        selectViewState(v){
            this.viewState = v.trim(); 
        }

        notify(){
            this.render(); 
        }

        render(){
            throw 'method not implemented'
        }
    }
    
    
})
