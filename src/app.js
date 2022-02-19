import logger from './logger.js';
import config from '../config.js';
import app from './server.js'

const connectedServer = app.listen(config.PORT, function () {
    logger.info(`Servidor Api REST escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))

