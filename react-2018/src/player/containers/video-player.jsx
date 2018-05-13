import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout.jsx';
import Video from '../components/video.jsx'
import Title from '../components/title.jsx'
import PlayPause from '../components/play-pause.jsx'
import Timer from '../components/timer.jsx'
import VideoPlayerControls from '../components/video-player-controls.jsx'

import Utils from './../../utils/utils.jsx'

class VideoPlayer extends Component {

  state = {
    pause: false,
    duration: Utils.formattedTime(0),
    currentTime: Utils.formattedTime(0),
  }

  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause,
    })
  }

  componentDidMount = () => {
    this.setState({
      pause: !this.props.autoplay,
    })
  }

  handleLoadedMetadata = (event) => {
    this.video = event.target
    this.setState({
      duration: Utils.formattedTime(this.video.duration),
    })
  }

  handleTimeUpdate = (event) => {
    this.setState({
      currentTime: Utils.formattedTime(this.video.currentTime),
    })
  }

  render() {
    return (
      <VideoPlayerLayout>
        <Title
          title='Esto es un video!!'
        />
        <VideoPlayerControls>
          <PlayPause
            pause={this.state.pause}
            handleClick={this.togglePlay}
          />
          <Timer
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
        </VideoPlayerControls>
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          src='http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer;
