define(['request'],function(request){
    


    class RequestHandler {


        constructor(){
            this.serverUrl = 'localhost:3000'
            //base part of the user to make ALL requests too
            this.base = 'api'
        }

        
        /**
         * TESTED
         * This is a generic method for making a GET DATA api call to a server model representation
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {String} id UIID relating to the model data
         * @return  A promise that is fufilled with the response body, or rejected with the error. 
         *          The response is always printed to the console
         */
        getData(model, id){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : this.serverUrl + "/" + this.base + "/" + model + "?" + id 
                }

                // set the cors headers
                options = this.cors(options)

                request.get(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
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