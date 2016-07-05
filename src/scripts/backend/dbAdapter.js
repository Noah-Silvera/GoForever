var MongoClient = require('mongodb').MongoClient;

// set up mongo
var dbName = 'GoForever'
var host = 'mongodb://localhost'
var port = '27017'
var url = `${host}:${port}\\${dbName}`

// an object with the collection names as keys 
// for easy access to available collections

var collections = {
    'sessions': null,
    'matches': null,
    'users' : null
}

// connect to all the collections specified in the collections object
MongoClient.connect(url)
    .then(function(db){
        info("Connected to Mongo");

        for( var name in collections){
            if(collections.hasOwnProperty(name)){
                // key the dict to the mongo collection
                db.collection(name,function(err,collection){
                    if(err){
                        error(`failed to connect to ${name} collection`)
                        throw err
                    } else {
                        info(`connected to ${name} collection`)
                        collections.name = collection
                    }
                })
            }
        }
        
    },function(err){

        error('Failed to connect to MongoClient')
        error(`Is Mongo running on ${url}`)
        throw err
    });

class DBAdapter {
    /**
     * Get returns the full document specified by _id from 'collectionName' 
     * @param  {String} collectionName The name of the collection to return. See collection dictionary
     * @param  {String} _id
     * @return {Object} The document specified by the id. If the document is not found, or multiple document are found,
     *                  the promise is rejected
     */
    get(collectionName, _id){
        return new Promise(function(resolve, reject){
            reject('method not implemented')
        })
    }
    
    /**
     * Create creates a new document from the json object 'object' in the specified collection
     * @param  {String} collectionName
     * @param  {Object} object the JSON object to insert in the collection
     * @return {String} The unique ID of the created document. Rejection upon errors
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Rejection occurs upon missing props? schema?
     */
    create(collectionName, object){
        return new Promise(function(resolve, reject){
            reject('method not implemented')
        })
    }

    /**
     * Updates a document specified by _id in the collectionName
     * Any properties present in diffObject overwrite the properties
     * currently present in the DB
     * @param  {any} collectionName
     * @param  {any} diffObject
     * @param  {any} _id
     * @return {Object} The document after the update. Rejection occurs upon errors. 
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Rejection occurs upon missing props? schema?
     */
    update(collectionName, _id, diffObject){
        return new Promise(function(resolve,reject){
            reject('method not implemented')
        })
    }
}

//return a singleton of the class on require
var dbAdapter = new DBAdapter()
module.exports = dbAdapter 