

module.exports = {
  generateRandomData,
  generateRandomID
};

// Make sure to "npm install faker" first.
const faker = require('faker');


function generateRandomID (userContext, events, done) {
  const id = faker.random.number(9999999);
  userContext.vars.id = id;
  return done();
}


function generateRandomData (userContext, events, done) {
  // generate data with Faker:
  const artist =  faker.lorem.words(2);
  const albumtitle =  faker.lorem.words(2);
  const album =    [{ track:"one",   url:
  'https://s3.ap-south-1.amazonaws.com/namsmusicplayermediafiles/1+-+Calpionellidae+-+Remembering+Confidence.mp3',
 lyrics:
  'At adipisci esse nobis natus vero ipsa deserunt. Officiis molestias voluptas adipisci velit voluptas enim error qui. Et aut quia hic et. Et quos sint voluptatem numquam. Ad dolor voluptatem. Ut voluptas vel hic aut quam aut sunt.' },
{ track:"two",   url:
  'https://s3.ap-south-1.amazonaws.com/namsmusicplayermediafiles/1+-+Mardie+Cornejo+-+3D+Riff.mp3',
 lyrics:
  'Officiis qui est impedit ut. Illum cupiditate omnis. Officiis et numquam et sunt amet dolores rem repudiandae accusamus. Nisi reiciendis explicabo hic. Eaque temporibus repudiandae et. Sit omnis nihil doloremque non iure consequuntur dolores quisquam.' }];

  const artistdescription =  faker.lorem.paragraph();

  // add variables to virtual user's context:
  userContext.vars.artist = artist;
  userContext.vars.albumtitle = albumtitle;
  userContext.vars.album = album;
  userContext.vars.artistdescription = artistdescription;

  // continue with executing the scenario:
  return done();
}



