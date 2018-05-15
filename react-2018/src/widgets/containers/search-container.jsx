import React, { Component } from 'react';

import Search from '../components/search.jsx'

class SearchContainer extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.input.value, 'submit')
  }

  setInputRef = (element) => {
    this.input = element
    console.log(this.input, 'referenciandooo')
  }
  handleInputChange = (event) => {
    /*this.setState({
      value: event.target.value,
    })*/
    console.log(event.target.value, 'cambiado de')
    this.input.value = event.target.value.replace(/ /g,'-')
    console.log(this.input.value, 'cambiado a')
  }

  render() {
    return (
      <Search
        setRef={this.setInputRef}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleInputChange}
      />
    )
  }
}

export default SearchContainer;