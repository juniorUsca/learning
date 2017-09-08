
// action creators

function setPosts(posts) {
  return {
    type: 'SET_POSTS',
    payload: posts,
  };
}

export default {
  setPosts,
};
