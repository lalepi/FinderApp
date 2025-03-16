import mongoose from 'mongoose'
import { ProductDbConnection } from '../utils/db'

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_image: { type: String, required: true },
    product_category: { type: String, required: true },
    product_stock: { type: Number, required: true },
    product_rating: { type: Number, required: true },
    product_reviews: { type: Array, required: true },
})
// Use the productDbConnection to create the Product model

const { productDB } = ProductDbConnection()

const Product = productDB.model('Product', productSchema)

export default Product
