define(function(){

    class Model{
        constructor(){
            this._data = null;
        }


        getData(){
            return this._data; 
        }

        setData(d){
            this._data = d;
        }
    }
    
})