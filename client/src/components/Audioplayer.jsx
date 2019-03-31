import React from 'react';

var Audioplayer = (props) => {
  return(
  <div>
        <audio  src={props.url} controls autoPlay/>
  </div>
  )
}

export default Audioplayer;