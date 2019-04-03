import React from 'react';
import styled from 'styled-components';

const Tracks = styled.div`
  padding: 5px;
`
const PlayButton = styled.button`
background: #fff;
border: 1px solid #d9d9d9;
border-radius: 5px;
cursor: pointer;
min-height: 5px;
min-width: 5px;
`
const PlaySymbol = styled.div`
background-image: url("https://ya-webdesign.com/images/png-video-play-button-9.png");
background-size: 12px 12px;
display: inline-block;
width: 12px;
height:  12px;
content:"";
`
const Links = styled.a`
  color: #6591E2;
  cursor: pointer;
  :hover {
    color: #E9D3B3;
  }
`

const SongList = (props) => {
  return (
    <div>
      {props.album.map((song,index) => {
        return <Tracks onClick = {(e) => {props.changeTrack(e)}} id = {index} > <PlayButton onClick = {(e) => {props.changeTrack(e)}} id = {index}><PlaySymbol onClick = {(e) => {props.changeTrack(e)}} id = {index}></PlaySymbol></PlayButton> {index+1}. <Links>{song.track}</Links></Tracks>
      })}
    </div>
  )
}

export default SongList;
