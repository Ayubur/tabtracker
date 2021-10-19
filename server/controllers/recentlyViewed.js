const User = require('../models/users');


exports.findAllViewedSongs = function(req,res,next){
    const user_id = req.params.id;

    User.findOne({_id:user_id})
        .populate('recentlyViewed')
        .exec(function(err,users){
            if(err){
                return res.send({ "error":"**Oopps..something went wrong, please try again"});
            }else{
                res.send(users.recentlyViewed.reverse());
            }
        });
}

exports.saveViewedSongs= function(req,res,next){
    const user_id = req.user._id;
    const song_id = req.params.id;

    User.findByIdAndUpdate(user_id,{$addToSet:{recentlyViewed:song_id}},function(err,user){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        return res.send({
            "success":"Successfully save viewed songs",
            user: user
        })
    })

}