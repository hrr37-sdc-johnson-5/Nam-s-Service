import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SongList from './components/SongList.jsx'
import styled from 'styled-components';


const Wrapper = styled.section`
  background: #3858AD;
  color: #F8EAEB;
  width: 400px;
  height: 1000px;
`
const Links = styled.a`
  color: #6591E2;
  cursor: pointer;
  :hover {
    color: #E9D3B3;
  }
`

const VolDown = styled.button`
  ::before {
    background-image: url("https://cdn2.iconfinder.com/data/icons/media-controls-5/100/vol_down-512.png");
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    content:"";
  }

`;

const VolUp = styled.button`
  ::before {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg");
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    content:"";
  }

`;

const PlayButton = styled.button`
background: #fff;
border: 1px solid #d9d9d9;
border-radius: 10px;
cursor: pointer;
min-height: 50px;
min-width: 50px;
`
const PlaySymbol = styled.div`
background-image: url(${props => !props.playing? "https://ya-webdesign.com/images/png-video-play-button-9.png" : "http://www.newdesignfile.com/postpic/2015/10/pause-button-icon_248724.png"});
background-size: ${props => !props.playing? "35px 35px": " 20px 20px"};
display: inline-block;
width: ${props => !props.playing? "35px": "20px"};
height: ${props => !props.playing? "35px": "20px"};
content:"";
`

const Title = styled.h1`
  font: normal 2.5em ;
  margin: 10px
`

class Music extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentTrack: "",
    play: false,
    pause: true,
    album:[],
    artist: "",
    audio: new Audio(""),
    url: "",
    time: "0:00",
    intervalId: null,
    albumTitle:""
  }

  this.playtrack = this.playtrack.bind(this)
  this.get = this.get.bind(this)
  this.changeTrack = this.changeTrack.bind(this)
  this.volumeDown = this.volumeDown.bind(this)
  this.volumeUp = this.volumeUp.bind(this)
  this.currentTrackTime =this.currentTrackTime.bind(this)
}
componentDidMount(){
  this.get();
  var intervalId = setInterval(this.currentTrackTime, 1000);
  this.setState({intervalId: intervalId});
}
componentWillUnmount() {
  // use intervalId from the state to clear the interval
  clearInterval(this.state.intervalId);
}
currentTrackTime(){
  var songTime =(parseInt(((this.state.audio.currentTime/60)-(parseInt(this.state.audio.currentTime/60)))*60));
  var seconds = songTime < 10? "0"+ songTime: songTime

  this.setState({
    time: (parseInt(this.state.audio.currentTime/60))+":"+ seconds

  })
}

playtrack(){
  if (this.state.play === false) {
    this.setState({ play: true, pause: false })
    this.state.audio.play();
  } else {
    this.setState({ play: false, pause: true })
    this.state.audio.pause();
  }

}

volumeDown(){
    this.state.audio.volume -= .1
  }
volumeUp(){
    this.state.audio.volume += .1
  }

get(){
  $.get('/media/1', (data) => {
    this.setState({
      artist:data[0].artist,
      album: data[0].album,
      albumTitle: data[0].albumTitle,
      currentTrack: data[0].album[0].track,
      audio: new Audio(data[0].album[0].url),
      url:data[0].album[0].url,
      time: this.state.audio.currentTime,

    })
  })
}

changeTrack(e){
  this.state.audio.pause();
  this.setState({
    currentTrack: this.state.album[e.target.id].track,
    audio: new Audio(this.state.album[e.target.id].url),
    url:this.state.album[e.target.id].url
  })
  this.state.audio.pause();

}


render() {

return (
  <Wrapper>
    <Title>{this.state.albumTitle}<br></br>
      <div style = {{fontSize: "15px"}}>By <Links>{this.state.artist}</Links></div>
    </Title>
    <div> {this.state.currentTrack}   {this.state.time}/{(parseInt(this.state.audio.duration/60))+":"+
        (parseInt(((this.state.audio.duration/60)-(parseInt(this.state.audio.duration/60)))*60))}</div>
    <PlayButton><PlaySymbol onClick={this.playtrack} playing = {this.state.play}></PlaySymbol></PlayButton>
    <VolDown onClick={this.volumeDown}> </VolDown>
    <VolUp onClick={this.volumeUp}></VolUp><br></br>
    <SongList album = {this.state.album} changeTrack = {this.changeTrack}/>
  </Wrapper>
  );
}
}

ReactDOM.render(<Music />,document.getElementById('app'));

export default Music;

