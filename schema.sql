drop database if exists media_player;
create database media_player;
\connect media_player;

CREATE TABLE albums (
    id SERIAL primary key,
    artist varchar,
    albumTitle varchar,
    album varchar,
    artistDescription varchar
);

CREATE TABLE tracks (
      track varchar,
      id SERIAL primary key,
      url varchar,
      lyrics varchar
);

\COPY albums(artist, albumTitle, album, artistDescription) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/albums.csv' DELIMITER ',' CSV HEADER;
\COPY tracks(track, url, lyrics) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/tracks.csv' DELIMITER ',' CSV HEADER;

