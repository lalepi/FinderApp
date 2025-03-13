import { Router } from 'express'
import User from '../models/user'
import { Request, Response } from 'express'

// Create Router
const usersRouter = Router()

// Define Routes
usersRouter.get('/', async (_request: Request, response: Response) => {
    const users = await User.find()
    response.json(users)
})

usersRouter.get('/:id', async (request: Request, response: Response) => {
    const user = await User.findById(request.params.id)
    user ? response.json(user) : response.status(404).end()
})

export default usersRouter
