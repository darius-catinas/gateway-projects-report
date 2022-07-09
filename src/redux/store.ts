import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import reportSlice from './reducer'
import { dashboardApi } from './api'

export const store = configureStore({
  reducer: {
    report: reportSlice,
    [dashboardApi.reducerPath]: dashboardApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dashboardApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
