define(['lib/request'],function(request){
    

    class RequestHandler {


        constructor(){

        }

        
        /**
         * @param  {String} model string rep of the model to retrieve data for
         * @param  {String} id UIID relating to the model data
         */
        getData(model, id){

        }
        /**
         * @param  {String} model string rep of the model to send data to
         * @param  {String} id UIID relating to the model data
         */
        sendData(model, id){
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

        }



    }

    var reqHandler = new RequestHandler()

    return reqHandler
})