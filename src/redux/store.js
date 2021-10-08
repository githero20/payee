import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
const persistor = persistStore(store);

export { store, persistor };
