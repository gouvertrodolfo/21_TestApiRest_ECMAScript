import * as productos from '../src/controller/productos.js'
import { strict as assert } from 'assert'

describe("test objetos productos", function () {

    it('deberia fallar la validacion', function({
        const data =   {
                "codigo": "reg45",
                "nombre": "regla",
                "descripcion": "regla 45°",
                "precio": 14.224,
                "stock": 200
            }
        productos.crear(data)
        
    })

    it('deberia crear un producto', function () {
        const producto = new Todos()
        assert.strictEqual(todos.list().length, 0)
    })

    it('debería adicionar tareas correctamente', function () {
        const todos = new Todos()

        todos.add("run code")
        assert.strictEqual(todos.list().length, 1)
        assert.deepStrictEqual(todos.list(), [ { title: 'run code', complete: false } ])

        todos.add("otra tarea")
        assert.strictEqual(todos.list().length, 2)
        assert.deepStrictEqual(todos.list(), [
            { title: 'run code', complete: false },
            { title: 'otra tarea', complete: false }
        ])
    })

    it('debería marcar una tarea como completa', function () {
        const todos = new Todos()

        todos.add("run code")
        todos.add("otra tarea")

        todos.complete("run code")
        assert.deepStrictEqual(todos.list(), [
            { title: 'run code', complete: true },
            { title: 'otra tarea', complete: false }
        ])

    })
})

