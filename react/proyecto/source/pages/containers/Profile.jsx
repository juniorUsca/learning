import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
      user: {},
    };
  }

  async componentDidMount() {
    this.initialFetch()
  }

  async initialFetch() {
    const [user, posts] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);
    // console.log(user);

    this.setState({
      loading: false,
      posts,
      user,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <section name="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
      Profile of {this.state.user.name}</h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>

        {this.state.user.address && (
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {this.state.user.address.street}<br />
              {this.state.user.address.suite}<br />
              {this.state.user.address.city}<br />
              {this.state.user.address.zipcode}<br />
            </address>
          </fieldset>
        )}

        <section>
          {this.state.posts.map(
            post => <Post key={post.id} user={this.state.user} {...post} />,
          )}
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
}
Profile.defaultProps = {
  match: {
    params: {
      id: '1',
    },
  },
}

export default Profile;
