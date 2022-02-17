
import  options  from '../../../options/mariaDB.js'

options.connection.user = process.env.MARIA_DB_USER
options.connection.password = process.env.MARIA_DB_PASSWORD

// const knexClient = require('knex')(options)

import knexClient from 'knex'
knexClient(options)


class knex {

    constructor(nombreTabla) {
        this.nombreTabla = nombreTabla;
    }


    async listarTodo() {
        try {
            const lista = await knexClient.select().from(this.nombreTabla)
            return lista;
        } catch (err) { console.log(err) }
    }


    async insertar(data) {

        try {
            let resultado = await knexClient(this.nombreTabla).insert(data);
            return resultado;
        } catch (error) {
            throw error;
        }

    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async buscarXId(identificador) {
        try {
            let resultado = await knexClient(this.nombreTabla).where({ id: identificador });
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async borrar(identificador) {

        try {
            let result = await knexClient(this.nombreTabla).where('id', identificador).del()
            return result;
        }
        catch (error) {
            console.log(`Error al eliminar ${error}`)
        }

    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        const items = []
        try {
            knexClient(this.nombreTabla).truncate()
        }
        catch (error) {
            console.log(`Error al truncar ${error}`)
        }

        this.listaproductos = []

    }

}

export default knex