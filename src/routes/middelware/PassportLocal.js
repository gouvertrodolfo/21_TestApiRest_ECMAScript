import passport from 'passport';
import { Strategy } from 'passport-local';

import { SignUp, login } from '../../controller/login.js';
import { buscar } from '../../controller/usuarios.js';

passport.use('signup', new Strategy({ passReqToCallback: true }, SignUp))

passport.use('login', new Strategy(login));


passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  const usuario = await buscar(username)
  done(null, usuario);
});


export function mwdIsAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' })
  }
}

export function mwdIsAuthweb(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/login");
  }
}

export function mwdIsAdmin(req, res, next) {
  if (!req.user.admin) {
    res.status(401).json({ error: 'ruta no autorizada' })
  }
  else {
    next()
  }
}

