import { Router } from 'express'
import User from '../models/user'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

// Create Router
const usersRouter = Router()

// Define Routes
usersRouter.post('/', async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (password.length < 10) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 10 characters long' })
    } else {
        // Hash the password
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        // Create a new user with the hashed password
        const user = new User({ username, email, passwordHash })

        //save the user to the database
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    }
})

usersRouter.get('/', async (_req: Request, res: Response) => {
    const users = await User.find()
    res.json(users)
})

export default usersRouter
