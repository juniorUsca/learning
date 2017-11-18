import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

// import api from '../../api';
import actions from '../../actions'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // posts: [],
      // user: {},
    };
  }

  componentDidMount() {
    this.setTitle()
    this.initialFetch()
  }

  setTitle() {
    if (this.props.user) document.title = this.props.user.get('name')
    else {
      document.title = this.props.intl.formatMessage({
        id: 'profile.title',
      }, {});
    }
  }

  async initialFetch() {
    // const [user, posts] = await Promise.all([
    //   api.users.getSingle(this.props.match.params.id),
    //   api.users.getPosts(this.props.match.params.id),
    // ]);
    // console.log(user);
    console.log(this.props)
    if (this.props.user) {
      console.log('existe usuario')
      this.setTitle()
      return this.setState({ loading: false })
    }
    console.log('cargand usuario y sus posts')
    await Promise.all([
      this.props.actions.loadUser(this.props.match.params.id),
      this.props.actions.loadUserPosts(this.props.match.params.id),
    ]);
    this.setTitle()

    return this.setState({
      loading: false,
      // posts,
      // user,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    const address = this.props.user.get('address')
    return (
      <section name="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              // name: this.state.user.name,
              name: this.props.user.get('name'),
            }}
          />
      Profile of {this.props.user.get('name')}</h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          <input type="email" value={this.props.user.get('email')} disabled />
        </fieldset>

        {this.props.user.get('address') && (
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {this.props.user.get('address').street}<br />
              {this.props.user.get('address').suite}<br />
              {this.props.user.get('address').city}<br />
              {this.props.user.get('address').zipcode}<br />
            </address>
          </fieldset>
        )}

        <section>
          {this.props.posts
            .map( // map retorna un array inmutable
              post => <Post key={post.get('id')} user={this.props.user} {...post.toJS()} />,
            )
            .toArray()
          }
        </section>

        <Link to="/">
          Go to home /
        </Link>
        <Link to="/random">
          Go to random
        </Link>
      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),

  user: PropTypes.shape({
    /* id: PropTypes.number,
    name: PropTypes.string,
    website: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      suite: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      get: PropTypes.func,
    }), */

    size: PropTypes.number, // es una propiedad que tienen todos los objetos inmutables
    get: PropTypes.func, // funcion para obtener datos de inmutables
  }),
  posts: PropTypes.shape({ // cambiamos arrayOf a objectOf
    map: PropTypes.func,
    size: PropTypes.number, // es una propiedad que tienen todos los objetos inmutables
  }),

  actions: PropTypes.objectOf(PropTypes.func).isRequired,

  intl: intlShape.isRequired,
}
Profile.defaultProps = {
  match: {
    params: {
      id: '1',
    },
  },

  user: null,
  posts: null,
}

// este state es de REDUX un state global
function mapStateToProps(state, props) {
  // console.log(mapStateToProps)
  // console.log(
  //   state
  //     .get('posts')
  //     .get('entities')
  //     .filter(post => post.get('userId') === Number(props.match.params.id))
  //     .toJS(),
  // )
  return {
    // comments: state.comments.filter(comment => comment.postId === props.id),
    // user: state.users[props.userId],
    posts: state
      .get('posts')
      .get('entities')
      .filter(post => post.get('userId') === Number(props.match.params.id)),
    user: state
      .get('users')
      .get(Number(props.match.params.id)),
  };
}
function mapDispatchToProps(dispatch, props) {
  console.log('mapDispatchToProps')
  console.log(props)
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Profile));
