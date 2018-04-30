import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HomeLayout from '../components/home-layout.jsx'
import Categories from '../../categories/components/categories.jsx'
import Related from '../../related/components/related.jsx'
import ModalContainer from '../../widgets/containers/modal-container.jsx'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <HomeLayout>
        <Related />
        <Categories categories={this.props.data.categories} />
        <ModalContainer>
          <h1>esto es un portal</h1>
        </ModalContainer>
      </HomeLayout>
    )
  }
}

Home.propTypes = {
}

export default Home;
