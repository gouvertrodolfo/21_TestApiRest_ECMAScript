import { contenedor } from '../daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'

class Usuario {

    constructor(data) {
        const { _id, username, password, email, firstName, lastName, avatar, admin } = data;

        if (_id == undefined) {
            this._id = undefined;
            this.admin = false;
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.admin = admin;
            this.password = password;
        }

        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;

    }

    get() {
        const user = {
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            avatar: this.avatar,
            admin: this.admin
        }
        return user;
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }


    guardar() {
        if (this._id == undefined) {
            contenedor.create(this)
        }
        else {
            contenedor.actualizar(this)
        }
    }

}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export async function existe(username) {

    const data = await contenedor.getByUserName(username);
    if (data == undefined) {
        console.log('existe false')
        return false;
    }
    console.log(data)
    return true;
}

export async function buscar(username) {

    const data = await contenedor.getByUserName(username);
    if (data == undefined) {
        err = {
            codigo: 400,
            descripcion: `${username} no es un usuario registrado`
        }
        throw err
    }

    const usuario = new Usuario(data);

    return usuario;
}


export async function registrar(data) {

    try {
        const usuario = new Usuario(data)
        await usuario.guardar()

        logger.info(`Registro Ok `);
        return usuario;
    }
    catch (err) {
        logger.error(`Error in Saving user: ${err}`);
        throw (err);
    }
}



