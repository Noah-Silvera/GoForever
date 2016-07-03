define(function(){
    
    return class Controller{
        constructor(v, m){
            this._view = v;
            this._model = m;
            this._view.setControl(this);
        }

        /**
         * Associates the given controller with
         * its corresponding view
         */
        setView(v){
            this._view = v; 
        }

        /**
         * Associates the given controller with
         * its corresponding model
         */
        setModel(m){
            this._model = m; 
        }

        /**
         * Sets or changes the viewstate of the given
         * view
         */
        selectViewState(v){
            this._view.selectViewState(v);
            this._view.notify();
        }

        /**
         * Retrieves data from the model
         */
        getData(v){
            this._model.getData();
        }
    }
})