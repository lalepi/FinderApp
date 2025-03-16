import app from './app'
import config from './utils/config'
import logger from './utils/logger'

console.log('Starting server...')
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
    logger.info(`Environment: ${process.env.NODE_ENV}`)
})
