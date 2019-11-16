const authentication= require('./controllers/authentication');
const songsController = require('./controllers/songs');
const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});


module.exports = (app)=>{
    
    app.get("/",requireAuth, function(req,res){
        res.send({"hi":"there"});
    });

    //authentication routes
    app.post('/api/signin',requireLogin,authentication.signin);
    app.post("/api/signup", authentication.signup);

    //songs routes
    app.get("/api/songs",songsController.songs);
    app.get("/api/song/:id", songsController.viewSong);
    app.post("/api/songs/create",songsController.createSong);

}