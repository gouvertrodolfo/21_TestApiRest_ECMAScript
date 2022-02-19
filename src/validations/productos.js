import Joi from 'joi'

const schema = Joi.object(
    {
        codigo: Joi.string()
            .min(5)
            .max(10)
            .required(),
        nombre: Joi.string()
            .required(),
        descripcion: Joi.string()
            .required(),
        precio: Joi.number()
            .precision(2)
            .positive()
            .required(),
        stock: Joi.number()
        .integer()
        .positive()
        .required()

    }
)

export default schema;