import { combineReducers } from 'redux'

const initialState = {
  posts: {
    page: 1,
    entities: [],
  },
  comments: [],
  users: [],
};

/* const action = {
  type: 'SET_POSTS',
  payload: {}, // data
  // meta: {}, // informacion extra
  // error: true, // si esta accion tiene error
} */

// tiene solo informacion de la pagina actual
function postsPageReducer(state = initialState.posts.page, action = {}) {
  switch (action.type) {
    case 'SET_POSTS':
      return state + 1
    default:
      return state
  }
}

function postsEntitiesReducer(state = initialState.posts.entities, action = {}) {
  switch (action.type) {
    case 'SET_POSTS':
      return state.concat(action.payload)
    default:
      return state
  }
}

// se encarga de combinar los reducers individules
const postsReducer = combineReducers({
  page: postsPageReducer,
  entities: postsEntitiesReducer,
})


function commentsReducer(state = initialState.comments, action = {}) {
  switch (action.type) {
    case 'SET_COMMENTS':
      console.log('----------------------', state)
      return state.concat(action.payload)
    default:
      return state
  }
}

function usersReducer(state = initialState.users, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      console.log('----------------------', state)
      return Object.assign({}, state, {
        [action.payload.id]: action.payload,
      })
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
