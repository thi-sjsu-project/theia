import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
  withReduxStateSync,
  type Config,
} from 'redux-state-sync';
import { minimapSlice } from './slices/minimapSlice';
import { gazeSlice } from './slices/gazeSlice';
import { channelSlice } from './slices/channelSlice';

// pass in slices to combine into combineSlices()
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(minimapSlice, gazeSlice, channelSlice);

// Infer the `RootState` type from the root reducer
type RootState = ReturnType<typeof rootReducer>;

const reduxStateSyncConfig: Config = {
  // blacklist actions that should not be synced
  blacklist: [minimapSlice.actions.initializeState.type],
};
const stateSyncMiddleware = createStateSyncMiddleware(reduxStateSyncConfig);

const store = configureStore({
  reducer: withReduxStateSync(rootReducer),
  // @ts-ignore (TODO: fix this type error)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateSyncMiddleware),
});

// Initialize the state with the previous tab's state
initStateWithPrevTab(store);

// Infer the type of `store`
type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
type AppDispatch = AppStore['dispatch'];

export default store;
export type { RootState, AppStore, AppDispatch };
