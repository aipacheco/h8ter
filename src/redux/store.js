import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
//para encriptar
import { thunk } from "redux-thunk"
import userSlice from "./userSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userSlice
  // añadir más reducers si los hay
})

// configuración de redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [
      //     "persist/PERSIST",
      //     "persist/REHYDRATE",
      //     "persist/PAUSE",
      //     "persist/PURGE",
      //     "persist/REGISTER",
      //   ],
      // }
    }).concat(thunk),
})

export const persistor = persistStore(store)
