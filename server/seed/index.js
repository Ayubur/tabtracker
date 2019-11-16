
const songs = require('./songs.json');
const users = require('./users.json');

const UserModel = require('../models/users');
const SongsModel = require('../models/songs');

require('../connection');


songs.map((song)=>{
    const newsong = new SongsModel(song);
    newsong.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Song seeding successfull");
        }
    });
});

users.map((user)=>{
    const newuser = new UserModel(user);

    newuser.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("User seeding successfull");
        }
    });
});



