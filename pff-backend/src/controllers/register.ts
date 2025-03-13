import { Router } from 'express'
import User from '../models/user'
import Retailer from '../models/retailer'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

// Create Router
const registerRouter = Router()

// Define Routes
registerRouter.post('/', async (request: Request, response: Response) => {
    const { username, email, password, userType, storeName, address, phone } =
        request.body
    if (password.length < 10) {
        return response
            .status(400)
            .json({ error: 'Password must be at least 10 characters long' })
    } else {
        // Hash the password
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        // Create a new user depending on the type and with the hashed password
        let savedUser
        if (userType === 'retailer') {
            const retailer = new Retailer({
                username,
                email,
                passwordHash,
                storeName,
                address,
                phone,
            })
            savedUser = await retailer.save()
        } else {
            const user = new User({ username, email, passwordHash })
            savedUser = await user.save()
        }
        //save the user to the database
        //  const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
})

export default registerRouter
