define(['request'],function(request){
    


    class RequestHandler {


        constructor(){
            this.serverUrl = 'localhost:3000'
            this.base = 'api'
        }

        

        
        /**
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {String} id UIID relating to the model data
         */
        getData(model, id){

            

            return new Promise((function(resolve,reject){

                var options = {}

                var options = {
                     "url" : this.serverUrl + "/" + this.base + "/" + model + "?" + id 
                }

                options = this.cors(options)

                request.get(options,function(err,res,body){
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
        }
        /**
         * @param  {String} model string rep of the model to send data to
         * @param  {String} id UIID relating to the model data
         */
        sendData(model, id){
            return new Promise(function(resolve,reject){
                reject('method not implemented')
            })

            if( dataExists(model, id) ){
                //patch
            } else{
                //post
            }


        }
        /**
         * @param  {String} model string rep of the model to check if data exists
         * @param  {String} id UIID relating to the model data
         */
        dataExists(model, id){
            return new Promise(function(resolve,reject){
                reject('method not implemented')
            })
        }
        /**
         * @param  {any} options appends http headers to an object to allow CORS
         */
        cors(options){
            options.headers = {
                'Access-Control-Allow-Origin': 'localhost:3000'
            }

            return options
        }

    }

    var reqHandler = new RequestHandler()

    return reqHandler
})