import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout.jsx';

class VideoPlayer extends Component {
  render() {
    return (
      <VideoPlayerLayout>
        <video
          src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
          autoPlay
          controls
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer;
