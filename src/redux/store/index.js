import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas";


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(state) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    state,
    bindMiddleware([sagaMiddleware, loggerMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore;





















