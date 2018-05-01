import React, { Component } from 'react'
import RegularError from '../components/regular-error.jsx';

class HandleError extends Component {
  state = {
    handleError: false,
  }
  
  constructor(props) {
    super(props)
  }

  // enviar errores a sentry
  componentDidCatch(error, info) {
    this.setState({
      handleError: true,
    })
    console.log(error, info)
  }

  render() {
    if(this.state.handleError) {
      return(
        <RegularError />
      )
    }
    return(
      this.props.children
    )
  }
}

export default HandleError;
