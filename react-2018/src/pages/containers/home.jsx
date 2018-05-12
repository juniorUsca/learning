import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HomeLayout from '../components/home-layout.jsx'
import Categories from '../../categories/components/categories.jsx'
import Related from '../../related/components/related.jsx'
import ModalContainer from '../../widgets/containers/modal-container.jsx'
import Modal from '../../widgets/components/modal.jsx'
import HandleError from '../../error/containers/handle-error.jsx'
import VideoPlayer from '../../player/containers/video-player.jsx'

class Home extends Component {
  state = {
    modalVisible: false,
  }
  
  constructor(props) {
    super(props)
  }

  handleOpenModal = (event) => {
    this.setState({
      modalVisible: true,
    })
  }
  handleModalCloseClick = (event) => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    return(
      <HandleError>
        <HomeLayout>
          <Related />
          <VideoPlayer
            autoplay
          />
          <Categories
            categories={this.props.data.categories}
            handleOpenModal={this.handleOpenModal}
          />
          {
            this.state.modalVisible &&
            <ModalContainer>
              <Modal
                handleClick={this.handleModalCloseClick}
                >
                <h1>esto es un portal</h1>
              </Modal>
            </ModalContainer>
          }
        </HomeLayout>
      </HandleError>
    )
  }
}

Home.propTypes = {
}

export default Home;
