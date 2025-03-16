import mongoose, { set } from 'mongoose'
import { ProductDbConnection } from '../utils/db'
import { setToJSON } from '../utils/middleware'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    ingredients: { type: Array, required: true },
    nutrients: { type: Object, required: true },
    product_metadata: {
        product_id: { type: String },
        brandobongo: { type: String },
        pet_type: { type: String },
        pet_size: { type: String },
        dietary_type: { type: String },
        sensitivities: { type: Array },
    },
    size: { type: String, required: true },
    age: { type: String, required: true },
    image: { type: String, required: true },
    reviews: { type: Array, required: true },
})
setToJSON(productSchema)

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
})
setToJSON(manufacturerSchema)

const inventorySchema = new mongoose.Schema({
    inventory_id: { type: String, required: true },
    product_id: { type: String, required: true },
    retailer_name: { type: String, required: true },
    regions: { type: Array, required: true },
    stock_quantity: { type: Number, required: true },
    base_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    pricing_strategy: { type: String, required: true },
    inventory_status: { type: String, required: true },
    last_updated: { type: Date, required: true, default: Date.now },
})
setToJSON(inventorySchema)

const sales_historySchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    retailer_name: { type: String, required: true },
    month: { type: String, required: true },
    total_units_sold: { type: Number, required: true },
    total_revenue: { type: Number, required: true },
})
setToJSON(sales_historySchema)

// Use the productDbConnection to create the Product model
const { productDB } = ProductDbConnection()
const Product = productDB.model('Product', productSchema)
const Manufacturer = productDB.model('Manufacturer', manufacturerSchema)
const Inventory = productDB.model('Inventory', inventorySchema)
const SalesHistory = productDB.model('Sales_history', sales_historySchema)

export { Product, Manufacturer, Inventory, SalesHistory }
