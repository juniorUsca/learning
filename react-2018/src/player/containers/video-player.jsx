import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout.jsx';
import Video from '../components/video.jsx'
import Title from '../components/title.jsx'
import PlayPause from '../components/play-pause.jsx'
import Timer from '../components/timer.jsx'
import VideoPlayerControls from '../components/video-player-controls.jsx'
import ProgressBar from '../components/progress-bar.jsx'
import Spinner from '../components/spinner.jsx'
import Volume from '../components/volume.jsx'
import FullScreen from '../components/full-screen.jsx'

import Utils from './../../utils/utils.jsx'

class VideoPlayer extends Component {

  state = {
    pause: false,
    duration: 0,
    currentTime: 0,
    loading: false,
    volume: 0.5,
    lastVolume: 0.5,
    muted: 0,
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
    this.video.volume = this.state.volume
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

  handleVolume = (event) => {
    this.video.volume = event.target.value
    this.setState({
      volume: this.video.volume,
      lastVolume: this.video.volume,
      muted: false,
    })
  }
  handleVolumeClick = (event) => {
    this.setState({
      muted: !this.state.muted,
    }, () => {
      this.video.volume = (this.state.muted) ? 0 : this.state.lastVolume
      this.setState({
        volume: this.video.volume,
      })
    })
  }

  handleFullScreenClick = (event) => {
    if(!document.webkitIsFullScreen) {
      this.player.webkitRequestFullscreen()
    } else {
      document.webkitExitFullscreen()
    }
  }

  setRefVideoPlayerLayout = (element) => {
    this.player = element
  }

  render() {
    return (
      <VideoPlayerLayout
        setRef={this.setRefVideoPlayerLayout}
      >
        <Title
          title={this.props.title}
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
          <Volume
            handleChange={this.handleVolume}
            value={this.state.volume}
            handleClick={this.handleVolumeClick}
          />
          <FullScreen
            handleClick={this.handleFullScreenClick}
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
          src={this.props.src}
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer;
