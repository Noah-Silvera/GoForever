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

        this.setUpModels()

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
            con.on('error', (function(err){
                reject(err) 
                this.db = false
            }).bind(this));
            con.once('open', (function() {
                info('connected to Mongo with mongoose')
            	this.db = con
                resolve()
            }).bind(this));

            
        }).bind(this))

    }
    /**
     * Initialize the models to be used in all database transactions
     */
    setUpModels(){

        // https://stackoverflow.com/questions/19762430/make-all-fields-required-in-mongoose
        function requireAllSchemaFields(schema) {
            for (var i in schema.paths) {
                return schema
                var attribute = schema.paths[i]
                if (attribute.isRequired == undefined) {
                    attribute.required(true);
                }
            }
            return schema
        }

        var User = mongoose.model( 'User', requireAllSchemaFields(new Schema({
            username: String,
            email: String,
            passwordHash: String,
            rememberHash: String,
            createdAt: Date,
            updatedAt: Date,
            activationHash: String,
            activated: Boolean,
            activatedAt: Date,
            matchHistory: [String],               
            boardColor: String,
            boardSize: Number,
            }))
        )

        var Match = mongoose.model('Match', requireAllSchemaFields(new Schema({
            time: Date,
            userId: String,
            opponent: String,
            userHandicap: String,
            boardSize: Number,
            moveLog: [],
            whiteScore: Number,
            blackScore: Number,
            }))
        )

        var Sample = mongoose.model('Sample', requireAllSchemaFields(new Schema({
            name: String,
            matches: [String]
            }))
        )

    }
    
    
    /**
     * Get returns the full document specified by _id from 'collectionName' 
     * @param  {String} collectionName The name of the collection to return. See collection dictionary
     * @param  {String} _id
     * @return {Object} The document specified by the id. If the document is not found the promise is rejected
     */
    get(collectionName, searchCriteria){
        return new Promise((function(resolve, reject){

            if( !this.db ) reject('not ready to connect to collections')

            collectionName = collectionName.trim()

            // retrieve the appropiate model
            //var model = this.db.model(collectionName)
            var Model = mongoose.model(collectionName)
            Model.findOne(searchCriteria,  function(err, model) {
                if (err) reject('could not find')
                resolve(model)
            })
           
        }).bind(this))
    }

   
    /**
     * Create creates a new document from the json object 'object' in the specified collection
     * @param  {String} collectionName
     * @param  {Object} object the JSON object to insert in the collection
     * @return {String} The unique ID of the created document. Rejection upon errors and an object that
     *                  invalidates the schema
     */
    create(collectionName, object){
        return new Promise((function(resolve, reject){
            if (!this.db) reject('not ready to connect to collections')
                console.log(object);
                
            var Model = mongoose.model(collectionName)
            var newModel = new Model(object)
            newModel.save (function(err, user){
                console.log(object);
                
                if (err){
                    reject('new user object was not stored')
                } else{
                    resolve(user)
                }
            })
        }).bind(this))
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
    update(collectionName, searchCriteria, diffObject){
        return new Promise((function(resolve,reject){
            if( !this.db ) reject('not ready to connect to collections')
            var Model = mongoose.model(collectionName)
            Model.findByIdAndUpdate(searchCriteria, { $set: diffObject}, {new: true}, function(err, object) {
                if (err){
                    reject('object was not updated')
                } else{
                    resolve(object)
                }
            })
        }).bind(this))
    }
}

//return a singleton of the class on require
var dbAdapter = new DBAdapter()
dbAdapter.connect()
    .then(function(result){
        info('ready to work with db')
    })

module.exports = dbAdapter


