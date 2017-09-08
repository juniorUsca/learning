import api from './api'

// action creators
function setPosts(posts) {
  return {
    type: 'SET_POSTS',
    payload: posts,
  };
}

function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments,
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

function postsNextPage() {
  return async (dispatch, getState) => {
    console.log('accion asincrona');
    const state = getState()
    const currentPage = state.posts.page
    const posts = await api.posts.getList(currentPage)
    dispatch(
      setPosts(posts),
    )
    return posts;
  };
}

function loadCommentsForPost(postId) {
  return async (dispatch) => {
    const comments = await api.post.getComments(postId)
    dispatch(
      setComments(comments),
    )
    return comments;
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await api.users.getSingle(userId)
    dispatch(
      setUser(user),
    )
    return user;
  };
}

export default {
  setPosts,
  setComments,
  setUser,
  postsNextPage,
  loadCommentsForPost,
  loadUser,
};
