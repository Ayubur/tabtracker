const authentication= require('./controllers/authentication');
const songsController = require('./controllers/songs');
const bookmarkController = require('./controllers/bookmarks');
const ViewController = require('./controllers/recentlyViewed');
const fileController = require('./controllers/file');

const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});


module.exports = (app)=>{
    
    //authentication routes
    app.post("/api/signin",requireLogin,authentication.signin);
    app.post("/api/signup", authentication.signup);

    //songs routes
    app.get("/api/songs",songsController.songs);
    app.get("/api/songs/:id", songsController.viewSong);
    app.post("/api/songs/create",requireAuth,songsController.createSong);
    app.put("/api/songs/:id",requireAuth,songsController.editSong);
    app.delete("/api/songs/:id",requireAuth,songsController.deleteSong);

    //my created songs routes

    app.get("/api/:userId/mysongs",requireAuth,songsController.createdSongs);

    //bookmarks routes
    app.get("/api/:id/songs/bookmark",requireAuth,bookmarkController.findAllSongs);
    app.put("/api/songs/:id/bookmark",requireAuth,bookmarkController.saveBookmarks);
    app.post("/api/song/bookmarks/check",requireAuth,bookmarkController.checkBookmarks);
    app.put("/api/songs/:id/unbookmark",requireAuth,bookmarkController.deleteBookmarks);

    //recent view song routes
    app.get("/api/:id/songs/viewedSongs",requireAuth,ViewController.findAllViewedSongs);
    app.put("/api/songs/:id/viewedSong",requireAuth,ViewController.saveViewedSongs);

    //file upload 
    app.post("/imageUpload",fileController.upload);
    

}