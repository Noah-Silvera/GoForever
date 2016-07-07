define(['requestHandler'],function(RequestHandler){

    return class Model{
        constructor(){
            this.data = null;
        }

        retrieveData(){
            RequestHandler.getData(this.modelName, this.id).then(function(data){
                return setData(data)
            },function(err){
                console.error('could not retrieve model data')
                throw err
            })
        }

        sendData(){
            //
        }

        /**
         * Getter
         */
        getData(){
            return this.data; 
        }

        /**
         * Setter
         */
        setData(d){
            this.data = d;
        }
    }
    
})