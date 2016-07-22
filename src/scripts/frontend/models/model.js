define(['requestHandler'],function(RequestHandler){

    return class Model{
        constructor(){
            this.data = {};
            this.modelNameName = null;
            this.blackList = []
        }

        ////////////////////////////////////////////////
        // public methods
        ////////////////////////////////////////////////

        setData(data){


            return new Promise((function(resolve,reject){
                console.error('----- NOT IMPLEMENTENED ---- data adding')
                console.info('setting given data to model data')

                
                this.mergeDataIntoModel(data)

                // send it to the DB and validate it first
                // delete all the blacklisted properties
                var dataToSend = JSON.parse(JSON.stringify(this.data))

                for(var i =0; i < this.blackList.length; i++){
                    var prop = this.blackList[i]

                    if( dataToSend[prop] !== undefined){
                        delete dataToSend[prop]
                    }
                }

                RequestHandler.edit(this.modelName,this.data._id, dataToSend).then((function(){
                    // the game data is valid
                    resolve(this.data)
                }).bind(this))

            }).bind(this))
            // rejection occurs if inner promise fails 
        }

        getData(){

            return new Promise((function(resolve,reject){
                // console.error('----- NOT IMPLEMENTENED ---- data retrieval')
                console.info('echoing data')

                RequestHandler.get(this.modelName, this.data._id).then((function(returnedData){
                    // merge the returned data with the model

                    this.mergeDataIntoModel(returnedData)

                    if(this.data.moveLog == []){
                        debugger;
                    }


                     resolve(this.data)
                }).bind(this))

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
                if( prop === this.blackList[i] ){
                    console.info('returning data...')
                    return Promise.resolve(this.data)
                }
            }
            return this.setData(this.data)
        }

        mergeDataIntoModel(returnedData){
            for(var prop in returnedData ){
                if(returnedData.hasOwnProperty(prop)){
                    if( returnedData[prop] !== undefined ){
                        this.data[prop] = returnedData[prop]
                    }
                }
            }
        }



        ////////////////////////////////////////////////
        // private methods
        ///////////////////////////////////////////////
    }
    
})