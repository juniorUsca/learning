import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import api from '../../api';
import actions from '../../actions'

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      // obtenemos estos datos directamente del state
      // user: props.user || null,
      // comments: props.comments || null,
    };
  }

  componentDidMount() {
    this.initialFetch()
  }

  async initialFetch() {
    console.log('POST', this.props.user, this.props.comments)
    if (this.props.user && this.props.comments.size > 0) {
      return this.setState({ loading: false })
    }

    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ])


    // const [user, comments] = await Promise.all([
    //   !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
    //   !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
    // ]);

    return this.setState({
      loading: false,
      // user: user || this.state.user,
      // comments: comments || this.state.comments,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`}>
        <Link to={`/post/${this.props.id}`}>
          <h2>{this.props.title}</h2>
        </Link>
        <p>{this.props.body}</p>a
        {!this.state.loading && (
          <div>
            <Link to={`/user/${this.props.user.get('id')}`}>Perfil de {this.props.user.get('name')}</Link>
            <br />
            <a href={`//${this.props.user.get('website')}`} target="_blank" rel="nofollow">
              {this.props.user.get('name')}
            </a>
            <span>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.size,
                }}
              />
              <Link to={`/post/${this.props.id}`}>
                <FormattedMessage id="post.meta.readMore" />
              </Link>
            </span>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    website: PropTypes.string,

    size: PropTypes.number, // es una propiedad que tienen todos los objetos inmutables
    get: PropTypes.func, // funcion para obtener datos de inmutables
  }),
  // comments: PropTypes.objectOf( // cambiamos arrayOf a objectOf
  //   PropTypes.object,
  // ),
  comments: PropTypes.shape({ // cambiamos arrayOf a objectOf
    size: PropTypes.number, // es una propiedad que tienen todos los objetos inmutables
  }),

  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,

  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}
Post.defaultProps = {
  user: null,
  comments: null,
}

function mapStateToProps(state, props) {
  return {
    // comments: state.comments.filter(comment => comment.postId === props.id),
    // user: state.users[props.userId],
    comments: state
      .get('comments')
      .filter(comment => comment.get('postId') === props.id),
    user: state
      .get('users')
      .get(props.userId),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
