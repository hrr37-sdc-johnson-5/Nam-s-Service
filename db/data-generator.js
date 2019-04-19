var faker = require ('faker');
var fs = require('fs');
const { Parser } = require('json2csv');
var fields = ['artist', 'albumTitle', 'album', 'artistDescription'];
let count = 10;

var generateStr = () => {
  let str = [];
  for(var i = faker.random.number({min:0, max:9}); i<faker.random.number({min:9, max:16}); i++) {
    str.push(i);
  }
  return str.join(',');
}

var generateData = () => {
  let data = [];
  for(let i = 0; i<10; i++){
    data.push({
      id:i,
      artist: faker.random.words(2),
      albumTitle: faker.random.words(2),
      album: generateStr(),
      artistDescription: faker.lorem.paragraph()
    });
  }
  return data;
};

var createFile = () => {
  fs.writeFile(`./data/${count}data.json`, generateData(), 'utf8', ()=> {
    console.log(`${count}data.json`);
    count --;
    if(count > 0) {
      createFile();
    }
  });
};

//createFile();



var createCsvFile = () => {
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(generateData());
  fs.appendFile(`./data.csv`, csv, 'utf8', ()=> {
    console.log(`${count} done`);
    count --;
    if(count > 0) {
      createCsvFile();
    }
  });
};

createCsvFile();



