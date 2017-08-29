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

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    const posts = await api.posts.getList( this.state.page );
    console.log("posts getted", posts);
    this.setState({
      posts, // equivale a posts:posts,
      page: this.state.page+1,
      loading: false,
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event){
    if( this.state.loading ) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    // const fullHeight = document.body.clientHeight;
    const fullHeight = document.documentElement.clientHeight;

    console.log( scrolled, viewportHeight, fullHeight );

    if( !(scrolled + viewportHeight + 300 >= fullHeight) ){
      return null;
    }
    // TODO: agregar un if para que no haya carga mas alla de la pagina 10

    this.setState({
      loading: true,
    }, async () => {
      try {
        const posts = await api.posts.getList(this.state.page);
        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
      } catch(error) {
        console.log(error);
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <section name="Home">
        <h1>Home</h1>

        <section>
          {
            this.state.posts.map(
              post => <Post key={post.id} {...post} />
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
