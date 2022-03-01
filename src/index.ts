import './load-env' // Must be the first import
import app from './server'
import logger from '@utilities/logger'

// Start the server
const port = Number(process.env.PORT || 4000)
app.listen(port, 'localhost', () => {
    logger.info('Server started on port: ' + port)
})
