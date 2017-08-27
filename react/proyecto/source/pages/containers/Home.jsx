import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api.js';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';

class Home extends Component {
  constructor( props ){
    super(props);
    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };
  }
  async componentDidMount() {
    const posts = await api.posts.getList( this.state.page );
    console.log("posts getted", posts);
    this.setState({
      posts, // equivale a posts:posts,
      page: this.state.page+1,
      loading: false,
    });
  }
  render() {
    return (
      <section name="Home">
        <h1>Home</h1>

        <section>
          {this.state.loading && (
            <Loading />
          )}
          {
            this.state.posts.map(
              post => <Post key={post.id} {...post} />
            )
          }
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

export default Home;
