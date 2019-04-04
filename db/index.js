var mongoose = require ('mongoose');
var faker = require ('faker');

mongoose.connect('mongodb://localhost:27017/media',{ useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED')
});

let albumSchema = mongoose.Schema({
  id: Number,
  artist: String,
  albumTitle: String,
  album: Array, //urls
  artistDescription: String,
  coverArt: String
});

let Album =mongoose.model('Albums', albumSchema);

const seedDB = () => {
  let data = new Album({
    id:1,
    artist: "DerAnaM",
    albumTitle: 'Fancy Electric Cows ',
    album: [
      {track: "I know that song", url: "https://t4.bcbits.com/stream/aa6994e3bf7d69e603d5591a87ae0b6b/mp3-128/1451147182?p=0&ts=1554496726&t=2e14a8a610c4390787c5fcf5feb0416874bc17ba&token=1554496726_792d09f4c1bf1cebd1b904d2f9667ff65e62c1b5"},
      {track: "Emo phase", url: "https://t4.bcbits.com/stream/b8973e3485e07a46b062a7fe28fc21d0/mp3-128/2707041858?p=0&ts=1554496726&t=892d9ddabe922ac845c06d7eee07232d0050c808&token=1554496726_5d104e578833869bc86b6ffde97b4507f6dc5863"},
      {track: "Rack Heactor", url: "https://t4.bcbits.com/stream/4ee5936410f3b7698e1c9704aa378177/mp3-128/3490725998?p=0&ts=1554496726&t=b3b266bc1b6f2386c24f5e41b1da34a48eb1ed52&token=1554496726_05450ff97dc2235acb139ef6fce5c45f9d6514f9"},
      {track: "Hulu and rave", url: "http://streaming.tdiradio.com:8000/house.mp3"},
      {track: "Team Amy is lit", url:"https://t4.bcbits.com/stream/433f368c059111443bb91eeb4fc1ef41/mp3-128/1446101469?p=0&ts=1554496886&t=7ce79b87bfdf5eba517c1ba971d2548ddf8ac062&token=1554496886_1006bc3b47a063ab69bd5c5c98865a703e1eb1e0"}
    ],
    artistDescription: faker.lorem.paragraph(),
    coverArt: faker.image.imageUrl()
  })
  data.save((err)=>{
    if (err) return handleError(err)
  });

  for (let i = 2; i < 52; i++) {
    let data = new Album({
      id: i,
      artist: faker.random.words(2),
      albumTitle: faker.random.words(2),
      album:
        [
          {track: faker.random.words(4)},
          {track: faker.random.words(2)},
          {track: faker.random.words(3)},
          {track: faker.random.words(5)}
        ],
      artistDescription: faker.lorem.paragraph(),
      coverArt: faker.image.imageUrl()
    })
    data.save((err)=>{
      if (err) return handleError(err)
    });
  }
}

const getData = (id, callback) => {
  Album.find({'id': id}, (err,data)=> {
    if (err) {
      console.error(err);
    }
    callback(data)
  })
}

module.exports.seedDB = seedDB;
module.exports.getData = getData;