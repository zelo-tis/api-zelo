import express from 'express';
import project from './project.route';
import language from './language.route';
import git from './git.route';
import transifex from './transifex.route';
import request from './request.route';
import user from './user.route';

const cors = require('cors');

export default (app: express.Application) => {
  app.use(cors());
  app.use('/project', project);
  app.use('/language', language);
  app.use('/git', git);
  app.use('/transifex', transifex);
  app.use('/request', request);
  app.use('/user', user);
};
