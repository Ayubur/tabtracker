const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const saltRounds=10;

//Define our model
const userSchema = new Schema({
    name:{
        type:String,
        lowercase: true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save', function (next) { 

    const user =this;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        });
    });
 });

 userSchema.methods.comparePassword= function(candidatePassword, callback){

    bcrypt.compare(candidatePassword,this.password, function(err,isMatch){

        if(err){
            return callback(err);
        }
        callback(null,isMatch);
    });
 }

//Define our model class

const ModelClass = mongoose.model('users',userSchema);


// Export the model class
module.exports = ModelClass

