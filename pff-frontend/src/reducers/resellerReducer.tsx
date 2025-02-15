import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '../store'
import { Reseller } from '../types'
import resellerService from '../services/product'

const initialState: Reseller[] = []

const resellerSlice = createSlice({
    name: 'reseller',
    initialState: initialState,
    reducers: {
        setResellers: (state, action) => {
            return action.payload
        },
    },
})

export const { setResellers } = resellerSlice.actions

export const initializeResellers = () => {
    return async (dispatch: AppDispatch) => {
        const resellers = await resellerService.getAllResellers()
        dispatch(setResellers(resellers))
    }
}

export default resellerSlice.reducer
