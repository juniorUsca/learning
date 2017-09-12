import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PostBody from '../../posts/containers/Post';
import Comment from '../../comments/components/Comment';
import Loading from '../../shared/components/Loading';

import actions from '../../actions'
// import api from '../../api';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // post: {},
      // user: {},
      // comments: [],
    }
  }

  componentDidMount() {
    this.initialFetch()
  }

  async initialFetch() {
    // const [
    //   post,
    //   comments,
    // ] = await Promise.all([
    //   api.posts.getSingle(this.props.match.params.id),
    //   api.posts.getComments(this.props.match.params.id),
    // ]);
    // const user = await api.users.getSingle(post.userId);

    if (!!this.props.post && !!this.props.user) {
      return this.setState({
        loading: false,
      })
    }
    await Promise.all([
      this.props.actions.loadPost(this.props.match.params.id),
      this.props.actions.loadCommentsForPost(this.props.match.params.id),
    ]);
    await this.props.actions.loadUser(
      this.props.post.get('userId'),
    )

    return this.setState({
      loading: false,
      // post,
      // user,
      // comments,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <section name="post">
        <PostBody
          user={this.props.user}
          comments={this.props.comments}
          {...this.props.post.toJS()}
        />
        <section>
          {
            this.props.comments
              .map(comment => (
                <Comment key={comment.get('id')} {...comment.toJS()} />
              ))
              .toArray()
          }
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),

  post: PropTypes.shape({
    get: PropTypes.func, // de redux
    toJS: PropTypes.funx, // de immutable
  }),
  user: PropTypes.shape({

  }),
  comments: PropTypes.shape({ // objeto de objetos (array)
    map: PropTypes.funx, // de immutable
  }),

  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}

Post.defaultProps = {
  match: {
    params: {
      id: '1',
    },
  },

  post: null,
  user: null,
  comments: null,
}

function mapStateToProps(state, props) {
  const res = {
    comments: state
      .get('comments')
      .filter(comment => comment.get('postId') === Number(props.match.params.id)),
    post: state
      .get('posts')
      .get('entities')
      .get(Number(props.match.params.id)),
  }
  res.user = state
    .get('users')
    .get(res.post ? res.post.userId : 1)
  return res
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
// export default Post;
