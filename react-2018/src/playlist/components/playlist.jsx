import React from 'react'

import Media from './media.jsx'
import './playlist.css'

function Playlist(props) {
  const playlist = props.data.categories[0].playlist;
  console.log(props.data);
  return (
    <div className='Playlist'>
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