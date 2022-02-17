import { json, urlencoded } from 'express';
import session from 'express-session';
import logger from './logger.js';

/**************************************************************************************** */
import dotenv from 'dotenv';
dotenv.config()
/**************************************************************************************** */

import yargs from 'yargs/yargs'

yargs(process.argv.slice(2))

const args = yargs
    .option('port', {
        alias: 'p',
        default: 8081,
        type: 'number'
    })
    .option('mode', {
        alias: 'm',
        default: 'fork',
        type: 'string'
    })
    .boolean('producto_mongo')
    .boolean('user_mongo')
    .argv

/**************************************************************************************** */
// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')
/**************************************************************************************** */
// const app = express()
// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

// require("./api/socket").getInstancia(io)

/**************************************************************************************** */
import  productos from "./routes/productos.js";

/**************************************************************************************** */

/**************************************************************************************** */
// app.use(express.static('public'))

//Configuracion del motor de vistas que se usara
// app.set('view engine', 'ejs')

app.use(json())
app.use(urlencoded({ extended: true }))

/**************************************************************************************** */
import * as Mongo from 'connect-mongo';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    /* ------------------------------------------------------------ */
    /*           Persistencia por mongo altlas database             */
    /* ------------------------------------------------------------ */
    store: Mongo.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://user:us3r@cluster0-shard-00-00.3svtz.mongodb.net:27017,cluster0-shard-00-01.3svtz.mongodb.net:27017,cluster0-shard-00-02.3svtz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3m6b86-shard-0&authSource=admin&retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    /* ------------------------------------------------------------ */

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

/**************************************************************************************** */

app.use(passport.initialize());
app.use(passport.session());

/**************************************************************************************** */

//espacio de rutas
app.use('/api/productos', productos)
app.use('/api/productosTest', apiProductosTest)
app.use('/info', info)
app.use('/api/random', apiRandom)

/**************************************************************************************** */

const connectedServer = httpServer.listen(args.port, function () {
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))





