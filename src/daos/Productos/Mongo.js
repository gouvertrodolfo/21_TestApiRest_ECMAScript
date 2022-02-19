import Mongo from '../Clientes/Mongo.js';


class ProductosMongo extends Mongo {

    constructor() {
        super('productos');
    }
    
    async update(product) {
        const { id, codigo, timestamp, nombre, descripcion, precio, thumbnail, stock } = product

        const result = await this.collection.updateOne(
            {
                id: id
            },
            {
                '$set':
                {
                    codigo: codigo,
                    timestamp: timestamp,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    thumbnail: thumbnail,
                    stock: stock
                }
            })
            .catch(err => { logger.error(err) })

        return result
    }

}

function getInstancia()
{
    const instacia = new ProductosMongo()
    return instacia;
}

export default getInstancia;