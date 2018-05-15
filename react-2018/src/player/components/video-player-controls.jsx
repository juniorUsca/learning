import React from 'react'

import './video-player-controls.css'

const VideoPlayerControls = (props) => {
  return(
    <div className="VideoPlayerControls">
      {props.children}
    </div>
  )
}

export default VideoPlayerControls;
