import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT as string
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
//Check if the environment is test or not
//If it is test, use the test database
const MONGODB_URI =
    process.env.NODE_ENV === 'test'
        ? (process.env.MONGO_URI_TEST as string)
        : (process.env.MONGO_URI as string)

const PRODUCT_DATABASE = process.env.MONGO_PRODUCT_DATA as string

const config = {
    MONGODB_URI,
    PORT,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    PRODUCT_DATABASE,
}

export default config
