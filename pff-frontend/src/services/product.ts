import axios from 'axios'
import { Product, Review } from '../types'
import { apiBaseUrl } from '../constants'

const getAllProducts = async () => {
    const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`)
    return data
}
const getAllResellers = async () => {
    const { data } = await axios.get<Product[]>(`${apiBaseUrl}/inventory_data`)
    return data
}

const createReview = async (productId: string, review: Review) => {
    // Fetch the product
    const { data: product } = await axios.get<Product>(
        `${apiBaseUrl}/products/${productId}`
    )

    // Add the new review to the product's reviews
    const updatedProduct = {
        ...product,
        reviews: [...product.reviews, review],
    }

    // Save the updated product back to the server
    await axios.put(`${apiBaseUrl}/products/${productId}`, updatedProduct)

    return review
}

const getProductById = async (id: string) => {
    const { data } = await axios.get<Product>(`${apiBaseUrl}/products/${id}`)
    return data
}

export default { getAllProducts, getAllResellers, createReview, getProductById }
