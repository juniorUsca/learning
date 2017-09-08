import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

import api from '../../api';

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
    const [user, comments] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
    ]);

    this.setState({
      loading: false,
      user: user || this.state.user,
      comments: comments || this.state.comments,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`}>
        <Link to={`/post/${this.props.id}`}>
          <h2>{this.props.title}</h2>
        </Link>
        <p>{this.props.body}</p>
        {!this.state.loading && (
          <div>
            <Link to={`/user/${this.state.user.id}`}>Perfil de {this.state.user.name}</Link>
            <a href={`//${this.state.user.website}`} target="_blank" rel="nofollow">
              {this.state.user.name}
            </a>
            <span>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.state.comments.length,
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
}
Post.defaultProps = {
  user: null,
  comments: null,
}

export default Post;