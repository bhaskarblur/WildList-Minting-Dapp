import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'
import configReducer from './configSlice'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})