drop keyspace if exists media_player;
create keyspace media_player with replication = {'class':'SimpleStrategy','replication_factor':1};

use media_player;

CREATE TABLE albums (
    id INT primary key,
    artist varchar,
    albumTitle varchar,
    album varchar,
    artistDescription varchar
);

CREATE TABLE tracks (
      track_id INT primary key,
      url varchar,
      lyrics varchar,
      track varchar
);

COPY albums(artist, albumTitle, album, artistDescription, id) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/albums.csv' WITH HEADER = TRUE;
COPY tracks(track_id, url, lyrics, track) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/tracks.csv' WITH HEADER = TRUE;

