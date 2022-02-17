import { registrarUsuario, loginUsuario } from '../api/Usuario.js';

function SignUp(req, username, password, done){

    const nuevoUsuario = {
        username: username,
        password: password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar
    }

    registrarUsuario(nuevoUsuario, done)
}

function login (username, password, done) 
{
    loginUsuario(username, password, done);    
};

function postLoginController(req, res) {

    res.status(200).json(req.user)
}

function postSignupController(req, res) {
    res.status(200).json(req.user)
}

function getfailloginController(req, res) {
    res.status(401).json({'status':'getfailloginController'})
}

function getfailsignupController(req, res) {
    res.status(401).json({'status':'getfailsignupController'})
}

function getlogoutController(req, res) {
    res.status(200).json({'status':'ok'})
}

export  { SignUp, login, postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController }