drop database if exists media_player;
create database media_player;
\connect media_player;

CREATE TABLE albums (
    id INT,
    artist varchar(100),
    albumTitle varchar(100),
    album varchar(100),
    artistDescription varchar(500)
);

CREATE TABLE tracks (
      track_id INT,
      url varchar(100),
      lyrics varchar(500)
);

\COPY albums(artist, albumTitle, album, artistDescription, id) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/albums.csv' DELIMITER ',' CSV HEADER;
\COPY tracks(track_id, url, lyrics) FROM '/Users/druthipolisetty/Documents/Hack Reactor/systems-design-phase/Nam-s-Service/tracks.csv' DELIMITER ',' CSV HEADER;

