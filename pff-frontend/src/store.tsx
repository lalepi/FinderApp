import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        user: userReducer,
    },
})

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
