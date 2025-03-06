import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT as string

//Check if the environment is test or not
//If it is test, use the test database
const MONGODB_URI =
    process.env.NODE_ENV === 'development'
        ? (process.env.MONGO_URI_TEST as string)
        : (process.env.MONGO_URI as string)

const config = {
    MONGODB_URI,
    PORT,
}

export default config
