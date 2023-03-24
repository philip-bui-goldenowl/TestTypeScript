import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import product from './product/slice';
const reducer = combineReducers({
  auth, product
});

const rootReducer = (state, action) => {

  if (action.type === 'auth/clearAuth') {
    state = undefined;
  }
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(__DEV__ ? require('redux-flipper').default() : []),
});
export type RootState = ReturnType<typeof rootReducer>;

export default store;