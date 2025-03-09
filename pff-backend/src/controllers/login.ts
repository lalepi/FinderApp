import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import config from '../utils/config'
import User from '../models/user'

const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
    //Authenticate user
    const { username, password } = req.body

    const user = await User.findOne({ username })

    console.log('user', user)
    console.log('password', password)
    const checkPassword =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

    console.log('checkPassword', checkPassword)
    if (!(user && checkPassword)) {
        return res.status(401).json({ error: 'invalid username or password' })
    }

    const userToToken = { username: user.username, id: user._id }

    const token = jwt.sign(userToToken, config.ACCESS_TOKEN_SECRET, {
        //expires in 1 hour
        // expiresIn: 60 * 60,
        //expires in 5 minutes for testing
        expiresIn: 1 * 5,
    })

    res.send({ token, username: user.username, id: user._id }).status(200)
})

export default loginRouter
