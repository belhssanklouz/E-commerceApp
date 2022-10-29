import {configureStore , combineReducers} from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
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

  
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  
  const persistedReducer = persistReducer(persistConfig, userReducer)
  
  const rootReducer = combineReducers({
      user:persistedReducer,
      cart:cartReducer
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
