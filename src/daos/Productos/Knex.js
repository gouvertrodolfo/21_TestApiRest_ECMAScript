import logger from '../../logger.js';
import clienteKnex from '../Clientes/knex.js';

class ProductosKnex extends clienteKnex{

    constructor() {
        super('productos');
        this.crearTabla();
    }

    async crearTabla() {

        try {

            await clienteKnex.schema.hasTable(this.nombreTabla).then(function (exists) {
                if (!exists) {

                    clienteKnex.schema.createTable(this.nombreTabla, table => {
                        table.increments()
                        table.string('title')
                        table.string('price')
                        table.string('thumbnail')
                    })
                        .then(logger.info("tabla productos creada"))
                        .catch((err) => { logger.error(err); throw err })
                        .finally(() => { clienteKnex.destroy() })
                   
                }
                else { logger.info(`La tabla ${this.nombreTabla} ya existe!`); }
            })
        } catch (error) {
            logger.info(error);
        }
    }

    async actualizar(data) {
        try {
            const { title, price, thumbnail } = data

            await clienteKnex('productos').where('id', data.id).update({
                title: title,
                price: price,
                thumbnail: thumbnail
            });

            this.listaproductos = await clienteKnex.select().from('productos').orderBy('id', 'desc')
        }
        catch (error) {
            logger.error(`Error al actualizar ${error}`)
        }
    }
}

export default ProductosKnex