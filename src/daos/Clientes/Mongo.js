import { MongoClient, ObjectId } from 'mongodb';
import logger from '../../logger.js';

const mongo_url = process.env.MONGO_URL
const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

class Mongo {

    constructor( collection) {
        
        this.collection = client.db(process.env.MONGO_DB).collection(collection)
                
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async create(object) {
        await this.collection.insertOne(object)
            .then()
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        const array = await this.collection.find().toArray()

        return array
    }

    async getById(id) {

        try {
            const [object] = await this.collection.find({ id: id }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    async getByObjectId(id) {

        try {
            const [object] = await this.collection.find({ _id: ObjectId(id) }).toArray()

            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        this.collection.find({}).deleteAll()
    }

    async deleteById(id) {
        const result = await this.collection.deleteOne({ id: id })

        return result;
    }

}

export default  Mongo