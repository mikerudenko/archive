import { createStore, applyMiddleware, compose } from 'redux';
import makeRootReducer from './reducers';

import thunk from 'redux-thunk';

function configureStore(initialState = {}) {
    const middleware = [thunk];
    const enhancers = [];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (process.NODE_ENV === 'development') {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        makeRootReducer(),
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    store.asyncReducers = {};

    return store;
}

export default configureStore;
