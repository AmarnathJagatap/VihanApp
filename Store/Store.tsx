import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { UserauthApi } from '../services/UserauthApi'
export const store = configureStore({
    reducer: {
        [UserauthApi.reducerPath]: UserauthApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(UserauthApi.middleware),

})
setupListeners(store.dispatch)