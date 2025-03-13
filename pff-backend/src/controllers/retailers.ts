import { Router } from 'express'
import Retailer from '../models/retailer'
import { Request, Response } from 'express'

// Create Router
const retailerRouter = Router()

// Define Routes
retailerRouter.get('/', async (_request: Request, response: Response) => {
    const users = await Retailer.find()
    response.json(users)
})

retailerRouter.get('/:id', async (request: Request, response: Response) => {
    const retailer = await Retailer.findById(request.params.id)
    retailer ? response.json(retailer) : response.status(404).end()
})

export default retailerRouter
