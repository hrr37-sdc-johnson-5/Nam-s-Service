import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Audioplayer from './Audioplayer.jsx';

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
    console.log(data)
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
  <div>
    <button onClick={this.volumeDown}>Volume down</button>
    <button onClick={this.volumeUp}>Volume up</button>
    <div>{this.state.currentTrack}   {this.state.time}/{(parseInt(this.state.audio.duration/60))+":"+
    (parseInt(((this.state.audio.duration/60)-(parseInt(this.state.audio.duration/60)))*60))}</div>
    <button onClick={this.playtrack}>Play</button>
    <button onClick={this.pausetrack}>Pause</button>
    <button onClick={this.get}>Refresh</button>
    {this.state.album.map((song,index) => {
      return <div onClick = {(e) => {this.changeTrack(e)}} id = {index} >{index+1}.) {song.track}</div>
    })}
  </div>
  );
}
}

ReactDOM.render(
<Music />,
document.getElementById('app')
);
// ReactDOM.render(<audio src = "http://streaming.tdiradio.com:8000/house.mp3">woo</audio>, document.getElementById('app'));