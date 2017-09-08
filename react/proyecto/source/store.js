import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer'

// mi middleware logger
// puede usarse para recoger errores y guardar en sentry
// o para hacer analytics
//
// const logger = store => next => (action) => {
//   console.group("logger")
//   console.debug('estado actual', store.getState())
//   console.debug('accion', action)
//   const result = next(action) // pasa la cccion al siguiente middleware
//   console.debug('estado nuevo', store.getState())
//   console.groupEnd("logger")
//   return result;
// }

// 2DO parametro: recibe el estado inicial o un enhancer(el enhancer puede ser un middleware)
const store = createStore(
  reducer,
  applyMiddleware(
    // logger,
    createLogger(),
    thunk,
  ),
);

export default store;
