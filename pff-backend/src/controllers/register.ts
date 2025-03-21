import { Router } from 'express'
import User from '../models/user'
import Retailer from '../models/retailer'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

// Create Router
const registerRouter = Router()

// Define Routes
registerRouter.post('/', async (request: Request, response: Response) => {
    const { username, email, password, role, storeName, address, phone } =
        request.body
    if (password.length < 10) {
        return response
            .status(400)
            .json({ error: 'Password must be at least 10 characters long' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        // Create a new user depending on the type and with the hashed password
        let savedUser
        if (role === 'retailer') {
            const retailer = new Retailer({
                username,
                email,
                role,
                passwordHash,
                storeName,
                address,
                phone,
            })
            savedUser = await retailer.save()
        } else {
            const user = new User({
                username,
                email,
                passwordHash,
                role: 'user',
            })
            savedUser = await user.save()
        }
        response.status(201).json(savedUser)
    }
})

export default registerRouter
