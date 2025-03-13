import app from './app'
import configi from './utils/config'
import logger from './utils/logger'

console.log('Starting server...')
app.listen(configi.PORT, () => {
    logger.info(`Server running on port ${configi.PORT}`)
    logger.info(`Environment: ${process.env.NODE_ENV}`)
})
