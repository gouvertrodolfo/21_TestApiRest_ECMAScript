import { buscarXUsername } from '../api/Usuario.js';


async function buscar( username ) 
{
    const user = buscarXUsername(username);
    return user;
}

export {buscar}
