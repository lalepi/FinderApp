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
    console.log('username', username)
    const user =
        (await User.findOne({ username })) ||
        (await Retailer.findOne({ username }))

    console.log('user', user)
    console.log('password', password)
    const checkPassword =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash as string)

    console.log('checkPassword', checkPassword)
    if (!(user && checkPassword)) {
        return response
            .status(401)
            .json({ error: 'invalid username or password' })
    }

    const userToToken = { username: user.username, id: user._id }

    const token = jwt.sign(userToToken, config.ACCESS_TOKEN_SECRET, {
        //expires in 1 hour
        // expiresIn: 60 * 60,
        //expires in 5 minutes for testing
        expiresIn: 1 * 5,
    })

    response.send({ token, username: user.username, id: user._id }).status(200)
})

export default loginRouter
