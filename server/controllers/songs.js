const Song = require('../models/songs');

exports.songs= function(req, res, next){

  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       Song.count({},function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
         Song.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size);
                var hasMore= (totalCount<=size*pageNo) ? false : true;
                response = {"error" : false,"per":size,"page":pageNo,"has_more":hasMore,"total_pages":totalPages,"songs" : data};
            }
            res.json(response);
         }).sort({'_id':-1});
       })

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

exports.editSong = function(req,res,next){

    const id= req.params.id;


    const title= req.body.title;
    const artist= req.body.artist;
    const genre= req.body.genre;
    const album= req.body.album;
    const albumImage= req.body.albumImage;
    const youtubeId= req.body.youtubeId;
    const lyrics= req.body.lyrics;
    const tab= req.body.tab;
    const creator = req.body._creator;

    if(title ==''||artist==''||genre==''||album==''||albumImage==''||youtubeId==''||lyrics==''||tab==''){
        return res.send({
            "error":"**All field required to fill in"
        })
    }

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


    Song.findByIdAndUpdate(id,song,function(err,song){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        res.send({
            "success":"**succesfully updated songs",
            "song":song
        })
    });
}

exports.deleteSong = function(req,res,next){

    const id = req.params.id;

    Song.findByIdAndDelete(id, function(err){
        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        res.send({
            "success":"**succesfully deleted songs",
        })
    });
}


exports.createdSongs= function(req,res,next){
    const user_id = req.params.userId;

    Song.find({_creator:user_id}, function(err, song){

        if(err){
            return res.send({ "error":"**Oopps..something went wrong, please try again"});
        }

        res.send(song.reverse());
    });
}