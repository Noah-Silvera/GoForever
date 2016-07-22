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
        this.host = 'mongodb://roberts.seng.uvic.ca'
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
                var attribute = schema.paths[i]
                if (attribute.isRequired == undefined && attribute.instance != 'Array') {
                    attribute.required(true);
                }
            }
            return schema
        }


        var Match = mongoose.model('Match', requireAllSchemaFields(new Schema({
            time: Date,
            userId: String,
            opponent: String,
            userHandicap: String,
            boardSize: Number,
            moveLog: [],
            whiteScore: Number,
            blackScore: Number,
            style: String,
            userColour: String,
            }))
        )

        var Sample = mongoose.model('Sample', requireAllSchemaFields(new Schema({
            name: String,
            matches: [String]
            }))
        )

        var Session = mongoose.model('Session', requireAllSchemaFields(new Schema({
            }))
        )
        

        var User = require('./config/user')
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

            if(searchCriteria._id){
                searchCriteria._id = mongoose.mongo.ObjectId(searchCriteria._id);
            }

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

            collectionName = collectionName.trim()
                
            var Model = mongoose.model(collectionName)
            var newModel = new Model(object)
            newModel.save (function(err, data){
                if (err){
                    reject(`new ${collectionName} object was not stored\nErr:${err} `)
                } else{
                    resolve(data._id)
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

            collectionName = collectionName.trim()

            if(searchCriteria._id){
                searchCriteria._id = mongoose.mongo.ObjectId(searchCriteria._id);
            }
            
            var Model = mongoose.model(collectionName)
            Model.findByIdAndUpdate(searchCriteria, { $set: diffObject}, {new: true}, function(err, object) {
                if (err){
                    error('object was not update')
                    reject(err)
                } else{
                    resolve(object)
                }
            })
        }).bind(this))
    }

    push(_id, match){
        return new Promise((function(resolve,reject){
            if( !this.db ) reject('not ready to connect to collections')

            _id = mongoose.mongo.ObjectId(_id);
            
            var Model = mongoose.model("User")
            Model.update({"_id": _id}, {$push: {matches: match}}, {new: true}, function(err, object) {
                if (err){
                    error('object was not update')
                    reject(err)
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


