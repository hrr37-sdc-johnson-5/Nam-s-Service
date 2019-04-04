import React from 'react';
import styled from 'styled-components';

const Tracks = styled.div`
  padding: 10px;

`
const PlayButton = styled.button`
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  cursor: pointer;
  height: 20px;
  width: 20px;
  padding: 0;
  line-height: 0;
`
const PlaySymbol = styled.div`
  background-image: url("https://ya-webdesign.com/images/png-video-play-button-9.png");
  background-size: 15px;
  background-position: center;
  display: inline-block;
  width: 14px;
  height:  14px;
  content:"";
`
const Links = styled.a`
  color: #E9D3B3;
  cursor: pointer;
  // font-variant: petite-caps;
  font: 20px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-decoration: underline;
  :hover {
    color:#6591E2;
  }
`

const SongList = (props) => {
  return (
    <div>
      {props.album.map((song,index) => {
        return (
        <Tracks>
          <PlayButton onClick = {(e) => {props.changeTrack(e)}} id = {index}>
            <PlaySymbol onClick = {(e) => {props.changeTrack(e)}} id = {index}></PlaySymbol>
          </PlayButton> {index+1}. <Links onClick = {(e) => {props.changeTrack(e)}} id = {index}>{song.track}</Links>
        </Tracks>
        )
      })}
    </div>
  )
}

export default SongList;
