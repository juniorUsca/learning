import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <section name="Home">
        <h1>Home</h1>
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
