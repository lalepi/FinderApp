import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import config from '../utils/config'
import User from '../models/user'
import Retailer from '../models/retailer'

const loginRouter = Router()

loginRouter.post('/', async (request: Request, response: Response) => {
    //Authenticate user
    const { username, password } = request.body

    const user =
        (await User.findOne({ username })) ||
        (await Retailer.findOne({ username }))

    const checkPassword =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash as string)

    if (!(user && checkPassword)) {
        return response
            .status(401)
            .json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
        isAdmin: user.isAdmin,
    }

    const token = jwt.sign(userForToken, config.ACCESS_TOKEN_SECRET, {
        //expires in 1 hour
        expiresIn: 60 * 60,
        //expires in 5 minutes for testing
        //expiresIn: 1 * 5,
    })

    response
        .send({
            token,
            username: user.username,
            id: user._id,
            isAdmin: user.isAdmin,
        })
        .status(200)
})

export default loginRouter
