const User = require('../models/users');
const Song=require('../models/songs');


exports.findAllSongs = function(req,res,next){
    const user_id = req.params.id;

    User.findOne({_id:user_id})
        .populate('bookmarkedSongs')
        .exec(function(err,users){
            if(err){
                return res.send({ "error":"**Oopps..something went wrong, please try again"});
            }else{
                res.send(users.bookmarkedSongs);
            }
        });
}

exports.saveBookmarks= function(req,res,next){
    const user_id = req.body.userId;
    const song_id = req.params.id;

    User.findByIdAndUpdate(user_id,{$push:{bookmarkedSongs:song_id}},function(err,user){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        return res.send({
            "success":"Successfully bookmarked songs",
            user: user
        })
    })

}

exports.checkBookmarks= function(req,res,next){
    const userId = req.body.user_id;
    const songId = req.body.song_id;

    User.findById(userId, function(err,user){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        var isInArray = user.bookmarkedSongs.some(function (songs) {
            return songs.equals(songId);
        });

       return  res.send({
            "match":isInArray
        })

    })
}

exports.deleteBookmarks= function(req,res,next){
    const user_id = req.body.userId;
    const song_id = req.params.id;

    User.findByIdAndUpdate(user_id,{$pull:{bookmarkedSongs:song_id}},function(err,user){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        return res.send({
            "success":"Successfully unbookmarked song",
        })
    })
}