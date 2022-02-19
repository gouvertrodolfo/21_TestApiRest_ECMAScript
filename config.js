// config.js
import dotenv from 'dotenv';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,

  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'Mongo',
  MONGO_URL: process.env.MONGO_URL||'no_url'
}