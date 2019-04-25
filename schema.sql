drop database if exists media_player;
create database media_player;
\connect media_player;

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
      lyrics varchar
);

\COPY albums(artist, albumTitle, album, artistDescription, id) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/albums.csv' DELIMITER ',' CSV HEADER;
\COPY tracks(track_id, url, lyrics) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/tracks.csv' DELIMITER ',' CSV HEADER;

