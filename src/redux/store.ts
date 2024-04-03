import { combineSlices, configureStore } from '@reduxjs/toolkit';

// pass in slices to combine into combineSlices()
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices();

// Infer the `RootState` type from the root reducer
type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  // this is unnecessary, but included for demonstration purposes
  // since default middlewares are automatically included
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the type of `store`
type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
type AppDispatch = AppStore['dispatch'];

export default store;
export type { RootState, AppStore, AppDispatch };
