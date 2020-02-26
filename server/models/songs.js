const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    album:{
        type:String,
        required:true
    },
    albumImage:{
        type:String,
        required:true
    },
    youtubeId:{
        type:String,
        required:true
    },
    lyrics:{
        type:String,
        required:true
    },
    tab:{
        type:String,
        required:true
    },
    _creator:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:{
        type:String,
        default: new Date()
    }

});

//Defining song model class
const ModelClass = mongoose.model('songs',songSchema);

module.exports= ModelClass