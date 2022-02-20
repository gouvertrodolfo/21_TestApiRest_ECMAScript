import app from '../src/server.js'
import supertest from 'supertest'
import { expect } from 'chai'

let request
let server

describe('test api rest full', () => {

    before(async function () {
        console.log('\n********* inicio de Test Api Rest*********')
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}`)
    })

    after(function () {
        server.close()
        console.log('\n********* Fin de Test Api Rest*********')
    })

    describe('Get Listado de productos', () => {
        it('debería retornar un status 200', async () => {
            const response = await request.get('/productos/')
            expect(response.status).to.eql(200)
        })
    })

    describe('Post de productos sin persmiso', () => {
        it('debería retornar un status 401', async () => {
            const data = {
                codigo: 'testin',
                nombre: 'producto de prueba',
                descripcion: 'producto de prueba generado desde mocha',
                precio: 14.224,
                stock: 200
            };

            const response = await request.post('/productos/').send(data)
            expect(response.status).to.eql(401)
        })
    })

    describe('Post de productos sin persmiso', () => {
        it('debería retornar un status 403', async () => {
            const data = {
                codigo: 'testin',
                nombre: 'producto de prueba',
                descripcion: 'producto de prueba generado desde mocha',
                precio: 14.224,
                stock: 200
            };
            const user = {
                "username":"user",
                "password":"123"
            }
            let response = await request.post('/login').send(user)
            expect(response.status).to.eql(200)

            response = await request.post('/productos').send(data)
            expect(response.status).to.eql(401)
        })
    })

    describe('Post de productos', () => {
        it('debería retornar un status 200', async () => {
            const data = {
                codigo: 'testin',
                nombre: 'producto de prueba',
                descripcion: 'producto de prueba generado desde mocha',
                precio: 14.224,
                stock: 200
            };
            const user = {
                "username":"admin",
                "password":"123"
            }
            let response = await request.post('/login').send(user)
            expect(response.status).to.eql(200)

            response = await request.post('/productos').send(data)
            expect(response.status).to.eql(401)
            
        })
    })


})

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0

        const server = app.listen(PORT, () => {
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}