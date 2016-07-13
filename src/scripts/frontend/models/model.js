define(['requestHandler'],function(RequestHandler){

    return class Model{
        constructor(){
            this.data = null;
            this.id = null;
            this.model = null;
        }

        ////////////////////////////////////////////////
        // public methods
        ////////////////////////////////////////////////

        setData(gameData){
            return new Promise((function(resolve,reject){
                console.error('----- NOT IMPLEMENTENED ---- data adding')
                console.error('temporary return value in place')
                resolve(this.data) // this line is temporary

                // send it to the DB and validate it first
                RequestHandler.sendData(this.model,this.id, this.data).then((function(){
                    // the game data is valid
                    resolve(this.data)
                }).bind(this))
            }).bind(this))
            // rejection occurs if inner promise fails 
        }

        getData(){
            return new Promise((function(resolve,reject){
                console.error('----- NOT IMPLEMENTENED ---- data retrieval')
                console.error('temporary return value in place')
                resolve(this.data)

                RequestHandler.sendData(this.model, this.id).then((function(returnedData){
                    this.data = returnedData
                    resolve(returnedData)
                }).bind(this))
            }).bind(this))

        }

        getProp(prop){
            return new Promise((function(resolve,reject){
                this.getData().then(function(){
                    if( this.data.prop !== undefined || this.data.prop !== null ){
                        resolve(this.data.prop)
                    } else {
                        reject('data property is undefined or null')
                    }
                })
            }))

        }

        ////////////////////////////////////////////////
        // private methods
        ///////////////////////////////////////////////
    }
    
})