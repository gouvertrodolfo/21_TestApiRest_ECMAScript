import { Router } from 'express';
const productos = Router();
import { mwdIsAuth, mwdIsAdmin } from "./middelware/PassportLocal.js";
import { listar, buscar, crear, actualizar, borrar } from "../controller/productos.js";
/* ------------------------------------------------------ */

// GET '/api/productos' -> devuelve todos los productos.
productos.get('/', listar);

// GET '/api/productos/:id' -> devuelve un producto según su id.
productos.get('/:id', mwdIsAuth, buscar );

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
productos.post('/', crear);

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
productos.put('/:id', mwdIsAuth, mwdIsAdmin, actualizar);

// DELETE '/api/productos/:id' -> elimina un producto según su id.
productos.delete('/:id', mwdIsAuth, mwdIsAdmin, borrar);

export default productos;