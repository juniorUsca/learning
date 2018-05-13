import React from 'react'
import VolumeIcon from '../../icons/components/volume.jsx'

import './volume.css'

const Volume = (props) => {
  return(
    <div className='Volume'>
      <button
        onClick={props.handleClick}
        >
        <VolumeIcon
          size="25"
          color="white"
        />
      </button>
      <div className="Volume-range">
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={props.handleChange}
          value={props.value}
        />
      </div>
    </div>
  )
}

export default Volume;
