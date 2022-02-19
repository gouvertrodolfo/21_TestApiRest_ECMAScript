import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { routerLogin } from './routers/login.js'
import {passport} from './routers/middelware/PassportLocal.js'
import productos from './routers/productos.js';

/**************************************************************************************** */
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

/**************************************************************************************** */
import  MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    /* ------------------------------------------------------------ */
    /*           Persistencia por mongo altlas database             */
    /* ------------------------------------------------------------ */
    store: MongoStore.create({
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
app.use('/', routerLogin)
app.use('/productos', productos)

/**************************************************************************************** */

export default app





