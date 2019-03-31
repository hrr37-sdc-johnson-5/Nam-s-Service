import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

const Button= styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Play = styled.button`
  border-top: 10px solid white;
  border-bottom: 10px solid white;
  border-left: 20px solid black;
  height: 0px;
`


class Music extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentTrack: "",
    play: false,
    pause: true,
    album:[],
    albumData: {},
    audio: new Audio(""),
    url: "",
    time: "0:00",
    intervalId: null
  }

  this.playtrack = this.playtrack.bind(this)
  this.pausetrack = this.pausetrack.bind(this)
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
this.setState({ play: true, pause: false })
  this.state.audio.play();
}

pausetrack(){
this.setState({ play: false, pause: true })
  this.state.audio.pause();
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
      albumData:data,
      album: data[0].album,
      currentTrack: data[0].album[0].track,
      audio: new Audio(data[0].album[0].url),
      url:data[0].album[0].url,
      time: this.state.audio.currentTime,

    })
  })
}

changeTrack(e){
  this.state.audio.pause();
  console.log(e.target.id)
  this.setState({
    currentTrack: this.state.album[e.target.id].track,
    audio: new Audio(this.state.album[e.target.id].url),
    url:this.state.album[e.target.id].url
  })
  this.state.audio.pause();

}



render() {

return (
  <div><i className="fa fa-play fa-2x" ></i>
    <Button onClick={this.volumeDown}>Volume down</Button>
    <Button onClick={this.volumeUp}>Volume up</Button>
    <div><Play onClick={this.playtrack}></Play> {this.state.currentTrack}   {this.state.time}/{(parseInt(this.state.audio.duration/60))+":"+
    (parseInt(((this.state.audio.duration/60)-(parseInt(this.state.audio.duration/60)))*60))}</div>
    <button onClick={this.pausetrack}>Pause</button>
    <button onClick={this.get}>Refresh</button>
    {this.state.album.map((song,index) => {
      return <div onClick = {(e) => {this.changeTrack(e)}} id = {index} >{index+1}.) {song.track}</div>
    })}
  </div>
  );
}
}

ReactDOM.render(<Music />,document.getElementById('app'));

module.exports = App;

