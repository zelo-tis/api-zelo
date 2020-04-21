import knex from 'knex';
import CONFIG from '../config';
export default knex({
  client: 'mysql',
  debug: process.env.NODE_ENV === 'development',
  connection: {
    host: CONFIG.database.host,
    user: CONFIG.database.user,
    password: CONFIG.database.password,
    database: CONFIG.database.database
  }
});
