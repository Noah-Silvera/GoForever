define(['lib/request'],function(request){
    


    class RequestHandler {


        constructor(){
            this.serverUrl = 'localhost:3000'
            //base part of the user to make ALL requests too
            this.base = 'api'
        }

        
        /**
         * This is a generic method for making a GET request to a server model representation
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {String} id Oject ID relating to the model data
         * @return  A promise that is fufilled with the response body, or rejected with the error. 
         *          The response is always printed to the console
         */
        get(model, id){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : `/${this.base}/${model}/${id}`
                }

                request.get(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }
        
        /**
         * This is a generic method for making a POST request to add a new document
         * to the database
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {JSON} data Oject ID relating to the model data
         * @return  A promise that is fufilled with the response body, or rejected with the error. 
         *          The response is always printed to the console
         */
        create(model, data){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : `/${this.base}/${model}`,
                     "body": JSON.stringify(data),
                     "json" : true,
                     headers : {
                         "content-type" : "application/json"
                     }

                }

                request.post(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)
                    console.log(body);
                    
                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }
        
         /**
         * This is a generic method for making a PATCH request to edit an existing document
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {JSON} data Oject ID relating to the model data
         * @return  A promise that is fufilled with the response body, or rejected with the error. 
         *          The response is always printed to the console
         */
         edit(model, id, data){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : `/${this.base}/${model}/${id}`,
                     "method" : "PATCH",
                     "json" : data,
                     headers : {
                         "content-type" : "application/json"
                     }
                }

                request(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }
        
         signup(data){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : `/signup?username=${data.username}&email=${data.email}&password=${data.password}`,
                     "method" : "POST",
                }

                request(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }
        
         login(data){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : `/login?username=${data.username}&password=${data.password}`,
                     "method" : "POST",
                }

                request(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }

         logout(){

            return new Promise((function(resolve,reject){

                // create a request to the appropiate model with an ID param
                var options = {
                     "url" : "/logout",
                     "method" : "GET",
                }

                request(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
            // must keep the this context to access local variables
        }


   }

    var reqHandler = new RequestHandler()

    return reqHandler
})