import {configureStore , combineReducers} from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import registerReducer from './reducers/registerReducer';
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

  
const persistConfig = (key) =>{
    return {key: key,
    version: 1,
    storage,
    }
  }

  const rootReducer = combineReducers({
      user:persistReducer(persistConfig("user"), userReducer),
      cart:persistReducer(persistConfig("cart"), cartReducer),
      register:registerReducer
  })
  
  // const persistedReducer = persistReducer(persistConfig(), rootReducer)
  

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
