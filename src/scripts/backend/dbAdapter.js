var MongoClient = require('mongodb').MongoClient;

// set up mongo
var dbName = 'GoForever'
var url = 'mongodb://localhost:27017/' + dbName;

// an object with the collection names as keys 
// for easy access to available collections

var collections = {
    'sessions': null,
    'matches': null,
    'users' : null
}


MongoClient.connect(url)
    .then(function(db){
        info("Connected to Mongo");

        for( var name in collections){
            if(collections.hasOwnProperty(name)){
                // key the dict to the mongo collection
                collections.name = db.collection(name)
                info(`connected to ${name} collection`)
            }
        }
        
    },function(err){
        throw err
    });

module.exports = {
    /**
     * Get returns the full document specified by _id from 'collectionName' 
     * @param  {String} collectionName The name of the collection to return. See collection dictionary
     * @param  {String} _id
     */
    'get': function get(collectionName, _id){
        return new Promise(function(resolve, reject){
            reject('method not implemented')
        })
    },
    
    /**
     * Create creates a new document from the json object 'object' in the specified collection
     * @param  {String} collectionName
     * @param  {Object} object the JSON object to insert in the collection
     */
    'create': function create(collectionName, object){
        return new Promise(function(resolve, reject){
            reject('method not implemented')
        })
    },
    
    /**
     * Updates a document specified by _id in the collectionName
     * Any properties present in diffObject overwrite the properties
     * currently present in the DB
     * @param  {any} collectionName
     * @param  {any} diffObject
     * @param  {any} _id
     */
    'update': function update(collectionName, _id, diffObject){
        return new Promise(function(resolve,reject){
            reject('method not implemented')
        })
    }
}