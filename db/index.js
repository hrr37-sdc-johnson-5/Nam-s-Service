const pgp = require('pg-promise')();
var dbDetails = require('../config.js');
let username = dbDetails.db.username;
let password = dbDetails.db.password;
let host = dbDetails.host;
var db = pgp(`postgres://${username}:${password}@${host}:5432/media_player`);

db.connect()
    .then(function (obj) {
      console.log("Connected")
        obj.done(); // success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });

var getData = async (id, callback) => {
    try {
        const album = await db.any('SELECT * FROM albums WHERE id = $1', [id]);
        let track_ids = album[0].album.split(',');
        var tracks = await Promise.all(track_ids.map(async (track_id) => {
            const track = await db.any('SELECT * FROM tracks WHERE track_id = $1', [track_id]);
            return track[0];
        }));
        album[0].track_ids = track_ids;
        album[0]["album"] = tracks;
        callback(null, album);
        // success
    }
    catch(e) {
       if(e){
           console.log(e);
           callback(e, null);
       }
    }
}


module.exports.getData = getData;



