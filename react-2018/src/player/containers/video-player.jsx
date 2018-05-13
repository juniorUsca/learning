import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout.jsx';
import Video from '../components/video.jsx'
import Title from '../components/title.jsx'
import PlayPause from '../components/play-pause.jsx'
import Timer from '../components/timer.jsx'
import VideoPlayerControls from '../components/video-player-controls.jsx'
import ProgressBar from '../components/progress-bar.jsx'
import Spinner from '../components/spinner.jsx'

import Utils from './../../utils/utils.jsx'

class VideoPlayer extends Component {

  state = {
    pause: false,
    duration: 0,
    currentTime: 0,
    loading: false,
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
      duration: this.video.duration,
    })
  }

  handleTimeUpdate = (event) => {
    this.setState({
      currentTime: this.video.currentTime,
    })
  }

  handleProgressChange = (event) => {
    this.video.currentTime = event.target.value
  }

  handleSeeking = (event) => {
    this.setState({
      loading: true,
    })
    this.togglePlay()
  }

  handleSeeked = (event) => {
    this.setState({
      loading: false,
    })
    this.togglePlay()
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
            duration={Utils.formattedTime(this.state.duration)}
            currentTime={Utils.formattedTime(this.state.currentTime)}
          />
          <ProgressBar
            duration={this.state.duration}
            value={this.state.currentTime}
            handleChange={this.handleProgressChange}
          />
        </VideoPlayerControls>
        <Spinner
          active={this.state.loading}
        />
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          src='http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer;
