define(function(){
    
    return class Controller{
        constructor(v, m){
            this.view = v;
            this.model = m;
            this.view.setControl(this);
        }

        /**
         * Associates the given controller with
         * its corresponding view
         */
        setView(v){
            this.view = v; 
        }

        /**
         * Associates the given controller with
         * its corresponding model
         */
        setModel(m){
            this.model = m; 
        }

        /**
         * Sets or changes the viewstate of the given
         * view
         */
        selectViewState(v){
            this.view.selectViewState(v);
            this.view.notify();
        }

        /**
         * Retrieves data from the model
         */
        getData(){
            // returns a promise from the model with the corresponding data
            return this.model.getData();
        }
    }
})