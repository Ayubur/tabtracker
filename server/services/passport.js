const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localOptions ={usernameField : 'email'};

const localLogin = new LocalStrategy(localOptions,function(email,password,done){

    User.findOne({email:email}, function(err,user){
        if(err){ return done(err); }
        if(!user){ return done(null, false); }

        user.comparePassword(password, function(err,isMatch){
            if(err){ return done(err); }
            if(!isMatch){ return done(null,false); }

            return done(null,user);
        });
    });
});

//setting up jwt options
const jwtOptins ={
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptins,function(payload,done){

    User.findById(payload.sub, function(err,user){

        if(err){
            return done(err, false);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
});

//use jwt strategy
passport.use(jwtLogin);
passport.use(localLogin);