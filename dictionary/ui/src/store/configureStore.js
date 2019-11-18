import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
  const middleware = [thunk, sagaMiddleware];

  if (process.NODE_ENV === 'development') {
    middleware.push();
  }

  const store = createStore(
    rootReducer(history),
    {},
    compose(
      applyMiddleware(routerMiddleware(history), ...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
