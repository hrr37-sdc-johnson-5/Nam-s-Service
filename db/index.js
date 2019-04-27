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
        if(album.length === 0){
            callback("Not found", null);
        } else {
            let track_ids = album[0].album.split(',');
            var tracks = await Promise.all(track_ids.map(async (track_id) => {
                const track = await db.any('SELECT * FROM tracks WHERE id = $1', [track_id]);
                return track[0];
            }));
            album[0].track_ids = track_ids;
            album[0]["album"] = tracks;
            callback(null, album);
        }
    }
    catch(e) {
       if(e){
           console.log(e);
           callback(e, null);
       }
    }
}

var createData = async (data, callback) => {
    try {
        let tracks = data.album;
        var track_entries = await Promise.all(tracks.map(async (track) => {
            const entry = await db.any('INSERT INTO tracks(track, url, lyrics) VALUES($1, $2, $3)RETURNING id, track, url, lyrics', [track.track, track.url, track.lyrics]);
            return entry[0];
        }));

        let album = track_entries.map((entry) => { return entry.id}).join(',');
        data.album = album;

        const album_entry = await db.any('INSERT INTO albums(artist, albumtitle, album, artistdescription) VALUES($1, $2, $3, $4)RETURNING id, artist, albumtitle, album, artistdescription', [data.artist, data.albumtitle, data.album, data.artistdescription]);
        let track_ids = album_entry[0].album;
        album_entry[0].album = track_entries;
        album_entry[0].track_ids = track_ids;
        callback(null, album_entry);
    }
    catch(e) {
       if(e){
           console.log(e);
           callback(e, null);
       }
    }
}


var updateData = async (id, data, callback) => {
    try {
        let tracks = data.album;
        var track_entries;
        if(tracks) {
            track_entries = await Promise.all(tracks.map(async (track) => {
                const entry = await db.any(`UPDATE tracks SET track = ($1), url = ($2), lyrics = ($3) WHERE id = ($4) RETURNING id, track, url, lyrics`, [track.track, track.url, track.lyrics, track.id]);
                return entry[0];
            }));
        }
        let track_ids = track_entries.map((track) => {
            return track.id;
        })

        const album_entry = await db.any('UPDATE albums SET artist = ($1), albumtitle =($2), album = ($3), artistdescription=($4) WHERE id=($5) RETURNING id, artist, albumtitle, album, artistdescription', [data.artist, data.albumtitle, track_ids, data.artistdescription, id]);
        album_entry[0].album = track_entries?track_entries:data.album;
        album_entry[0].track_ids = track_ids.join(',');
        callback(null, album_entry);
    }
    catch(e) {
       if(e){
           console.log(e);
           callback(e, null);
       }
    }
}

var deleteData = async(id, callback) => {
    try{
        let deleted = await db.result('DELETE FROM albums WHERE id = $1', [id], r => r.rowCount);
        if(deleted === 0){
            callback("Nothing to delete", null);
        } else {
            callback(null, id);
        }
    }
    catch(e) {
        if(e){
            console.log(e);
            callback(e, null);
        }
    }
}



module.exports.getData = getData;
module.exports.createData = createData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;



