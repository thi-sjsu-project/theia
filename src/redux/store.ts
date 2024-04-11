import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { cmSlice } from './slices/cmSlice';

// pass in slices to combine into combineSlices()
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(cmSlice);

// Infer the `RootState` type from the root reducer
type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // disable serializableCheck for now (performance optimization)
      // warning in console because an action was taking too long to complete
      // because of the initializeGrid action. (2+ million cells being initialized)
      serializableCheck: false,
    }),
});

// Infer the type of `store`
type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
type AppDispatch = AppStore['dispatch'];

export default store;
export type { RootState, AppStore, AppDispatch };
