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
  font: 16px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-decoration: underline;
  :hover {
    color:#6591E2;
  }
`

const Lyrics = styled.span`
  margin: auto;
  font-size: 20px;
  float: right;
  text-align: center;
  color:#3858AD;
  cursor: pointer;

  ${Tracks}:hover & {
    color:#6591E2;
  }
  :hover{
    text-decoration: underline;
  }
`

class Track extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lyrics: false
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    console.log(this.state.lyrics)
    this.setState({
      lyrics: !this.state.lyrics
    })


  }

  render(){
    let showLyrics;

    if (this.state.lyrics) {
      showLyrics =  this.state.lyrics?  (<div style ={{margin: '15px 120px 15px 30px'}}>{this.props.song.lyrics}</div>) : null
    }

    return (
          <Tracks>
            <PlayButton onClick = {(e) => {this.props.changeTrack(e)}} id = {this.props.index}>
              <PlaySymbol onClick = {(e) => {this.props.changeTrack(e)}} id = {this.props.index}></PlaySymbol>
            </PlayButton> {this.props.index+1}. <Links onClick = {(e) => {this.props.changeTrack(e)}} id = {this.props.index}>{this.props.song.track}</Links>
            <Lyrics onClick={this.clickHandler}>Lyrics</Lyrics>
            {showLyrics}
          </Tracks>
    );
  }
}

export default Track;
