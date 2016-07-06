var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema

// // an object with the collection names as keys 
// // for easy access to available collections
// // the collections to connect too
// var collections = {
//     'sessions': null,
//     'matches': null,
//     'users' : null
// }


class DBAdapter {

    constructor(){

        // name in mongoDB
        this.dbName = 'GoForever'
        this.host = 'mongodb://localhost'
        this.port = '27017'
        this.url = `${this.host}:${this.port}/${this.dbName}`

        // since the database setup is async, cannot garuntee the database are set up before calling 
        // this is a flag to ensure that
        // this flag should be checked in any functions that call the DB
        this.db = false;
        
    }
    /**
     * Connects to the database and sets a flag to inform the module once it has connected
     * @return Promise that resolves upon connection
     */
    connect(){
        return new Promise((function(resolve,reject){

            // open a men mongoose connection
            mongoose.connect(this.url)

            var con = mongoose.connection;
            
            // watch for an update to this connection
            con.on('error', function(err){
                reject(err) 
                this.db = false
            });
            con.once('open', function() {
                info('connected to Mongo with mongoose')
            	this.db = con
                resolve(this.db)
            });

            
        }).bind(this))

    }
    
    
    /**
     * Get returns the full document specified by _id from 'collectionName' 
     * @param  {String} collectionName The name of the collection to return. See collection dictionary
     * @param  {String} _id
     * @return {Object} The document specified by the id. If the document is not found the promise is rejected
     */
    get(collectionName, _id){
        return new Promise(function(resolve, reject){

            if( !this.db ) reject('not ready to connect to collections')

            collectionName = collectionName.trim()

            reject('method not implemented')
           
        })
    }
    
    /**
     * Create creates a new document from the json object 'object' in the specified collection
     * @param  {String} collectionName
     * @param  {Object} object the JSON object to insert in the collection
     * @return {String} The unique ID of the created document. Rejection upon errors and an object that
     *                  invalidates the schema
     */
    create(collectionName, object){
        
        return new Promise(function(resolve, reject){
            if( !this.db ) reject('not ready to connect to collections')

            reject('method not implemented')
        })
    }

    /**
     * Updates a document specified by _id in the collectionName
     * Any properties present in diffObject overwrite the properties
     * currently present in the DB
     * @param  {String} collectionName
     * @param  {Object} diffObject
     * @param  {String} _id
     * @return {Object} The document after the update. Rejection occurs upon errors and an object that
     *                  invalidates the schema
     */
    update(collectionName, _id, diffObject){
        return new Promise(function(resolve,reject){
            if( !this.db ) reject('not ready to connect to collections')

            reject('method not implemented')
        })
    }
}

//return a singleton of the class on require
var dbAdapter = new DBAdapter()
dbAdapter.connect()
    .then(function(result){
        info('ready to work with db')
    })

module.exports = dbAdapter

