import {configureStore} from '@reduxjs/toolkit'
import stockSlice from './stockSlice'
import navigationSlice from './navigationSlice'

const store = configureStore({
    reducer:{
        stock: stockSlice.reducer,
        navigation: navigationSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch