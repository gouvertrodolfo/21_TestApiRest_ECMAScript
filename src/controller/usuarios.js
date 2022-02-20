import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'

export async function SignUp(req, username, password, done) {


    if ( await UsuarioApi.existe(username) ) {
        logger.warn( `username ${username} already exists`);
        req.error = { error: "username already exists" }
        return done(null, false)
    } else {

        const data = {
            username: username,
            password: password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar
        };
        const user = await UsuarioApi.registrar(data);

        registrarUsuario(user.get(), done);
    }

}


export async function login(username, password, done) {

    try {
        const user = await UsuarioApi.buscar(username)

        if (!user.isValidPassword(password)) {
            return done(null, false);
        }

        return done(null, user.get());
    }
    catch (error) {
        logger.warn(error);
        return done(null, false);
    }
};

export function postLoginController(req, res) {

    res.status(200).json(req.user)
}

export function postSignupController(req, res) {
    res.status(200).json(req.user)
}

export function getfailloginController(req, res) {

    res.status(400).json({ "descripcion": "username o contraseña incorrecta" })
}

export function getfailsignupController(req, res) {
    res.status(401).json(req.error)
}

export function getlogoutController(req, res) {
    req.session.destroy(err => {
        if (!err) res.status(200).json({ 'status': 'ok' })
        else res.send({ status: 'Logout ERROR', body: err })
    })
}
