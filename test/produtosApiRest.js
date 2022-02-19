import app from './server.js'

let request
let server

describe('test api rest full', () => {

    before(async function () {
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/usuarios`)
    })

    after(function () {
        server.close()
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