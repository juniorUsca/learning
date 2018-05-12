import React from 'react'
import Play from '../../icons/components/play.jsx'
import Pause from '../../icons/components/pause.jsx'

import './play-pause.css'

const PlayPause = (props) => {
  return(
    <div className='PlayPause'>
      {
        props.pause ?
          <button
            onClick={props.handleClick}
          >
            <Play size="25" color="white" />
          </button>
        :
          <button
            onClick={props.handleClick}
          >
            <Pause size="25" color="white" />
          </button>
      }
    </div>
  )
}

export default PlayPause;
