import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import api from '../../api';

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
    console.log('constructor del home')
  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.props)

    this.setTitle()
    this.initialFetch()

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setTitle() {
    document.title = this.props.intl.formatMessage({
      id: 'title.home',
    }, {});
  }

  async initialFetch() {
    // const posts = await api.posts.getList(this.props.page);
    // this.props.dispatch(
    //   actions.setPosts(posts),
    // )
    await this.props.actions.postsNextPage()
    console.log('getted')
    // console.log('posts getted', posts);
    this.setState({
      loading: false,
    });
  }

  handleScroll() {
    console.log('scroll')
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
        // const posts = await api.posts.getList(this.props.page);
        // this.props.dispatch(
        //   actions.setPosts(posts),
        // )
        await this.props.actions.postsNextPage()
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
    return (
      <section name="Home" className={styl.section}>
        <FormattedMessage
          id="title.home"
          tagName="h1"
        />

        <section className={styles.list}>
          {
            this.props.posts
              .map( // map retorna un array inmutable
                post => <Post key={post.get('id')} {...post.toJS()} />,
              )
              .toArray() // convertimos a un array de JS
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
  // dispatch: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  // posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  // posts: PropTypes.objectOf(PropTypes.object).isRequired,
  posts: PropTypes.shape({ // posts es un objectof immutable
    map: PropTypes.func,
    size: PropTypes.number,
  }).isRequired,
  page: PropTypes.number.isRequired,

  intl: intlShape.isRequired,
}

Home.defaultProps = {
}

function mapStateToProps(state) {
  return {
    // posts: state.posts.entities,
    // page: state.posts.page,
    posts: state.get('posts').get('entities'),
    page: state.get('posts').get('page'),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Home));
