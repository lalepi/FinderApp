import 'express-async-errors'
import express, { Express } from 'express'
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import * as middleware from './utils/middleware'
import cors from 'cors'

const app: Express = express()

logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery', false)
const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        logger.info('connected to MongoDB')
    } catch (error) {
        logger.error('error connection to MongoDB:', (error as Error).message)
    }
}

// Connect to MongoDB
connectToDatabase()

// Enable CORS,cross-origin resource sharing
app.use(cors())
// Middleware to parse JSON requests
app.use(express.json())
// Serve the static files from the React app
app.use(express.static('build'))
// Routes
app.use('/Users', usersRouter)

//use the tokenExtractor middleware for the login route
app.use('/login', middleware.tokenExtractor, loginRouter)

//Middlewares

//handle unknown endpoints first
app.use(middleware.unknownEndpoint)

//handle errors
app.use(middleware.errorHandler)

export default app
