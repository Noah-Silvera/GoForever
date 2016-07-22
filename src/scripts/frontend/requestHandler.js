define(['lib/request'],function(request){
    


    class RequestHandler {


        constructor(){
            this.serverUrl = 'roberts.seng.uvic.ca'
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
                    body = JSON.parse(body)
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
                    console.log(res.body)
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
        
        getActiveUser(){
            return new Promise((function(resolve,reject){
              // create a request to the appropiate model with an ID param
                var options = {
                     url : "/getActive"
                }

                request.get(options,function(err,res,body){
                    if(err) reject(err)
                    resolve(body)
                })
            }).bind(this))
        }
        
        updateHistory(userid, matchid){
            return new Promise((function(resolve,reject){
              // create a request to the appropiate model with an ID param
                var options = {
                     url : `/updateHistory/${userid}/${matchid}`,
                     method : "PATCH"
                }

                request(options,function(err,res,body){
                    if(err) reject(err)
                    resolve(JSON.parse(body))
                })
            }).bind(this))
        }

        getRandomMove(state){
            return new Promise((function(resolve,reject){
              // create a request to the appropiate model with an ID param
                var options = {
                     url : "/move",
                     json :true,
                     headers : {
                         'content-type': 'application/json'
                     },
                     body : JSON.stringify(state)
                }

                request.post(options,function(err,res,body){
                    console.debug(res)
                    if(err) reject(err)

                    resolve(body)
                })
            }).bind(this))
        }


   }

    var reqHandler = new RequestHandler()

    return reqHandler
})