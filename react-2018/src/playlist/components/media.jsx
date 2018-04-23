import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './media.css'

class Media extends Component {

  constructor(props) {
    super(props)
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (event) => {
    console.log(event)
    console.log(this.props.title)
  }

  render() {

    const styles = {
      container: {
        fontSize: 14,
        width: 260,
      }
    }

    return(
      <div className='Media' onClick={this.handleClick}>
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