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
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  componentDidMount() {
    this.initialFetch()
  }

  async initialFetch() {
    if (!!this.props.user && !!this.props.comments) {
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
            <Link to={`/user/${this.props.user.id}`}>Perfil de {this.props.user.name}</Link>
            <br />
            <a href={`//${this.props.user.website}`} target="_blank" rel="nofollow">
              {this.props.user.name}
            </a>
            <span>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.length,
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
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object,
  ),

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
    comments: state.comments.filter(comment => comment.postId === props.id),
    user: state.users[props.userId],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
