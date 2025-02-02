import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '../store'
import { Product } from '../types'
import productService from '../services/product'

const initialState: Product[] = []

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        },
    },
})

export const { setProducts } = productSlice.actions

export const initializeProducts = () => {
    return async (dispatch: AppDispatch) => {
        const products = await productService.getAll()
        dispatch(setProducts(products))
    }
}

export default productSlice.reducer
