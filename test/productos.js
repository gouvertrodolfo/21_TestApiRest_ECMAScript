import config from '../config.js';
import { crear, listar, obtener } from '../src/api/Productos.js'
import { strict as assert } from 'assert'

describe("test objetos productos", function () {

    before(async function () {
        console.log('\n********* inicio de Test *********')

        const data = {
            codigo: 'testin',
            nombre: 'producto de prueba',
            descripcion: 'producto de prueba generado desde mocha',
            precio: 14.224,
            stock: 200
        };
        
        this.lista_inicial = await listar();

        console.log('Genero un producto de prueba')
        const {id} = await crear(data)

        this.id = id
    })

    after(function () {
        console.log('\n********* Fin de Test *********')
    })


    it('deberia existir un producto mas de la lista original', async function () {
        const productos = await listar()
        assert.strictEqual ( productos.length , this.lista_inicial.length+1 )
    })


    it('deberia recuperar el producto creado de la base',async function () {
        const prod = await obtener(this.id)
        assert.strictEqual ( prod.codigo, 'testin' )
    })

    it('deberia modificar el stock sin cambiar el codigo', async function () {
        const prod = await obtener(this.id)
        const result = await prod.modificar({ stock: 150 })
        
        assert.strictEqual ( result.modifiedCount, 1 )

        const prodact = await obtener(this.id)

        assert.strictEqual ( prodact.stock, 150 )
        assert.strictEqual ( prodact.codigo, 'testin' )
    })

    it('deberia eliminar el producto', async function () {
        const prod = await obtener(this.id)
        const result = await  prod.borrar()
        assert.strictEqual (result.deletedCount , 1)
    })


})

