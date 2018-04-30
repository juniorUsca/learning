import React from 'react'

import Media from './media.jsx'
import FullScreen from './../../icons/components/full-screen.jsx'
import Pause from './../../icons/components/pause.jsx'
import Play from './../../icons/components/play.jsx'
import Volume from './../../icons/components/volume.jsx'

import './playlist.css'

function Playlist(props) {
  return (
    <div className='Playlist'>
      {/*
      <FullScreen size={50} color='red' />
      <Pause size={50} color='red' />
      <Play size={50} color='red' />
      <Volume size={50} color='red' />
      */}
      {
        props.playlist.map(item => {
          return <Media
            key={item.id}
            image={item.cover}
            {...item}
            handleClick={props.handleOpenModal}
            />
        })
      }
    </div>
  )
}

export default Playlist;