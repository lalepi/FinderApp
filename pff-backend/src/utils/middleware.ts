import logger from './logger'

// This import statement was not working for some reason
import { Request, Response, NextFunction } from 'express'
//so make this .js file instead of .ts file
import { MongoError } from 'mongodb'
const unknownEndpoint = (_request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

interface CustomError extends Error {
    code?: number
}

const errorHandler = (
    error: CustomError,
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
        return response
            .status(400)
            .json({ error: 'Email address already exists' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else {
        response.status(500).json({ error: 'Internal Server Error' })
    }
    next(error)
}

export { errorHandler, unknownEndpoint }
