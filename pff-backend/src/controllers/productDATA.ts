import { Request, Response, Router } from 'express'
import {
    Product,
    Manufacturer,
    Inventory,
    SalesHistory,
} from '../models/productDATA'
const productDATARouter = Router()

//Product Routes

productDATARouter.get(
    '/products',
    async (request: Request, response: Response) => {
        const products = await Product.find({})
        response.json(products)
    }
)

productDATARouter.get(
    '/products/:id',
    async (request: Request, response: Response) => {
        const product = await Product.findById(request.params.id)
        product ? response.json(product) : response.status(404).end()
    }
)

//Manufacturer Routes

productDATARouter.get(
    '/manufacturers',
    async (request: Request, response: Response) => {
        const manufacturers = await Manufacturer.find({})
        response.json(manufacturers)
    }
)

//Inventory Routes

productDATARouter.get(
    '/inventories',
    async (request: Request, response: Response) => {
        const inventory = await Inventory.find({})
        response.json(inventory)
    }
)

//Sales History Routes

productDATARouter.get(
    '/sales_histories',
    async (request: Request, response: Response) => {
        const salesHistory = await SalesHistory.find({})
        response.json(salesHistory)
    }
)

export default productDATARouter
