import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './media.css'

class Media extends Component {

  constructor(props) {
    super(props)

    //this.state = {
      //author: props.author,
    //}
    // con es7 el estado puede estar fuera del constructor

    // this.handleClick = this.handleClick.bind(this)
    // evitamos esto con es7 con array functions q heredan el contexto de su padre
  }

  state = {
    author: this.props.author,
  }

  handleClick = (event) => {
    console.log(event)
    console.log(this.props.title)
    this.setState({
      author: 'hacked',
    })

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
          <p className='Media-author'>{this.state.author}</p>
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