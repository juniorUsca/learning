import { createStore } from 'redux'

import reducer from './reducer'

// 2DO parametro: recibe el estao inicial o un enhancer
const store = createStore(reducer);

export default store;
