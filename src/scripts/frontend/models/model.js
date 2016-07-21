define(['requestHandler'],function(RequestHandler){

    return class Model{
        constructor(){
            this.data = {};
            this.modelName = null;
            this.blackList = []
        }

        ////////////////////////////////////////////////
        // public methods
        ////////////////////////////////////////////////

        setData(data){


            return new Promise((function(resolve,reject){
                console.error('----- NOT IMPLEMENTENED ---- data adding')
                console.info('setting given data to model data')
                this.data = data
                resolve(this.data) // this line is temporary

                // send it to the DB and validate it first
                // delete all the blacklisted properties
                // var dataToSend = Object.create(data)

                // this.blackList.forEach((function(prop){
                //     if( dataToSend[prop] !== undefined){
                //         delete dataToSend[prop]
                //     }
                // }).bind(dataToSend))

                // RequestHandler.sendData(this.model,this.id, dataToSend).then((function(){
                //     // the game data is valid
                //     resolve(this.data)
                // }).bind(this))
            }).bind(this))
            // rejection occurs if inner promise fails 
        }

        getData(){
            return new Promise((function(resolve,reject){
                console.error('----- NOT IMPLEMENTENED ---- data retrieval')
                console.info('echoing data')
                resolve(this.data)
/*
                RequestHandler.getData(this.model, this.id).then((function(returnedData){
                     this.data = returnedData
                     resolve(returnedData)
                }).bind(this))*/
            }).bind(this))

        }

        getProp(prop){
            prop = prop.trim()

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

        setProp(prop,val){
            prop = prop.trim()

            this.data[prop] = val


            for(var i =0; i < this.blackList.length; i++){
                // don't need to bother updating if this is true, just straight up return the data
                if( prop = this.blackList[i] ){
                    console.info('returning data...')
                    return Promise.resolve(this.data)
                }
            }
            return this.setData(this.data)
        }


        ////////////////////////////////////////////////
        // private methods
        ///////////////////////////////////////////////
    }
    
})