import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HomeLayout from '../components/home-layout.jsx'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <HomeLayout />
    )
  }
}

Home.propTypes = {
}

export default Home;
