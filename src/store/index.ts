import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
const reducer = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/clearAuth/fulfilled') {
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