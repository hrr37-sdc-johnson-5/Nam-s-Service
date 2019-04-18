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


db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
});


module.exports = db;