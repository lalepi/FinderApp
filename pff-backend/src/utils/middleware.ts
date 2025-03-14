import logger from './logger'

interface CustomRequest extends Request {
    token?: string
}

// This import statement was not working for some reason
import { Request, Response, NextFunction } from 'express'
import { request } from 'http'
//so make this .js file instead of .ts file
import { MongoError } from 'mongodb'
const unknownEndpoint = (_request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    //If the error is a MongoDB error with code 11000, it is a duplicate key error, so return a 400 status code and more obvious error message
    else if ((error as MongoError).code === 11000) {
        console.log('error', error)
        if (error.message.includes('username')) {
            return response
                .status(400)
                .json({ error: 'Username already exists' })
        } else if (error.message.includes('email')) {
            return response
                .status(400)
                .json({ error: 'Email address already exists' })
        } else if (error.message.includes('storeName')) {
            return response
                .status(400)
                .json({ error: 'Store name already exists' })
        } else if (error.message.includes('phone')) {
            return response
                .status(400)
                .json({ error: 'Phone number already exists' })
        } else {
            return response.status(400).json({ error: 'Duplicate key error' })
        }
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired',
        })
    } else {
        response.status(500).json({ error: 'Internal Server Error' })
    }
    next(error)
}

const tokenExtractor = (
    request: CustomRequest,
    _response: Response,
    next: NextFunction
) => {
    //Get the authorization header from the request
    const authorization = request.get('authorization')

    //If the authorization header exists and starts with 'bearer ',
    //set the token property of the request object to the token
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        next()
    } else {
        next()
    }
}

export { errorHandler, unknownEndpoint, tokenExtractor }
