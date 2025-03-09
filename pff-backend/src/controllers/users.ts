import { Router } from 'express'
import User from '../models/user'
import { Request, Response } from 'express'

// Create Router
const usersRouter = Router()

// Define Routes
usersRouter.post('/', async (req: Request, res: Response) => {
    const { name, email } = req.body
    const user = new User({ name, email })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

usersRouter.get('/', async (_req: Request, res: Response) => {
    const users = await User.find()
    res.json(users)
})

export default usersRouter
