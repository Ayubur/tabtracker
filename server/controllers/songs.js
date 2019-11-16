const Song = require('../models/songs');

exports.songs= function(req, res, next){

    Song.find({}, function(err, songs){

        if(err){
           return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }
        res.send(songs);
    });
}

exports.createSong= function(req,res,next){

    const title= req.body.title;
    const artist= req.body.artist;
    const genre= req.body.genre;
    const album= req.body.album;
    const albumImage= req.body.albumImage;
    const youtubeId= req.body.youtubeId;
    const lyrics= req.body.lyrics;
    const tab= req.body.tab;
    const creator = req.body.creator;

    const song={
        title:title,
        artist:artist,
        genre:genre,
        album:album,
        albumImage:albumImage,
        youtubeId:youtubeId,
        lyrics:lyrics,
        tab:tab,
        _creator: creator
    };

    const allFieldsFilledIn = Object.keys(song).every((key)=> !!song[key]);

    if(! allFieldsFilledIn){
        return res.send({
            "error":"**All field required to fill in"
        })
    }

    Song.create(song,function(err,song){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        res.send({
            "success":"**succesfully saved songs",
            "song":song
        })
    });

    
}

exports.viewSong = function(req,res,next){

    const id= req.params.id;

    Song.find({_id:id}, function(err, song){

        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        res.send(song);
    });
}