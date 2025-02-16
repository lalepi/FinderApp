import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '../store'
import { Product, Review } from '../types'
import productService from '../services/product'

const initialState: Product[] = []

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        },
        appendReview(state, action) {
            const { productId, review } = action.payload

            const product = state.find((p) => p.id === productId)
            console.log('appendreview')
            if (product) {
                product.reviews = [...product.reviews, review]
            }
        },
    },
})

export const { setProducts, appendReview } = productSlice.actions

export const initializeProducts = () => {
    return async (dispatch: AppDispatch) => {
        const products = await productService.getAllProducts()
        dispatch(setProducts(products))
    }
}

export const fetchProductById = (id: string) => {
    return async (dispatch: AppDispatch) => {
        const product = await productService.getProductById(id)
        dispatch(setProducts([product]))
    }
}

export const addReview = (productId: string, review: Review) => {
    return async (dispatch: AppDispatch) => {
        await productService.createReview(productId, review)
        dispatch(appendReview({ productId, review }))
    }
}

export default productSlice.reducer
