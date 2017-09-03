import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostBody from '../../posts/containers/Post';
import Comment from '../../comments/components/Comment';
import Loading from '../../shared/components/Loading';

import api from '../../api';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post: {},
      user: {},
      comments: [],
    }
  }

  componentDidMount() {
    this.initialFetch()
  }

  async initialFetch() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.match.params.id),
      api.posts.getComments(this.props.match.params.id),
    ]);

    const user = await api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <section name="post">
        <PostBody
          user={this.state.user}
          comments={this.state.comments}
          {...this.state.post}
        />
        <section>
          {
            this.state.comments
              .map(comment => (
                <Comment key={comment.id} {...comment} />
              ))
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
}

Post.defaultProps = {
  match: {
    params: {
      id: '1',
    },
  },
}

export default Post;
