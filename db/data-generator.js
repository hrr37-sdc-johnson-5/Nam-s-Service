var faker = require ('faker');
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter();
var generateTracks = require('./tracks-generator.js');
let id = 0;

var getData = () => {
  let str = [0, 1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 , 14, 15];
  return   {
    artist: faker.lorem.words(2),
    albumTitle: faker.lorem.words(2),
    album:  str.slice(Math.floor(Math.random() * 15)),
    artistDescription: faker.lorem.paragraph()
  };
};

var generateAlbumsInChunks = () => {
  if(id < 10000000){
    var data = getData();
    id++;
    writer.write(data, () => {
      generateAlbumsInChunks();
    });
  }else{
    console.timeEnd('timing seed');
    writer.end();
  }
}

var generateAlbums = () => {
  console.time('timing seed');
  writer.pipe(fs.createWriteStream(`albums.csv`))
  generateAlbumsInChunks();
}

generateAlbums();
generateTracks();
