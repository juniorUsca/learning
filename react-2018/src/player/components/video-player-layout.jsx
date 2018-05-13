import React from 'react'

import './video-player-layout.css'

const VideoPlayerLayout = (props) => {
  return(
    <div
      className="VideoPlayerLayout"
      ref={props.setRef}
    >
      {props.children}
    </div>
  )
}

export default VideoPlayerLayout;
