var fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter();
var tracks = require('./tracks.js');


var generateTracks = () => {
  console.time('timing tracks');

  writer.pipe(fs.createWriteStream('tracks.csv'))
  for(let i = 0; i<tracks.length; i++){
    writer.write(tracks[i]);
  }
  writer.end();
  console.timeEnd('timing tracks');
}

module.exports = generateTracks;