import {configureStore} from '@reduxjs/toolkit'
import stockSlice from './stockSlice'

const store = configureStore({
    reducer:{
        stock: stockSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch