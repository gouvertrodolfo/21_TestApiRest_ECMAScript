import * as apiProducto from '../api/Productos.js';
import schema from '../validations/productos.js';

 async function listar(req, res) {
    const array = await apiProducto.listar()
    res.json(array);
}

async function buscar(req, res) {
    const { productoId } = req.params
    try {
        const producto = await apiProducto.obtener(productoId)
        res.status(200).json(producto.export())
    } catch (err) {
        res.status(400).json(err)
    }
};

async function crear(req, res) {
    
    try{
        const data = await schema.validateAsync(req.body)
        const producto = await apiProducto.crear(data)
        res.status(200).json(producto.export())
    
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json(err)
    }
}

async function actualizar(req, res) {
    const data = req.body
    const { productoId } = req.params
    try {
        const producto = await apiProducto.obtener(productoId)
        producto.modificar(data)
        res.status(200).json(producto.export())
    
    } catch (err) {
        res.status(400).json(err)
    }
}

async function borrar(req, res) {
    const { productoId } = req.params
    try {
        const producto = await apiProducto.obtener(productoId)

        producto.borrar();
        res.status(200).json('ok')
    
    } catch (err) {
        res.status(400).json(err)
    }

}

export {
    listar,
    buscar,
    crear,
    actualizar,
    borrar
}