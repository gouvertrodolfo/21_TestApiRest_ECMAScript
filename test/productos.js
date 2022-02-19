import config from '../config.js';

import { crear, listar, obtener } from '../src/api/Productos.js'
import { strict as assert } from 'assert'
import { syncBuiltinESMExports } from 'module';

const data = {
    codigo: 'reg45',
    nombre: 'regla',
    descripcion: 'regla 45°',
    precio: 14.224,
    stock: 200
};

const lista_inicial = await listar();

const {id} = await crear(data)


describe("test objetos productos", function () {

    after(function () {
        console.log('\n********* Fin de Test *********')
    })

    it('deberia existir un producto mas', async function () {
        const productos = await listar()
        assert.strictEqual ( productos.length , lista_inicial.length+1 )
    })


    it('deberia recuperar el producto de la base',async function () {
        const prod = await obtener(id)
        assert.strictEqual ( prod.codigo, 'reg45' )
    })

    it('deberia modificar el stock sin cambiar el codigo', async function () {
        const prod = await obtener(id)
        prod.modificar({ stock: 150 })
        const prodact = await obtener(id)

        assert.strictEqual ( prodact.stock, 150 )
        assert.strictEqual ( prodact.codigo, 'reg45' )
    })

    it('deberia eliminar el producto', async function () {
        const prod = await obtener(id)
        const result = await  prod.borrar()
        assert.strictEqual (result.deletedCount , 1)
    })


})

