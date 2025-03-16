import { Request, Response, Router } from 'express'
import Product from '../models/product'
const productRouter = Router()

productRouter.get('/', async (request: Request, response: Response) => {
    const products = await Product.find({})
    response.json(products)
})

export default productRouter
