import express from 'express';
import user from './user.route';

const cors = require('cors');

export default (app: express.Application) => {
  app.use(cors());
  app.use('/user', user);
};
