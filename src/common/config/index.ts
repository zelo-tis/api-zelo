// Update with your config settings.
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const dotenv = require("dotenv");
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
console.log('envFile', envFile);
dotenv.config({ path: envFile });
console.log('process.env.DB_HOST', process.env.DB_HOST);
const config = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
};

export default config;
