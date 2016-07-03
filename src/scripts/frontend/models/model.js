define(function(){

    return class Model{
        constructor(){
            this.data = null;
        }


        getData(){
            return this.data; 
        }

        setData(d){
            this.data = d;
        }
    }
    
})