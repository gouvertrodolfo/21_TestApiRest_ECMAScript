import { Router } from 'express'
import { passport } from './middelware/PassportLocal.js'

import { postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController } from '../controller/usuarios.js'

const routerLogin = new Router();

routerLogin.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLoginController);
routerLogin.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignupController)

routerLogin.get('/faillogin', getfailloginController)
routerLogin.get('/failsignup', getfailsignupController)

routerLogin.get('/logout', getlogoutController)

export { routerLogin }
