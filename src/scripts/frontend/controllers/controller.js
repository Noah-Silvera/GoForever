define(function(){
    
    class Controller{
        constructor(v, m){
            this._view = v;
            this._model = m;
            this._view.setControl(this);
        }

        /**
         * Associates the given controller with
         * its corresponding view
         */
        setView(v){
            this._view = v; 
        }

        /**
         * Associates the given controller with
         * its corresponding model
         */
        setModel(m){
            this._model = m; 
        }

        /**
         * Sets or changes the viewstate of the given
         * view
         */
        selectView(v){
            this._view.selectView(v);
            this._view.notify();
        }

        /**
         * Retrieves data from the model
         */
        getData(v){
            this._model.getData();
        }

        /**
         * Get request method
         * 
         * @param url the URL to send the request to
         * @param criteria search criteria in JSON format
         */
        get(url, criteria){
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    _model.setData(xmlHttp.responseText);
                    _view.notify();
                }
            }
            xmlHttp.open('GET', url, true);

            if(criteria){
                xmlHttp.setRequestHeader("Content-type", "application/json");
                xmlHttp.send(JSON.stringify(criteria));
            } else {
                xmlHttp.send(null);
            }
        }

        /**
         * Post request method
         * 
         * @param url the URL to send the request to
         * @param data JSON to post to the server
         */
        post(url, data){
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    selectView(3);
                    _data.setData(JSON.parse(xmlHttp.responseText));
                    _view.notify();
                }
            }
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.open('POST', url, true);
            xmlHttp.send(JSON.stringify(data));
        }

        /**
         * Patch request method
         * @param url the URL to send the request to
         * @param criteria to sreach for editing
         * @param data JSON to post to the server
         */
        patch(url, criteria, data){

        }
    }
})