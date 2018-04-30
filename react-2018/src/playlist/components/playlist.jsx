import React from 'react'

import Media from './media.jsx'
import FullScreen from './../../icons/components/full-screen.jsx'
import Pause from './../../icons/components/pause.jsx'
import Play from './../../icons/components/play.jsx'
import Volume from './../../icons/components/volume.jsx'

import './playlist.css'

function Playlist(props) {
  const playlist = props.data.categories[0].playlist;
  console.log(props.data);
  return (
    <div className='Playlist'>
      <FullScreen size={50} color='red' />
      <Pause size={50} color='red' />
      <Play size={50} color='red' />
      <Volume size={50} color='red' />
      {
        playlist.map(item => {
          return <Media
            key={item.id}
            image={item.cover}
            {...item}
            />
        })
      }
    </div>
  )
}

export default Playlist;