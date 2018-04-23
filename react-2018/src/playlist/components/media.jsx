import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './media.css'

class Media extends Component {
  render() {

    const styles = {
      container: {
        fontSize: 14,
        width: 260,
      }
    }

    return(
      <div className='Media'>
        <div className='Media-cover'>
          <img
            src = {this.props.image}
            alt = ''
            width = {260}
            height = {160}
            className='Media-image'
          />
          <h3 className='Media-title'>{this.props.title}</h3>
          <p className='Media-author'>{this.props.author}</p>
        </div>
      </div>
    )
  }
}

Media.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['video', 'audio']).isRequired,
}

export default Media