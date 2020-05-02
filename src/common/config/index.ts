// Update with your config settings.
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
require('dotenv').config();
const config = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
};

export default config;
