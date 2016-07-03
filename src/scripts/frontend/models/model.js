define(function(){

    return class Model{
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