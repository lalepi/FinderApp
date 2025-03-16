import 'express-async-errors'
import express, { Express } from 'express'
import usersRouter from './controllers/users'
import retailerRouter from './controllers/retailers'
import loginRouter from './controllers/login'
import registerRouter from './controllers/register'
import * as middleware from './utils/middleware'
import cors from 'cors'
import adminRouter from './controllers/admin'
import productRouter from './controllers/product'

const app: Express = express()

// Enable CORS,cross-origin resource sharing
app.use(cors())
// Middleware to parse JSON requests
app.use(express.json())
// Serve the static files from the React app
app.use(express.static('build'))
// Routes
app.use('/users', usersRouter)
app.use('/retailers', retailerRouter)

//use the tokenExtractor middleware for the login route
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/admin', middleware.tokenExtractor, middleware.adminCheck, adminRouter)
//Middlewares
app.use('/products', productRouter)
//handle unknown endpoints first
app.use(middleware.unknownEndpoint)

//handle errors
app.use(middleware.errorHandler)

export default app
