import {configureStore , combineReducers} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import manageUsersSlice from './reducers/manageUsersReducer';
import ordersReducer from './reducers/ordersReducer';
import statsReducer from './reducers/statsReducer';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import productReducer from './reducers/productReducer';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:[manageUsersSlice]
  }

  
  const persistedReducer = persistReducer(persistConfig, userReducer)

  const rootReducer = combineReducers({
    user:persistedReducer,
    manageUsers:manageUsersSlice,
    orders:ordersReducer,
    stats:statsReducer,
    products:productReducer,
})


export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)
