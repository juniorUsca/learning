import { combineReducers } from 'redux-immutable'
import {
  fromJS,
  Map as map,
} from 'immutable'

// que todo el store sea immutable
const initialState = fromJS({
  posts: {
    page: 1,
    entities: {},
  },
  comments: {},
  users: {},
});

/* const action = {
  type: 'SET_POSTS',
  payload: {}, // data
  // meta: {}, // informacion extra
  // error: true, // si esta accion tiene error
} */

// tiene solo informacion de la pagina actual
function postsPageReducer(state = initialState.get('posts').get('page'), action = {}) {
  switch (action.type) {
    case 'SET_POSTS':
      return state + 1
    default:
      return state
  }
}

function postsEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
  switch (action.type) {
    case 'SET_POSTS':
      // return state.concat(action.payload)
      return action.payload
        .reduce(
          (posts, post) => posts.set(post.id, map(post)), // posts es el acumulador
          state, // acumulador
        )
    default:
      return state
  }
}

// se encarga de combinar los reducers individules
const postsReducer = combineReducers({
  page: postsPageReducer,
  entities: postsEntitiesReducer,
})


function commentsReducer(state = initialState.get('comments'), action = {}) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload.reduce(
        (comments, comment) => comments.set(comment.id, map(comment)),
        state, // acumulador
      )
    default:
      return state
  }
}

function usersReducer(state = initialState.get('users'), action = {}) {
  switch (action.type) {
    case 'SET_USER':
      // return Object.assign({}, state, {
      //   [action.payload.id]: action.payload,
      // })
      return state.set(action.payload.id, map(action.payload))
    default:
      return state
  }
}

const reducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: usersReducer,
})

// function reducer(state = initialState, action = {}) {
//   switch (action.type) {
//     case 'SET_POSTS':
//       return Object.assign({}, state, {
//         posts: Object.assign({}, state.posts, {
//           entities: state.posts.entities.concat(action.payload),
//           page: state.posts.page + 1,
//         }),
//       });
//     default:
//       return state;
//   }
// }

export default reducer;
