import 'express-async-errors'
import mongoose from 'mongoose'
import config from './config'
import logger from './logger'
import { MongoError } from 'mongodb'
// separate connection for userDB and productDB to debug easier

const UserDbConnection = () => {
    if (!config.MONGODB_URI) {
        logger.error(
            'MONGODB_URI is not defined. Please check your environment variables.'
        )
        process.exit(1)
    }
    logger.info('connecting to userDB', config.MONGODB_URI)
    try {
        const userDB = mongoose.createConnection(config.MONGODB_URI, {})
        logger.info('connected to UserDB')
        return { userDB }
    } catch (error) {
        logger.error('error connection to UserDB:', (error as Error).message)

        process.exit(1)
    }
}

const ProductDbConnection = () => {
    if (!config.PRODUCT_DATABASE) {
        logger.error(
            'PRODUCT_DATABASE is not defined. Please check your environment variables.'
        )
        process.exit(1)
    }
    logger.info('connecting to productDB', config.PRODUCT_DATABASE)
    try {
        const productDB = mongoose.createConnection(config.PRODUCT_DATABASE, {})

        logger.info('connected to ProductDB')
        return { productDB }
    } catch (error) {
        logger.error('error connection to ProductDB:', (error as Error).message)
        process.exit(1)
    }
}

export { UserDbConnection, ProductDbConnection }
