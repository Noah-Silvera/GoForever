// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var User = require('./user');

module.exports = function(passport) {

    //
    // passport session setup
    //

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    //SIGNUP

    passport.use('signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            
        // checking to see if the user trying to login already exists
        User.findOne({ 'username' : username }, function(err, user) {
            
            // if there are any errors, return the error
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('errorMessage', 'Someone with that username has signed up'));
            } else {
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.username = username;
                newUser.email    = req.param('email');
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });
        
    }));


    // LOGIN

    passport.use('login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ "username" :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false);

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));
};