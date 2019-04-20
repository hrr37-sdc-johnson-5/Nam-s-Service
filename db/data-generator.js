var faker = require ('faker');
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter();
var generateTracks = require('./tracks-generator.js');

var generateStr = () => {
  let str = [];
  for(var i = faker.random.number({min:0, max:9}); i<faker.random.number({min:9, max:16}); i++) {
    str.push(i);
  }
  return str.join(',');
}

var generateAlbums = () => {
  console.time('timing seed');

  writer.pipe(fs.createWriteStream('albums.csv'))
  for(let i = 0; i<1000000; i++){
    var data = {
      id:i,
      artist: faker.random.words(2),
      albumTitle: faker.random.words(2),
      album: generateStr(),
      artistDescription: faker.lorem.paragraph()
    };
    writer.write(data);
  }
  writer.end();
  console.timeEnd('timing seed');
}

generateAlbums();
generateTracks();