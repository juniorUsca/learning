import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import api from '../../api';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import styles from './Page.css';
import styl from './Page.styl';

import actions from '../../actions'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch()

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await api.posts.getList(this.props.page);

    this.props.dispatch(
      actions.setPosts(posts),
    )
    // console.log('posts getted', posts);
    this.setState({
      loading: false,
    });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    // const fullHeight = document.body.clientHeight;
    const fullHeight = document.documentElement.clientHeight;

    // console.log(scrolled, viewportHeight, fullHeight);

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }
    // TODO: agregar un if para que no haya carga mas alla de la pagina 10

    return this.setState({
      loading: true,
    }, async () => {
      try {
        const posts = await api.posts.getList(this.props.page);
        this.props.dispatch(
          actions.setPosts(posts),
        )
        this.setState({
          loading: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    // console.log(this.props)
    return (
      <section name="Home" className={styl.section}>
        <FormattedMessage
          id="title.home"
          tagName="h1"
        />

        <section className={styles.list}>
          {
            this.props.posts.map(
              post => <Post key={post.id} {...post} />,
            )
          }
          {this.state.loading && (
            <Loading />
          )}
        </section>

        <Link to="/post/1">
          Go to Post
        </Link>
        <Link to="/user/1">
          Go to Profile User
        </Link>
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
}

Home.defaultProps = {
}

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

/*
 * function mapDispatchToProps(dispatch, props) {
 *   return {
 *     dipatch,
 *   };
 * }
 */

export default connect(mapStateToProps)(Home);
