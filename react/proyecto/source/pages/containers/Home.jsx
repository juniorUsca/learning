import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

import api from '../../api';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import styles from './Page.css';
import styl from './Page.styl';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch()

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await api.posts.getList(this.state.page);
    // console.log('posts getted', posts);
    this.setState({
      posts, // equivale a posts:posts,
      page: this.state.page + 1,
      loading: false,
    });
  }

  handleScroll() {
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
        const posts = await api.posts.getList(this.state.page);
        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
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
            this.state.posts.map(
              post => <Post key={post.id} {...post} />,
            )
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

export default Home;
