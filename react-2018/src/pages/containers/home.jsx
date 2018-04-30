import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HomeLayout from '../components/home-layout.jsx'
import Categories from '../../categories/components/categories.jsx'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <HomeLayout>
        <Categories categories={this.props.data.categories} />
      </HomeLayout>
    )
  }
}

Home.propTypes = {
}

export default Home;
