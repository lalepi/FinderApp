import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.ts'
import logger from './utils/logger.ts'
import { Router } from 'express'

/// move all these to correct files ///
const usersRouter = Router()

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

///CREATE ROUTER

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    },
})

const User = mongoose.model('User', userSchema)

// Define Routes
usersRouter.post('/', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = new User({ name, email })
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (error) {
        logger.error('Error saving user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        logger.error('Error fetching users:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.use('/Users', usersRouter)

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        logger.info('connected to MongoDB')
    } catch (error) {
        logger.error('error connection to MongoDB:', (error as Error).message)
    }
}

connectToDatabase()

export default app
