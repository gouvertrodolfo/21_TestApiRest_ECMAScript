import logger from '../logger.js';
import { config } from 'dotenv';

import ContenedorMongo from './Productos/Mongo.js';
import Contenedorknex from './Productos/Knex.js';

config()

const file = process.env.PRODUCTOS_TIPO_PERSISTENCIA;

let contenedor;
if(file=='Mongo')
{
    contenedor = ContenedorMongo();
}
else
if(file=='knex')
{
    contenedor = Contenedorknex();
}
else
{
    const error= `Persistencia de productos ${file} no implementado`;
    logger.error(error);
    throw error;
}

export default contenedor ;

