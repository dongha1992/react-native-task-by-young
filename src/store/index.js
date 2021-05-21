import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postsReducer from './postsReducer';

const reducer = combineReducers({
  posts: postsReducer,
  middleware: getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

const store = configureStore({
  reducer: reducer,
});

export default store;
